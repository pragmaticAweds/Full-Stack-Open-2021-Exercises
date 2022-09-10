import { useQuery } from "@apollo/client";
import { FlatList } from "react-native";

import { ReviewItem } from "../components/molecules/review-item";
import { ME } from "../graphql/queries";

export const MyReviews = () => {
  const { data, loading } = useQuery(ME, {
    variables: { includeReviews: true },
  });

  let reviews;

  if (!loading) {
    reviews = data?.me.reviews.edges.map(
      ({
        node: {
          id,
          rating,
          text,
          createdAt,
          repository: { fullName },
          repositoryId,
        },
      }) => ({
        id,
        rating,
        text,
        createdAt,
        username: fullName,
        repositoryId,
      })
    );
  }

  return (
    !loading && (
      <FlatList
        data={!loading ? reviews : []}
        renderItem={({ item }) => <ReviewItem review={item} btn />}
        keyExtractor={({ id }) => id}
      />
    )
  );
};
