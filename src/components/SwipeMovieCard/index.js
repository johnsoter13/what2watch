import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { StyleSheet, View, Button, Text, Image, Linking } from 'react-native';

import {
  selectMovieStreamingServicesById,
  selectMovieStreamingServicesLoadingStatus,
  selectMovieIdByIndex,
} from '../../state/movies/selectors';
import {
  movieListIndexAction,
  fetchMovieStreamingServicesAction,
} from '../../state/movies/actions';
import { checkIfMovieIsAvailableToUser } from '../../utils/moviesUtils';
import { SUCCESS } from '../../state/constants';

const SwipeMovieCard = ({ movie, sharedServices }) => {
  const dispatch = useDispatch();
  // const movieId = useSelector((state) =>
  //   selectMovieIdByIndex(state, genre, movieIndex)
  // );
  // const [sharedServices, setSharedServices] = useState([]);
  // const movie = useSelector((state) =>
  //   selectMovieStreamingServicesById(state, movieId)
  // );

  // useEffect(() => {
  //   if (!movieId) {
  //     return;
  //   }
  //   // if not in store, fetch movie
  //   if (!movie) {
  //     dispatch(fetchMovieStreamingServicesAction(movieId));
  //     // sometimes endpoint errors, skip to next movie
  //   } else if (movie === 'not available') {
  //     dispatch(movieListIndexAction(genre));
  //     // check if we have shared streaming services
  //   } else {
  //     const sharedServicesForMovie = checkIfMovieIsAvailableToUser(
  //       userStreamingServices,
  //       movie
  //     );

  //     // if yes, set shared services
  //     if (sharedServicesForMovie.length) {
  //       setSharedServices(sharedServicesForMovie);
  //       // skip to next movie
  //     } else {
  //       dispatch(movieListIndexAction(genre));
  //     }
  //   }
  // }, [movie, movieId, dispatch, fetchMovieStreamingServicesAction]);

  const handleNavigateToLink = (url) => {
    Linking.canOpenURL(url).then((supported) => {
      if (supported) {
        Linking.openURL(url);
      } else {
        console.log(`Don't know how to open URI: ${url}`);
      }
    });
  };

  return (
    <>
      <Text style={styles.movieTitle}>{movie.movieTitle}</Text>
      <View style={styles.movieBodyContainer}>
        <View style={styles.imageContainer}>
          <Image style={styles.movieImage} source={{ uri: movie.picture }} />
        </View>
        <View style={styles.movieRowContainer}>
          <Text style={styles.movieRowAvailable}>Available on:</Text>
          <View style={styles.movieStreamingServices}>
            {sharedServices.map((streamingService) => (
              <View key={streamingService} style={styles.movieStreamingService}>
                <Button
                  onPress={() => handleNavigateToLink(streamingService.url)}
                  title={streamingService.display_name}
                />
              </View>
            ))}
          </View>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  movieBodyContainer: {
    flex: 1,
  },
  imageContainer: {
    width: '100%',
    height: '50%',
  },
  movieImage: {
    width: '100%',
    height: '100%',
  },
  movieRowContainer: {
    flex: 1,
  },
  movieTitle: {
    textAlign: 'center',
    fontSize: 20,
    width: '100%',
    marginBottom: 5,
    height: '5%',
  },
  movieRowAvailable: {
    alignSelf: 'center',
    textDecorationLine: 'underline',
    marginBottom: 5,
  },
  movieStreamingService: {
    marginBottom: 5,
  },
  movieStreamingServices: {
    flex: 1,
    overflow: 'auto',
  },
});

export default SwipeMovieCard;
