import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { StyleSheet, View, Button, TextInput } from "react-native";

import { fetchMovieGenresAction } from "../../state/movies/actions";
import { fetchMovieFromSearchAction } from "../../state/search/actions";
import {
  STREAMING_SERVICES_SCREEN,
  GENRE_SCREEN,
  SEARCH_MOVIE_SCREEN,
} from "../../constants/ROUTES";

const Home = ({ navigation }) => {
  const dispatch = useDispatch();
  const [value, onChangeText] = React.useState("");

  useEffect(() => {
    dispatch(fetchMovieGenresAction());
  }, []);

  return (
    <View style={styles.container}>
      <TextInput
        onChangeText={(text) => onChangeText(text)}
        value={value}
        placeholder="Search here..."
      />
      <Button
        onPress={() => {
          dispatch(fetchMovieFromSearchAction(value));
          navigation.navigate(SEARCH_MOVIE_SCREEN, { query: value });
          onChangeText("");
        }}
        title="Search"
      />

      <Button
        onPress={() => navigation.navigate(STREAMING_SERVICES_SCREEN)}
        title="Select Streaming Services"
      />
      {/* TODO: make sure user has at least one streaming service */}
      <Button
        onPress={() => navigation.navigate(GENRE_SCREEN)}
        title="Find A Movie"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default Home;
