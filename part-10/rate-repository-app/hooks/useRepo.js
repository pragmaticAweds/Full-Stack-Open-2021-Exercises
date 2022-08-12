import { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { GET_REPOSITORIES } from "../graphql/queries";
const useRepositories = () => {
  // const [repositories, setRepositories] = useState();
  // const [isloading, setLoading] = useState(false);
  // setLoading(true);
  // const fetchRepositories = async () => {
  const { data, loading, error } = useQuery(GET_REPOSITORIES, {
    fetchPolicy: "cache-and-network",
  });
  let repo;
  if (!loading) {
    repo = data.repositories.edges.map(
      ({
        node: {
          id,
          fullName,
          description,
          language,
          forksCount,
          stargazersCount,
          ratingAverage,
          reviewCount,
          ownerAvatarUrl,
        },
      }) => ({
        id,
        fullName,
        description,
        language,
        forksCount,
        stargazersCount,
        ratingAverage,
        reviewCount,
        ownerAvatarUrl,
      })
    );
  }

  // Replace the IP address part with your own IP address!
  // const response = await fetch(
  //   "http:///192.168.227.158:19000/api/repositories"
  // );
  // const json = await response.json();

  return { repo, loading, error };
};

export default useRepositories;
