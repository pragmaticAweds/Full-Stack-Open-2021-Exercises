import { FlatList, View, StyleSheet } from "react-native";
import RepositoryItem from "../components/molecules/card";
import useRepo from "../hooks/useRepo";
const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const renderItem = ({ item }) => <RepositoryItem {...item} />;

const RepositoryList = () => {
  const { repo } = useRepo();
  return (
    <FlatList
      data={repo}
      ItemSeparatorComponent={ItemSeparator}
      keyExtractor={({ id }) => id}
      renderItem={renderItem}
    />
  );
};

export default RepositoryList;
