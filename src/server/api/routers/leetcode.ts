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

  hasCompletedProblemRecently: publicProcedure
    .input(z.object({ username: z.string(), problemSlug: z.string() }))
    .query(async ({ input }) => {
      const recentAccepted = await getAcceptedProblems({
        username: input.username,
      });

      return recentAccepted.some(
        (submission) => submission.titleSlug === input.problemSlug,
      );
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
