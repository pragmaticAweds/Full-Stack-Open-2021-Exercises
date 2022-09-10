import { useQuery } from "@apollo/client";
import { GET_REPOSITORIES } from "../graphql/queries";
const useRepositories = (sortBy, value) => {
  switch (sortBy) {
    case "highest":
      sortBy = { orderBy: "RATING_AVERAGE", orderDirection: "DESC" };
      break;
    case "lowest":
      sortBy = { orderBy: "RATING_AVERAGE", orderDirection: "ASC" };
      break;
    default:
      sortBy = { order: "CREATED_AT", orderDirection: "DESC" };
  }
  const { data, loading, fetchMore, error, ...result } = useQuery(
    GET_REPOSITORIES,
    {
      fetchPolicy: "cache-and-network",
      variables: { first: 5, ...sortBy, searchKeyword: value },
    }
  );

  const handleFetchMore = () => {
    const canFetchMore = !loading && data?.repositories.pageInfo.hasNextPage;
    if (!canFetchMore) {
      return;
    }
    fetchMore({
      variables: {
        after: data.repositories.pageInfo.endCursor,
        first: 5,
        ...sortBy,
      },
    });
  };

  return {
    repositories: loading ? [] : data?.repositories,
    fetchMore: handleFetchMore,
    loading,
    error,
    ...result,
  };
};

export default useRepositories;
