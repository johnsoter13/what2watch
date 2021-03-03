import React, { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';

import {
  movieListIndexAction,
  saveMovieAction,
} from '../../state/movies/actions';
import * as baseStyles from '../../styles/styles';
import Loading from '../Loading';
import { useMovie } from '../../hooks/useMovie';
import MovieListItem from '../MovieListItem';
import { movieMatchAction } from '../../state/rooms/actions';
import SwipeContainer from '../SwipeContainer';
import { MOST_POPULAR } from './constants';
import { openModalAction } from '../../state/modal/actions';
import { GENRE_SCREEN } from '../../constants/ROUTES';

const MovieList = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const genre = route?.params?.genre || MOST_POPULAR;
  const [leftSwipeStreak, setLeftSwipeStreak] = useState(0);
  const [movie, movieLoadingComplete, sharedServices] = useMovie(genre);

  const handleRightSwipe = useCallback(
    () => {
      dispatch(saveMovieAction(genre, true, movie));
      dispatch(movieListIndexAction(genre));
      dispatch(movieMatchAction(movie.movieId, true));
      // Reset on a right swipe
      setLeftSwipeStreak(0);
    }, [movie]
  );

  const handleLeftSwipe = useCallback(
    () => {
      dispatch(saveMovieAction(genre, false, movie));
      dispatch(movieListIndexAction(genre));
      setLeftSwipeStreak(leftSwipeStreak + 1);
    }, [movie]
  );

  return (
    <View style={styles.container}>
      {leftSwipeStreak >= 10 && 
        <TouchableOpacity
          style={styles.genreButton}
          onPress={() => {
            setLeftSwipeStreak(0);
            navigation.navigate(GENRE_SCREEN);
          }}
        >
          <Text style={styles.nextMovieButtonText}>{genre === MOST_POPULAR ? 'Swipe By Genre Instead' : 'Switch Genres'}</Text>
        </TouchableOpacity>
      }
      {movieLoadingComplete ? (
        <>
          <SwipeContainer
            handleRightSwipe={() => handleRightSwipe()}
            handleLeftSwipe={() => handleLeftSwipe()}
            components={
              <View style={styles.movieContainer}>
                <View style={styles.movieBodyContainer}>
                  {movieLoadingComplete && (
                    <MovieListItem
                      swipeCard
                      sharedServices={sharedServices}
                      movie={movie}
                    />
                  )}
                </View>
              </View>
            }
          />
          <View style={styles.swipeCardButtonContainer}>
            <TouchableOpacity
              style={styles.moreInfoButton}
              onPress={() => {
                handleLeftSwipe();
              }}
            >
              <Text style={styles.nextMovieButtonText}>No</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.nextMovieButton}
              onPress={() => {
                handleRightSwipe();
              }}
            >
              <Text style={styles.nextMovieButtonText}>Yes</Text>
            </TouchableOpacity>
          </View>
        </>
      ) : (
        <>
          <View style={styles.movieContainer}>
            <View style={styles.movieBodyContainer}>
              <Loading loadingComplete={movieLoadingComplete} />
            </View>
          </View>
          <View style={styles.swipeCardButtonContainer}>
            <TouchableOpacity
              style={styles.moreInfoButton}
              onPress={() => {
                handleLeftSwipe();
              }}
              disabled
            >
              <Text style={styles.nextMovieButtonText}>No</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.nextMovieButton}
              onPress={() => {
                handleRightSwipe();
              }}
              disabled
            >
              <Text style={styles.nextMovieButtonText}>Yes</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    justifyContent: 'center',
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
    maxHeight: 600,
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
    marginTop: 20,
  },
  tinderCard: {
    height: 600,
    width: '100%',
  },
  genreButton: {
    height: '5%',
    marginBottom: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: baseStyles.BUTTON_COLOR,
    borderRadius: baseStyles.BUTTON_BORDER_RADIUS,
  }
});

export default MovieList;
