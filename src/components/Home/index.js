import { StatusBar } from "expo-status-bar";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { StyleSheet, View, Button } from "react-native";

import {
  fetchMovieGenresAction,
  fetchMoviesByGenreAction,
  fetchMovieStreamingServicesAction,
} from "../../state/movies/actions";
import {
  STREAMING_SERVICES_SCREEN,
  GENRE_SCREEN,
} from "../../constants/ROUTES";

const Home = ({ navigation }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchMovieGenresAction());
    // dispatch(fetchMoviesByGenreAction("adventure"));
    // dispatch(fetchMovieStreamingServicesAction("tt0107290"));
  }, []);

  return (
    <View style={styles.container}>
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
