import { useState } from "react";
import { FlatList, View, StyleSheet } from "react-native";
import RNPickerSelect from "react-native-picker-select";
import { Chevron } from "react-native-shapes";
import SearchBar from "../components/atoms/SearchBar";
import RepositoryItem from "../components/molecules/repo-item";
import { useDebounce } from "use-debounce";
import useRepo from "../hooks/useRepo";
import React from "react";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  separator: {
    height: 10,
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    paddingVertical: 10, // to ensure the text is never behind the icon
    paddingHorizontal: 7,
    fontSize: 18,
    color: "black",
  },
  inputAndroid: {
    fontSize: 18,
    paddingVertical: 10,
    paddingHorizontal: 7,
    color: "black",
  },
  placeholder: {
    color: "black",
  },
});

const ItemSeparator = () => <View style={styles.separator} />;
const renderItem = ({ item }) => <RepositoryItem data={item} />;

export class RepositoryListContainer extends React.Component {
  renderHeader = () => {
    const props = this.props;
    const { setSearchQuery, searchQuery, setSorting } = props;
    const handleSearchQuery = (query) => setSearchQuery(query);

    return (
      <View style={styles.container}>
        <SearchBar value={searchQuery} onChange={handleSearchQuery} />
        <View>
          <RNPickerSelect
            onValueChange={(label) => setSorting(label)}
            items={[
              { label: "Latest repositories", value: "latest" },
              { label: "Highest rated repositories", value: "highest" },
              { label: "Lowest rated repositories", value: "lowest" },
            ]}
            style={pickerSelectStyles}
          />
          <Chevron
            size={1}
            style={{ position: "absolute", right: 25, top: 20 }}
          />
        </View>
      </View>
    );
  };

  render() {
    const props = this.props;
    const { repo, fetch } = props;

    return (
      <FlatList
        data={repo}
        ItemSeparatorComponent={ItemSeparator}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={this.renderHeader}
        onEndReached={fetch}
        onEndReachedThreshold={0.5}
      />
    );
  }
}

const RepositoryList = () => {
  const [sortBy, setSortBy] = useState({
    label: "Latest repositories",
    value: "latest",
  });

  const [searchQuery, setSearchQuery] = useState("");

  const [value] = useDebounce(searchQuery, 500);

  const { repositories, loading, fetchMore } = useRepo(sortBy, value);

  let repo;
  if (!loading) {
    repo = repositories?.edges.map(
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

  const onEndReach = () => {
    fetchMore();
  };

  return (
    <RepositoryListContainer
      repo={!loading ? repo : []}
      setSearchQuery={setSearchQuery}
      searchQuery={searchQuery}
      setSorting={setSortBy}
      sorting={sortBy}
      fetch={onEndReach}
    />
  );
};

export default RepositoryList;
