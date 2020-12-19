import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { StyleSheet, View, Button, TextInput, Text, Image, Linking } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

import {
  STREAMING_SERVICES_SCREEN,
  GENRE_SCREEN,
  SEARCH_MOVIE_SCREEN,
} from "../../constants/ROUTES";
import { selectMovieStreamingServicesById } from "../../state/movies/selectors";
import {movieListIndexAction, fetchMovieStreamingServicesAction} from '../../state/movies/actions';


const SwipeMovieCard = ({ userStreamingServices, movieId }) => {
  const dispatch = useDispatch();
  const movie = useSelector((state) =>
  selectMovieStreamingServicesById(
      state,
      movieId
    )
  );

  useEffect(() => {
    if (!movie) {
      dispatch(fetchMovieStreamingServicesAction(movieId))
    }
  }, [movie, dispatch, fetchMovieStreamingServicesAction])

  const handleNavigateToLink = (url) => {
    Linking.canOpenURL(url).then((supported) => {
      if (supported) {
        Linking.openURL(url);
      } else {
        console.log("Don't know how to open URI: " + url);
      }
    });
  };

  return (
    <View>
      <View style={styles.movieContainer}>
        {movie && (
        <View>
        <Text style={styles.movieTitle}>{movie.movieTitle}</Text>
          <View style={styles.movieBodyContainer}>
            <View style={styles.movieRowContainer}>
              <Text style={styles.movieRowAvailable}>Available on:</Text>
              <View>
                {Object.values(movie.streamingServices).map((streamingService) => (
                  <View style={styles.movieStreamingService}>
                    <Button
                      onPress={() => handleNavigateToLink(streamingService.url)}
                      title={streamingService.display_name}
                    />
                  </View>
                ))}
              </View>
            </View>
            <View style={styles.movieRowContainer}>
              <Image style={styles.movieImage} source={{ uri: movie.picture }} />
            </View>
          </View>
          </View>
        )}
      </View>
      <View>
        <Button 
          onPress={() => dispatch(movieListIndexAction())}
          title="Next Movie" 
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  movieContainer: {
    flex: 1,
    backgroundColor: "#fff",
    marginBottom: 20,
    minHeight: 200,
    overflow: "auto",
    paddingTop: 5,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#fff",
  },
  movieBodyContainer: {
    flex: 1,
    flexDirection: "row",
  },
  movieImage: {
    width: "100%",
    height: "100%",
  },
  movieRowContainer: {
    width: "50%",
    flex: 1,
  },
  movieTitle: {
    textAlign: "center",
    fontSize: 20,
    width: "100%",
    marginBottom: 5,
  },
  movieRowAvailable: {
    alignSelf: "center",
    textDecorationLine: "underline",
    marginBottom: 5,
  },
  movieStreamingService: {
    marginBottom: 5,
  },
});

export default SwipeMovieCard;
