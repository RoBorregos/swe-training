import { z } from "zod";

const SubmissionSchema = z.object({
  difficulty: z.string(),
  count: z.number(),
  submissions: z.number(),
});

const SubmitStatsSchema = z.object({
  acSubmissionNum: z.array(SubmissionSchema),
});

const MatchedUserSchema = z.object({
  submitStats: SubmitStatsSchema,
});

export const ProblemsSolvedResponse = z.object({
  matchedUser: MatchedUserSchema,
});

export type ProblemsSolvedType = z.infer<typeof ProblemsSolvedResponse>;

const AcceptedQuestionSchema = z.object({
  id: z.string(),
  title: z.string(),
  titleSlug: z.string(),
  timestamp: z.number(),
});

export const RecentAcceptedResponse = z.object({
  recentAcSubmissionList: z.array(AcceptedQuestionSchema),
});

export type RecentAcceptedType = z.infer<typeof RecentAcceptedResponse>;
