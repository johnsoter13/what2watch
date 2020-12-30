import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';

import SwipeMovieCard from '../SwipeMovieCard';
import { movieListIndexAction } from '../../state/movies/actions';
import * as baseStyles from '../../styles/styles';
import Loading from '../Loading';
import { useMovie } from '../../hooks/useMovie';

const MovieList = ({ route }) => {
  const dispatch = useDispatch();
  const { genre } = route.params;
  const [moreInfoToggle, setMoreInfoToggle] = useState(false);

  const [movie, movieLoadingComplete, sharedServices] = useMovie(genre);

  return (
    <View style={styles.container}>
      <View style={styles.swipeContainer}>
        <View style={styles.movieContainer}>
          <View style={styles.movieBodyContainer}>
            <Loading loadingComplete={movieLoadingComplete} />
            {movieLoadingComplete && (
              <>
                <SwipeMovieCard
                  moreInfoToggle={moreInfoToggle}
                  sharedServices={sharedServices}
                  movie={movie}
                />
              </>
            )}
          </View>
        </View>
      </View>
      {movieLoadingComplete && (
        <View style={styles.swipeCardButtonContainer}>
          <TouchableOpacity
            style={styles.moreInfoButton}
            onPress={() => setMoreInfoToggle(!moreInfoToggle)}
          >
            <Text style={styles.nextMovieButtonText}>More Info</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.nextMovieButton}
            onPress={() => {
              setMoreInfoToggle(false);
              dispatch(movieListIndexAction(genre, true));
            }}
          >
            <Text style={styles.nextMovieButtonText}>Next Movie</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    justifyContent: 'center',
  },
  swipeContainer: {
    height: '80%',
  },
  loading: {
    flex: 1,
  },
  movieContainer: {
    flex: 1,
    height: '100%',
    backgroundColor: '#fff',
    marginBottom: 20,
    paddingTop: 5,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#fff',
  },
  movieBodyContainer: {
    flex: 1,
  },
  nextMovieButton: {
    marginLeft: 5,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    backgroundColor: baseStyles.BUTTON_COLOR,
    borderRadius: baseStyles.BUTTON_BORDER_RADIUS,
    height: '100%',
  },
  moreInfoButton: {
    marginRight: 5,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    backgroundColor: baseStyles.BUTTON_COLOR,
    borderRadius: baseStyles.BUTTON_BORDER_RADIUS,
    height: '100%',
  },
  nextMovieButtonText: {
    color: baseStyles.BUTTON_TEXT_COLOR,
  },
  swipeCardButtonContainer: {
    flexDirection: 'row',
    height: '5%',
  },
});

export default MovieList;
