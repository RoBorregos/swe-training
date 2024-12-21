import { GraphQLClient, gql } from "graphql-request";
import type {
  ProblemsSolvedType,
  RecentAcceptedType,
} from "~/util/schemas/leetcode";

const leetcodeEndpoint = "https://leetcode.com/graphql";

export const leetcodeGraphqlClient = new GraphQLClient(leetcodeEndpoint);

export const problemsSolvedQuery = gql`
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

export const recentAcceptedQuery = gql`
  query recentAcSubmissions($username: String!, $limit: Int!) {
    recentAcSubmissionList(username: $username, limit: $limit) {
      id
      title
      titleSlug
      timestamp
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
