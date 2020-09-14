import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { StyleSheet, View, TextInput, Button, Text } from "react-native";
import { debounce } from "lodash";
import { useBackHandler } from "@react-native-community/hooks";

import {
  fetchMovieFromSearchAction,
  setSearchQueryAction,
} from "../../state/search/actions";
import {
  selectRecentSearchQueries,
  selectSearchQuery,
} from "../../state/search/selectors";
import SearchMovieList from "../SearchMovieList";

const Search = () => {
  const dispatch = useDispatch();
  const recentSearchQueries = useSelector(selectRecentSearchQueries);
  const searchQuery = useSelector(selectSearchQuery);

  useBackHandler(() => {
    dispatch(setSearchQueryAction(""));
  });

  useEffect(() => {
    dispatch(setSearchQueryAction(""));
  }, []);

  const renderListOfPreviousSearches = () => {
    return (
      <View style={styles.previousSearchesContainer}>
        {recentSearchQueries.length ? (
          <Text style={styles.previousSearchesTitle}>Recent Searches</Text>
        ) : null}
        {recentSearchQueries?.map((query) => (
          <View style={styles.previousSearchesListItem}>
            <Button
              title={query}
              onPress={() => dispatch(setSearchQueryAction(query))}
              style={styles.previousSearchesButton}
            />
          </View>
        ))}
      </View>
    );
  };

  const renderSearchResults = () => (
    <View style={styles.searchList}>
      <SearchMovieList query={searchQuery} />
    </View>
  );

  const handleSearch = (text) => {
    dispatch(setSearchQueryAction(text));
    if (text.length > 1) {
      debouncedSearch(text);
    }
  };

  const debouncedSearch = useCallback(
    debounce((text) => dispatch(fetchMovieFromSearchAction(text)), 1500),
    []
  );

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          onChangeText={handleSearch}
          value={searchQuery}
          placeholder="Search here..."
          style={styles.search}
        />
      </View>
      {searchQuery ? renderSearchResults() : renderListOfPreviousSearches()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#888888",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    paddingVertical: 20,
    paddingLeft: 10,
    paddingRight: 10,
  },
  searchContainer: {
    width: "100%",
  },
  search: {
    backgroundColor: "white",
    height: 35,
    padding: 5,
  },
  previousSearchesContainer: {
    marginTop: 20,
    width: "100%",
  },
  previousSearchesButton: {
    marginTop: 10,
    width: "100%",
  },
  previousSearchesTitle: {
    marginBottom: 5,
  },
  previousSearchesListItem: {
    marginBottom: 10,
  },
  searchList: {
    width: "100%",
  },
});

export default Search;
