import { gql } from "graphql-request";

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
