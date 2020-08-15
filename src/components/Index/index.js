import { StatusBar } from "expo-status-bar";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { StyleSheet, Text, View } from "react-native";
import {
  fetchMovieGenresAction,
  fetchMoviesByGenreAction,
  fetchMovieStreamingServicesAction,
} from "../../state/movies/actions";
import { selectMovieGenres } from "../../state/movies/selectors";

const Index = () => {
  const dispatch = useDispatch();
  const movieGenres = useSelector(selectMovieGenres);

  console.log(movieGenres);
  useEffect(() => {
    // dispatch(fetchMovieGenresAction());
    // dispatch(fetchMoviesByGenreAction("adventure"));
    dispatch(fetchMovieStreamingServicesAction("tt0107290"));
  }, []);

  return (
    <View style={styles.container}>
      <Text>Hey Cutie</Text>
      <StatusBar style="auto" />
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

export default Index;
