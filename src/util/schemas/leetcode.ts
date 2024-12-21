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

const TopicTagSchema = z.object({
  name: z.string(),
  id: z.string(),
  slug: z.string(),
});

const ProblemSchema = z.object({
  acRate: z.number(),
  difficulty: z.string(),
  freqBar: z.null(),
  frontendQuestionId: z.string(),
  isFavor: z.boolean(),
  paidOnly: z.boolean(),
  status: z.string(),
  title: z.string(),
  titleSlug: z.string(),
  topicTags: z.array(TopicTagSchema),
  hasSolution: z.boolean(),
  hasVideoSolution: z.boolean(),
});

const ProblemListData = z.object({
  total: z.number(),
  questions: z.array(ProblemSchema),
});

export const ProblemListResponse = z.object({
  problemsetQuestionList: ProblemListData,
});

export type ProblemListType = z.infer<typeof ProblemListResponse>;

const problemContent = z.object({
  content: z.string(),
});

export const questionContentResponse = z.object({
  question: problemContent,
});

export type QuestionContentType = z.infer<typeof questionContentResponse>;
