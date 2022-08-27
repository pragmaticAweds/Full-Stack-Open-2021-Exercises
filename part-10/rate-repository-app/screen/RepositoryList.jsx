import { FlatList, View, StyleSheet } from "react-native";
import RepositoryItem from "../components/molecules/repo-item";
import useRepo from "../hooks/useRepo";
const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const renderItem = ({ item }) => <RepositoryItem data={item} />;

const RepositoryList = () => {
  const { data, loading } = useRepo();
  let repo;
  if (!loading) {
    repo = data?.repositories.edges.map(
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

  return (
    <FlatList
      data={!loading ? repo : []}
      ItemSeparatorComponent={ItemSeparator}
      keyExtractor={({ id }) => id}
      renderItem={renderItem}
    />
  );
};

export default RepositoryList;
