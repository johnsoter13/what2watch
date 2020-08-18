import { StatusBar } from "expo-status-bar";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { StyleSheet, Text, View, Button } from "react-native";
import {
  fetchMovieGenresAction,
  fetchMoviesByGenreAction,
  fetchMovieStreamingServicesAction,
} from "../../state/movies/actions";
import { selectMovieGenres } from "../../state/movies/selectors";

const Home = ({ navigation }) => {
  const dispatch = useDispatch();
  const movieGenres = useSelector(selectMovieGenres);

  useEffect(() => {
    // dispatch(fetchMovieGenresAction());
    // dispatch(fetchMoviesByGenreAction("adventure"));
    // dispatch(fetchMovieStreamingServicesAction("tt0107290"));
  }, []);

  const navigateToStreamingServiceSelect = () => {};

  return (
    <View style={styles.container}>
      <Button
        onPress={() => navigation.navigate("StreamingServiceList")}
        title="Select Streaming Services"
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
