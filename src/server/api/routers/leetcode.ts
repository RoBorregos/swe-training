import { timeStamp } from "console";
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
    .input(z.object({ userId: z.string(), leetcodeUser: z.string() }))
    .query(async ({ input, ctx }) => {
      const recentAccepted = await getAcceptedProblems({ username: input.leetcodeUser });
      if (!recentAccepted) {
        throw new Error("Failed to fetch recent accepted problems");
      }

      const trainingStartDate = new Date(`2025-06-28T00:00:00Z`).getTime();

      // Get all recently accepted problems solved after the beginning of the training period.
      const data = recentAccepted
        .filter(problem => new Date(problem.timestamp * 1000).getTime() >= trainingStartDate)
        .map(problem => ({
          name: problem.title,
          timestamp: problem.timestamp,
        }));

      const db = await ctx.db.problem.findMany({ include: { week: true, solvedBy: true } });

      // Perform db update.
      const updates = data.map(problem => {
        // If not a match, ignore.
        const matched = db.find(p => p.name === problem.name);

        if (!matched) return null;

        // If already solved, ignore.
        const alreadySolved = matched.solvedBy.some(
          user => user.leetcodeUser === input.leetcodeUser
        );

        if (alreadySolved) return null;

        // Update matched, not previously solved problem.
        return ctx.db.problem.update({
          where: {id : matched.id},
          data: {
            solvedBy: {
              connect: {id: input.userId}
            }
          }
        })
      })

      // Filter and run all updates
      const filteredPromises = updates.filter(Boolean);
      await Promise.all(filteredPromises);
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
