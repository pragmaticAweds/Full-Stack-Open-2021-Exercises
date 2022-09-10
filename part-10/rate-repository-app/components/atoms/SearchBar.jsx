import React, { useState } from "react";
import { StyleSheet, View, TextInput } from "react-native";
import CloseIcon from "./vectors/close";
import SearchIcon from "./vectors/search";

const Style = StyleSheet.create({
  wrapper: {
    flex: 1,
    marginTop: 5,
    flexDirection: "row",
    justifyContent: "center",
    borderColor: "grey",
    borderWidth: 0.5,
    borderRadius: 5,
    backgroundColor: "#fff",
    marginBottom: 15,
    paddingVertical: 15,
    paddingHorizontal: 10,
  },
  input: {
    flex: 1,
    padding: 3,
    marginRight: 5,
  },
  search: {
    flex: 0.1,
  },
  close: {
    flex: 0.1,
  },
});

const SearchBar = ({ value, onChange }) => {
  const searchBar = () => onChange("");
  return (
    <View style={Style.wrapper}>
      <View style={Style.search}>
        <SearchIcon />
      </View>
      <TextInput
        style={Style.input}
        value={value}
        onChangeText={(text) => onChange(text)}
      />

      {value !== "" && (
        <View style={Style.close}>
          <CloseIcon onPress={searchBar} />
        </View>
      )}
    </View>
  );
};

export default SearchBar;
