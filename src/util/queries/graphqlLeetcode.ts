// https://github.com/akarsh1995/leetcode-graphql-queries/tree/main

import { GraphQLClient, gql } from "graphql-request";
import type {
  ProblemsSolvedType,
  RecentAcceptedType,
  ProblemListType,
  QuestionContentType,
  UserNameType,
} from "~/util/schemas/leetcode";

const leetcodeEndpoint = "https://leetcode.com/graphql";

export const leetcodeGraphqlClient = new GraphQLClient(leetcodeEndpoint);

const problemsSolvedQuery = gql`
  query userSessionProgress($username: String!) {
    matchedUser(username: $username) {
      submitStats {
        acSubmissionNum {
          difficulty
          count
          submissions
        }
      }
    }
  }
`;

const recentAcceptedQuery = gql`
  query recentAcSubmissions($username: String!, $limit: Int!) {
    recentAcSubmissionList(username: $username, limit: $limit) {
      id
      title
      titleSlug
      timestamp
    }
  }
`;

const problemInfoByIdQuery = gql`
  query problemsetQuestionList(
    $categorySlug: String
    $limit: Int
    $skip: Int
    $filters: QuestionListFilterInput
  ) {
    problemsetQuestionList: questionList(
      categorySlug: $categorySlug
      limit: $limit
      skip: $skip
      filters: $filters
    ) {
      total: totalNum
      questions: data {
        acRate
        difficulty
        freqBar
        frontendQuestionId: questionFrontendId
        isFavor
        paidOnly: isPaidOnly
        status
        title
        titleSlug
        topicTags {
          name
          id
          slug
        }
        hasSolution
        hasVideoSolution
      }
    }
  }
`;

const questionContentQuery = gql`
  query questionContent($titleSlug: String!) {
    question(titleSlug: $titleSlug) {
      content
    }
  }
`;

const userInfoQuery = gql`
  query userPublicProfile($username: String!) {
    matchedUser(username: $username) {
      username
      githubUrl
      linkedinUrl
      profile {
        userAvatar
        realName
        aboutMe
      }
    }
  }
`;

export const getProblemsSolved = async ({ username }: { username: string }) => {
  const parsedData = await leetcodeGraphqlClient.request<ProblemsSolvedType>(
    problemsSolvedQuery,
    {
      username: username,
    },
  );

  return parsedData.matchedUser.submitStats.acSubmissionNum;
};

export const getAcceptedProblems = async ({
  username,
}: {
  username: string;
}) => {
  const parsedData = await leetcodeGraphqlClient.request<RecentAcceptedType>(
    recentAcceptedQuery,
    {
      username: username,
      limit: 15,
    },
  );

  return parsedData.recentAcSubmissionList;
};

export const getProblemInfoById = async ({ id }: { id: number }) => {
  const parsedData = await leetcodeGraphqlClient.request<ProblemListType>(
    problemInfoByIdQuery,
    {
      categorySlug: "",
      limit: 1,
      skip: id - 1,
      filters: {},
    },
  );

  if (parsedData.problemsetQuestionList.questions.length === 0) {
    return null;
  }

  return parsedData.problemsetQuestionList.questions[0];
};

export const getProblemIdBySlug = async ({ slug }: { slug: string }) => {
  const parsedData = await leetcodeGraphqlClient.request<ProblemListType>(
    problemInfoByIdQuery,
    {
      categorySlug: "",
      limit: 1,
      skip: 0,
      filters: {
        searchKeywords: slug,
      },
    },
  );

  if (parsedData.problemsetQuestionList.questions.length === 0) {
    return null;
  }

  return parsedData.problemsetQuestionList.questions[0];
};

export const getQuestionDescription = async ({
  titleSlug,
}: {
  titleSlug: string;
}) => {
  const parsedData = await leetcodeGraphqlClient.request<QuestionContentType>(
    questionContentQuery,
    {
      titleSlug: titleSlug,
    },
  );

  return parsedData.question.content;
};

export const getUserInfo = async ({ username }: { username: string }) => {
  try {
    const parsedData = await leetcodeGraphqlClient.request<UserNameType>(
      userInfoQuery,
      {
        username: username,
      },
    );
    return parsedData;
  } catch (error) {
    // User does not exists
    return null;
  }
};
