import { render } from "@testing-library/react-native";
import { View } from "react-native";
import RepositoryItem from "../../components/molecules/repo-item";
import RepositoryList from "../../components/molecules/repo-item";

describe("RepositoryList", () => {
  describe("RepositoryListContainer", () => {
    it("renders repository information correctly", () => {
      const repositories = {
        totalCount: 8,
        pageInfo: {
          hasNextPage: true,
          endCursor:
            "WyJhc3luYy1saWJyYXJ5LnJlYWN0LWFzeW5jIiwxNTg4NjU2NzUwMDc2XQ==",
          startCursor: "WyJqYXJlZHBhbG1lci5mb3JtaWsiLDE1ODg2NjAzNTAwNzZd",
        },
        edges: [
          {
            node: {
              id: "jaredpalmer.formik",
              fullName: "jaredpalmer/formik",
              description: "Build forms in React, without the tears",
              language: "TypeScript",
              forksCount: 1619,
              stargazersCount: 21856,
              ratingAverage: 88,
              reviewCount: 3,
              ownerAvatarUrl:
                "https://avatars2.githubusercontent.com/u/4060187?v=4",
            },
            cursor: "WyJqYXJlZHBhbG1lci5mb3JtaWsiLDE1ODg2NjAzNTAwNzZd",
          },
          {
            node: {
              id: "async-library.react-async",
              fullName: "async-library/react-async",
              description: "Flexible promise-based React data loader",
              language: "JavaScript",
              forksCount: 69,
              stargazersCount: 1760,
              ratingAverage: 72,
              reviewCount: 3,
              ownerAvatarUrl:
                "https://avatars1.githubusercontent.com/u/54310907?v=4",
            },
            cursor:
              "WyJhc3luYy1saWJyYXJ5LnJlYWN0LWFzeW5jIiwxNTg4NjU2NzUwMDc2XQ==",
          },
        ],
      };

      const { edges } = repositories;

      const repo1 = edges[0].node;

      const { queryByTestId } = render(<RepositoryItem data={repo1} />);

      const repoImg = queryByTestId("repo-img").props.source.uri;
      const repoName = queryByTestId("repo-name");
      const repoDesc = queryByTestId("repo-desc");
      const repoLang = queryByTestId("repo-lang");
      const repoStars = queryByTestId("repo-stars");
      const repoForks = queryByTestId("repo-forks");
      const repoReviews = queryByTestId("repo-reviews");
      const repoRating = queryByTestId("repo-rating");

      // Add your test code here
      expect(repoImg).toBe(repo1.ownerAvatarUrl);
      expect(repoName).toHaveTextContent(repo1.fullName);
      expect(repoDesc).toHaveTextContent(repo1.description);
      expect(repoLang).toHaveTextContent(repo1.language);
      expect(repoStars).toHaveTextContent(
        (repo1.stargazersCount / 1000).toFixed(1)
      );
      expect(repoForks).toHaveTextContent((repo1.forksCount / 1000).toFixed(1));
      expect(repoRating).toHaveTextContent(repo1.ratingAverage);
      expect(repoReviews).toHaveTextContent(repo1.reviewCount);
    });
  });
});
