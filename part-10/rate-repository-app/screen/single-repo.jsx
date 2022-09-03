import { useQuery } from "@apollo/client";
import { FlatList } from "react-native";
import { useParams } from "react-router-native";

import RepositoryItem from "../components/molecules/repo-item";
import { ReviewItem } from "../components/molecules/review-item";
import { GET_SINGLE_REPO } from "../graphql/queries";

export const SingleRepo = () => {
  const { id } = useParams();
  const { data, loading } = useQuery(GET_SINGLE_REPO, {
    fetchPolicy: "cache-and-network",
    variables: { repositoryId: id },
  });

  let reviews;
  if (!loading) {
    reviews = data?.repository.reviews.edges.map(
      ({
        node: {
          id,
          rating,
          text,
          createdAt,
          user: { username },
        },
      }) => ({
        id,
        rating,
        text,
        createdAt,
        username,
      })
    );
  }

  return (
    !loading && (
      <FlatList
        data={!loading ? reviews : []}
        renderItem={({ item }) => <ReviewItem review={item} />}
        keyExtractor={({ id }) => id}
        ListHeaderComponent={() => (
          <RepositoryItem data={data.repository} button />
        )}
      />
    )
  );
};
