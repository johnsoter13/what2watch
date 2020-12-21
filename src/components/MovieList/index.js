import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import {
  selectMovieIndex,
  selectMoviesByGenreLoadingStatus,
  selectMovieStreamingServicesLoadingStatus,
  selectMovieStreamingServicesById,
  selectMovieIdByIndex,
} from '../../state/movies/selectors';
import { selectUserStreamingServices } from '../../state/streaming/selectors';
import SwipeMovieCard from '../SwipeMovieCard';
import { PENDING, SUCCESS } from '../../state/constants';
import {
  movieListIndexAction,
  fetchMovieStreamingServicesAction,
} from '../../state/movies/actions';
import * as baseStyles from '../../styles/styles';
import { checkIfMovieIsAvailableToUser } from '../../utils/moviesUtils';
import Loading from '../Loading';

const MovieList = ({ route }) => {
  const dispatch = useDispatch();
  const { genre } = route.params;
  const movieIndex = useSelector((state) => selectMovieIndex(state, genre));
  const [moreInfoToggle, setMoreInfoToggle] = useState(false);
  const movieId = useSelector((state) =>
    selectMovieIdByIndex(state, genre, movieIndex)
  );
  const movie = useSelector((state) =>
    selectMovieStreamingServicesById(state, movieId)
  );
  const userStreamingServices = useSelector(selectUserStreamingServices);
  const moviesByGenreLoadingStatus = useSelector(
    selectMoviesByGenreLoadingStatus
  );
  const movieStreamingServicesLoadingStatus = useSelector(
    selectMovieStreamingServicesLoadingStatus
  );
  const [sharedServices, setSharedServices] = useState([]);

  useEffect(() => {
    if (!movieId) {
      return;
    }
    // if not in store, fetch movie
    else if (!movie) {
      dispatch(fetchMovieStreamingServicesAction(movieId));
      // sometimes endpoint errors, skip to next movie
    } else if (movie === 'not available') {
      dispatch(movieListIndexAction(genre, movieId, false));
      // check if we have shared streaming services
    } else {
      const sharedServicesForMovie = checkIfMovieIsAvailableToUser(
        userStreamingServices,
        movie
      );

      // if yes, set shared services
      if (sharedServicesForMovie.length) {
        setSharedServices(sharedServicesForMovie);
        // skip to next movie
      } else {
        dispatch(movieListIndexAction(genre, movieId, false));
      }
    }
  }, [movie, movieId, dispatch, fetchMovieStreamingServicesAction]);

  return (
    <View style={styles.container}>
      <View style={styles.swipeContainer}>
        <View style={styles.movieContainer}>
          <View style={styles.movieBodyContainer}>
            <Loading
              loadingComplete={
                !!(
                  moviesByGenreLoadingStatus === SUCCESS &&
                  movieStreamingServicesLoadingStatus === SUCCESS &&
                  sharedServices.length > 0 &&
                  movie
                )
              }
            />
            {moviesByGenreLoadingStatus === SUCCESS &&
              movieStreamingServicesLoadingStatus === SUCCESS &&
              sharedServices.length > 0 &&
              movie && (
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
      {moviesByGenreLoadingStatus === SUCCESS &&
        movieStreamingServicesLoadingStatus === SUCCESS &&
        sharedServices &&
        movie && (
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
                setSharedServices([]);
                dispatch(movieListIndexAction(genre, movieId, true));
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
    overflow: 'auto',
    paddingTop: 5,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#fff',
  },
  movieBodyContainer: {
    flex: 1,
  },
  nextMovieButton: {
    marginLeft: '5px',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    backgroundColor: baseStyles.BUTTON_COLOR,
    borderRadius: baseStyles.BUTTON_BORDER_RADIUS,
    height: '100%',
  },
  moreInfoButton: {
    marginRight: '5px',
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
