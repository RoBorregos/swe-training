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
    .input(z.object({ username: z.string(), title: z.string() }))
    .query(async ({ input }) => {
      const recentAccepted = await fetch(
        `https://alfa-leetcode-api.onrender.com/${input.username}/acSubmission`
      )

      if (!recentAccepted.ok) {
        throw new Error("Failed to fetch recent accepted problems");
      }

      const data = await recentAccepted.json();
      const matchedSubmission = data.submissions.find((submission: any) => {
        const trainingStartDate = new Date("2025-06-28").getTime();
        return (
          submission.title === input.title &&
          submission.timestamp >= trainingStartDate
        );
      });

      return matchedSubmission ? true : false;
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
