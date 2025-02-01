import React, { useCallback, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native'

import {
  movieListIndexAction,
  saveMovieAction,
} from '../../state/movies/actions'
import * as baseStyles from '../../styles/styles'
import Loading from '../Loading'
import { useMovie } from '../../hooks/useMovie'
import MovieListItem from '../MovieListItem'
import { movieMatchAction } from '../../state/rooms/actions'
import SwipeContainer from '../SwipeContainer'
import { MOST_POPULAR, MOVIES_ARRAY_MAX_LENGTH } from './constants'
import { GENRE_SCREEN } from '../../constants/ROUTES'
import { selectMatchedMovieId } from '../../state/rooms/selectors'
import MovieMatch from '../MovieMatch'

const MovieList = ({ navigation, route }) => {
  const dispatch = useDispatch()
  const genre = route?.params?.genre || MOST_POPULAR
  const [leftSwipeStreak, setLeftSwipeStreak] = useState(0)
  const [movieIndex, movie, movieLoadingComplete, sharedServices] = useMovie(
    genre
  )
  const matchedMovieId = useSelector(selectMatchedMovieId)

  const handleRightSwipe = () => {
    // Reset on a right swipe
    setLeftSwipeStreak(0)
    dispatch(saveMovieAction(true, movie.movieId))
    dispatch(movieMatchAction())
    dispatch(movieListIndexAction(genre))
  }

  const handleLeftSwipe = () => {
    dispatch(saveMovieAction(false, movie.movieId))
    dispatch(movieListIndexAction(genre))
    setLeftSwipeStreak(leftSwipeStreak + 1)
  }

  const renderMatchedMovie = () => {
    return <MovieMatch genre={genre} />
  }

  const renderMovieList = () => {
    return (
      <View style={styles.container}>
        {leftSwipeStreak >= 10 && (
          <TouchableOpacity
            style={styles.genreButton}
            onPress={() => {
              setLeftSwipeStreak(0)
              navigation.navigate(GENRE_SCREEN)
            }}
          >
            <Text style={styles.nextMovieButtonText}>
              {genre === MOST_POPULAR
                ? 'Swipe By Genre Instead'
                : 'Switch Genres'}
            </Text>
          </TouchableOpacity>
        )}
        {movieLoadingComplete && (
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
                  handleLeftSwipe()
                }}
              >
                <Text style={styles.nextMovieButtonText}>No</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.nextMovieButton}
                onPress={() => {
                  handleRightSwipe()
                }}
              >
                <Text style={styles.nextMovieButtonText}>Yes</Text>
              </TouchableOpacity>
            </View>
          </>
        )}
        {!movieLoadingComplete && movieIndex < MOVIES_ARRAY_MAX_LENGTH && (
          <>
            <View style={styles.movieContainer}>
              <View style={styles.movieBodyContainer}>
                <Loading loadingComplete={movieLoadingComplete} />
              </View>
            </View>
            <View style={styles.swipeCardButtonContainer}>
              <TouchableOpacity
                style={[styles.moreInfoButton, styles.disabledButton]}
                onPress={() => {
                  handleLeftSwipe()
                }}
                disabled
              >
                <Text style={[styles.nextMovieButtonText, styles.disabledText]}>
                  No
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.nextMovieButton, styles.disabledButton]}
                onPress={() => {
                  handleRightSwipe()
                }}
                disabled
              >
                <Text style={[styles.nextMovieButtonText, styles.disabledText]}>
                  Yes
                </Text>
              </TouchableOpacity>
            </View>
          </>
        )}
        {movieIndex > MOVIES_ARRAY_MAX_LENGTH && (
          <>
            <View style={styles.movieContainer}>
              <View style={styles.outOfSwipesContainer}>
                <Text style={styles.outOfSwipesText}>
                  You have run out of movies, try changing genres...or being
                  less picky
                </Text>
                <View style={styles.outOfSwipesButtonContainer}>
                  <TouchableOpacity
                    style={styles.outOfSwipesButton}
                    onPress={() => {
                      dispatch(movieListIndexAction(genre, true))
                      setLeftSwipeStreak(0)
                    }}
                    disabled
                  >
                    <Text style={styles.nextMovieButtonText}>Start Over</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.outOfSwipesButton}
                    onPress={() => {
                      setLeftSwipeStreak(0)
                      navigation.navigate(GENRE_SCREEN)
                    }}
                    disabled
                  >
                    <Text style={styles.nextMovieButtonText}>Change Genre</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </>
        )}
      </View>
    )
  }

  return matchedMovieId ? renderMatchedMovie() : renderMovieList()
}

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
  },
  outOfSwipesContainer: {
    padding: 20,
    justifyContent: 'center',
    height: '100%',
  },
  outOfSwipesText: {
    flex: 1,
    fontSize: 20,
  },
  outOfSwipesButtonContainer: {
    alignSelf: 'center',
    width: '100%',
    height: '30%',
  },
  outOfSwipesButton: {
    marginTop: 40,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    backgroundColor: baseStyles.BUTTON_COLOR,
    borderRadius: baseStyles.BUTTON_BORDER_RADIUS,
    height: '100%',
  },
  disabledButton: {
    backgroundColor: baseStyles.DISABLED_BUTTON_COLOR,
  },
  disabledText: {
    color: baseStyles.BUTTON_COLOR,
  },
})

export default MovieList
