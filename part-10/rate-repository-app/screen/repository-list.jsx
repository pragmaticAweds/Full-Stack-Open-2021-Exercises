import { useState } from "react";
import { FlatList, View, StyleSheet } from "react-native";
import RNPickerSelect from "react-native-picker-select";
import { Chevron } from "react-native-shapes";
import SearchBar from "../components/atoms/SearchBar";
import RepositoryItem from "../components/molecules/repo-item";
import { useDebounce } from "use-debounce";
import useRepo from "../hooks/useRepo";

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

const RepositoryList = () => {
  const [sortBy, setSortBy] = useState({
    label: "Latest repositories",
    sort: { orderDirection: "DESC", orderBy: "CREATED_AT" },
  });

  const [searchQuery, setSearchQuery] = useState("");
  const [value] = useDebounce(searchQuery, 500);
  const { repositories, loading, fetchMore } = useRepo({
    ...sortBy.sort,
    searchKeyword: value,
  });
  const handleSearchQuery = (text) => {
    setSearchQuery(text);
  };
  let repo;
  if (!loading) {
    repo = repositories.edges.map(
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

  const searchFunction = () => {
    return (
      <View style={styles.container}>
        <SearchBar value={searchQuery} onChange={handleSearchQuery} />

        <View>
          <RNPickerSelect
            style={pickerSelectStyles}
            placeholder={{ label: sortBy.label, value: null }}
            onValueChange={(value) => setSortBy(value)}
            items={[
              {
                label: "Latest repositories",
                value: {
                  label: "Latest repositories",
                  sort: { orderDirection: "DESC", orderBy: "CREATED_AT" },
                },
              },
              {
                label: "Highest rated repositories",
                value: {
                  label: "Highest rated repositories",
                  sort: { orderDirection: "DESC", orderBy: "RATING_AVERAGE" },
                },
              },
              {
                label: "Lowest rated repositories",
                value: {
                  label: "Lowest rated repositories",
                  sort: { orderDirection: "ASC", orderBy: "RATING_AVERAGE" },
                },
              },
            ]}
          />

          <Chevron
            size={1}
            style={{ position: "absolute", right: 25, top: 20 }}
          />
        </View>
      </View>
    );
  };

  const onEndReach = () => {
    fetchMore();
  };

  return (
    <FlatList
      data={!loading ? repo : []}
      ItemSeparatorComponent={ItemSeparator}
      keyExtractor={({ id }) => id}
      renderItem={renderItem}
      ListHeaderComponent={searchFunction()}
      onEndReached={onEndReach}
      onEndReachedThreshold={0.5}
    />
  );
};

export default RepositoryList;
