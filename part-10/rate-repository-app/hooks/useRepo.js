import { useQuery } from "@apollo/client";
import { GET_REPOSITORIES } from "../graphql/queries";
const useRepositories = (sortBy) => {
  const { data, loading, fetchMore, error, ...result } = useQuery(
    GET_REPOSITORIES,
    {
      fetchPolicy: "cache-and-network",
      variables: { first: 5, ...sortBy },
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
    repositories: data?.repositories,
    fetchMore: handleFetchMore,
    loading,
    error,
    ...result,
  };
};

export default useRepositories;
