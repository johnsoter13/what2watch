import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { StyleSheet, View, Button, TextInput } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

import { fetchMovieGenresAction } from "../../state/movies/actions";
import {
  STREAMING_SERVICES_SCREEN,
  GENRE_SCREEN,
  SEARCH_MOVIE_SCREEN,
} from "../../constants/ROUTES";

const Home = ({ navigation }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchMovieGenresAction());
  }, []);

  return (
    <View style={styles.container}>
      {/* TODO: Move into header component and make icon */}
      <View style={styles.searchContainer}>
        <Button
          onPress={() => navigation.navigate(SEARCH_MOVIE_SCREEN)}
          title="Search here..."
        />
      </View>
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
});

export default Home;
