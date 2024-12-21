import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

import { GraphQLClient } from "graphql-request";
import type {
  ProblemsSolvedType,
  RecentAcceptedType,
} from "~/util/schemas/leetcode";
import {
  problemsSolvedQuery,
  recentAcceptedQuery,
} from "~/util/queries/graphqlLeetcode";

const leetcodeEndpoint = "https://leetcode.com/graphql";

const client = new GraphQLClient(leetcodeEndpoint);

export const leetcodeRouter = createTRPCRouter({
  userProblems: publicProcedure
    .input(z.object({ username: z.string() }))
    .query(async ({ input }) => {
      const parsedData = await client.request<ProblemsSolvedType>(
        problemsSolvedQuery,
        {
          username: input.username,
        },
      );

      return parsedData.matchedUser.submitStats.acSubmissionNum;
    }),

  hasCompletedProblemRecently: publicProcedure
    .input(z.object({ username: z.string(), problemSlug: z.string() }))
    .query(async ({ input }) => {
      const parsedData = await client.request<RecentAcceptedType>(
        recentAcceptedQuery,
        {
          username: input.username,
          limit: 15,
        },
      );

      console.log(parsedData);

      return parsedData.recentAcSubmissionList.some(
        (submission) => submission.titleSlug === input.problemSlug,
      );
    }),
});
