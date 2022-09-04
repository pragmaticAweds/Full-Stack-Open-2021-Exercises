import { gql } from "@apollo/client";
export const GET_REPOSITORIES = gql`
  query Repositories(
    $orderDirection: OrderDirection
    $orderBy: AllRepositoriesOrderBy
  ) {
    repositories(orderDirection: $orderDirection, orderBy: $orderBy) {
      edges {
        node {
          id
          fullName
          description
          language
          forksCount
          stargazersCount
          ratingAverage
          reviewCount
          ownerAvatarUrl
        }
      }
    }
  }
`;

export const ME = gql`
  {
    me {
      username
    }
  }
`;

export const GET_SINGLE_REPO = gql`
  query Repository($repositoryId: ID!) {
    repository(id: $repositoryId) {
      id
      ratingAverage
      reviewCount
      stargazersCount
      forksCount
      url
      ownerAvatarUrl
      description
      language
      fullName
      reviews {
        edges {
          node {
            id
            user {
              username
              id
            }
            text
            rating
            createdAt
          }
        }
      }
    }
  }
`;
