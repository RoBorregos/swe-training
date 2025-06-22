import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

import {
  getAcceptedProblems,
  getProblemIdBySlug,
  getProblemInfoById,
  getProblemsSolved,
  getQuestionDescription,
} from "~/util/queries/graphqlLeetcode";

export const leetcodeRouter = createTRPCRouter({
  userProblems: publicProcedure
    .input(z.object({ username: z.string() }))
    .query(async ({ input }) => {
      return await getProblemsSolved({ username: input.username });
    }),

  checkNewCompletions: publicProcedure
    .input(z.object({ week: z.number(), userId: z.string(), leetcodeUser: z.string() }))
    .query(async ({ input, ctx }) => {
      const recentAccepted = await getAcceptedProblems({ username: input.leetcodeUser });
      if (!recentAccepted) {
        throw new Error("Failed to fetch recent accepted problems");
      }

      const data = recentAccepted.map((problem) => ({
        name: problem.title,
        timestamp: problem.timestamp,
      }));
      
      const db = await ctx.db.problem.findMany({ include: { week: true, solvedBy: true } });

      // For every problem, check if it exists in the database
      // If it exists, check if the user has solved it
      // If the user has not solved it, update the problem in the database
      for (const problem of data) {
        // Make sure time is at least the beginning of the training period
        const trainingStartDate = new Date(`2025-06-28T00:00:00Z`).getTime();
        if (new Date(problem.timestamp * 1000).getTime() < trainingStartDate) {
          continue;
        }

        // Perform match
        const matchedProblem = db.find((p => p.name === problem.name));
        if (matchedProblem) {
          if (!matchedProblem.solvedBy.some(user => user.name === input.leetcodeUser)) {
            await ctx.db.problem.update({
              where: { id: matchedProblem.id },
              data: {
                solvedBy: {
                  connect: { id: input.userId },
                },
              },
            });
          }
        }
      }
    }),

  getProblemById: publicProcedure
    .input(z.object({ problemId: z.number() }))
    .query(async ({ input }) => {
      return await getProblemInfoById({ id: input.problemId });
    }),

  getProblemBySlug: publicProcedure
    .input(z.object({ slug: z.string() }))
    .query(async ({ input }) => {
      return await getProblemIdBySlug({ slug: input.slug });
    }),

  getQuestionDescription: publicProcedure
    .input(z.object({ titleSlug: z.string() }))
    .query(async ({ input }) => {
      return await getQuestionDescription({ titleSlug: input.titleSlug });
    }),
});
