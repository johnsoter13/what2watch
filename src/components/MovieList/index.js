import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { StyleSheet, View, TouchableOpacity, Text } from "react-native";

import { selectMovieIndex, selectMoviesByGenre, selectMoviesByGenreLoadingStatus} from "../../state/movies/selectors";
import { selectUserStreamingServices } from "../../state/streaming/selectors";
import SwipeMovieCard from "../SwipeMovieCard";
import { SUCCESS } from "../../state/constants";
import {movieListIndexAction, fetchMovieStreamingServicesAction} from '../../state/movies/actions';
import * as baseStyles from '../../styles/styles';

const MovieList = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const movieIndex = useSelector((state) => selectMovieIndex(state, route.params.genre));
  const moviesByGenre = useSelector((state) => selectMoviesByGenre(state, route.params.genre));
  const userStreamingServices = useSelector(selectUserStreamingServices);
  const moviesByGenreLoadingStatus = useSelector(selectMoviesByGenreLoadingStatus);

  return (
    <View style={styles.container}>
      {moviesByGenreLoadingStatus === SUCCESS && moviesByGenre &&
      <>
        <SwipeMovieCard genre={route.params.genre} userStreamingServices={userStreamingServices} movieId={moviesByGenre[movieIndex]} />
        <TouchableOpacity 
          style={styles.nextMovieButton}
          onPress={() => dispatch(movieListIndexAction(route.params.genre))}
        >
          <Text style={styles.nextMovieButtonText}>
            Next Movie
          </Text>
        </TouchableOpacity>
      </>
      }
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: "100%",
    justifyContent: "center",
  },
  nextMovieButton: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: baseStyles.BUTTON_COLOR,
    borderRadius: baseStyles.BUTTON_BORDER_RADIUS,
    height: "5%",
  },
  nextMovieButtonText: {
    color: baseStyles.BUTTON_TEXT_COLOR
  }
});

export default MovieList;

// module.exports = function (api) {
//   api.cache(true);
//   return {
//     presets: ["babel-preset-expo"],
//     plugins: [
//       "react-native-classname-to-style",
//       [
//         "react-native-platform-specific-extensions",
//         { extensions: ["scss", "sass"] },
//       ],
//     ],
//   };
// };

