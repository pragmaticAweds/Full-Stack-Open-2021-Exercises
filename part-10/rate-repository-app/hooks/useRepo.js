import { useQuery } from "@apollo/client";
import { GET_REPOSITORIES } from "../graphql/queries";
const useRepositories = (sortBy) => {
  const { data, loading, error } = useQuery(GET_REPOSITORIES, {
    fetchPolicy: "cache-and-network",
    variables: sortBy,
  });
  return { data, loading, error };
};

export default useRepositories;
