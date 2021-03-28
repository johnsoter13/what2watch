import React from 'react';
import {
  GENRES,
  MOVIES_BY_GENRE,
  MOVIE_STREAMING_SERVICES,
  MOVIE_INDEX,
  MOST_POPULAR_MOVIES,
} from './constants';
import { PENDING, SUCCESS, FAILURE } from '../constants';
import {
  fetchMovieGenres,
  fetchMoviesByGenre,
  fetchMovieStreamingServices,
  fetchUserDatabase,
  fetchMovieDetails,
  fetchRoomsDatabase,
  fetchMostPopularMovies,
} from '../../lib/sdk';

import {
  selectMovieIdByIndex,
  selectMovieIndex,
  selectMoviesByGenreExists,
  selectMovieStreamingServicesById,
} from './selectors';
import { selectUserIsLoggedIn, selectUserId } from '../auth/selectors';
import {
  selectRoomID,
  selectRoomKey,
  selectUserName,
  selectRoomUserID,
  selectRoomSize,
} from '../rooms/selectors';
import { movieMatchAction } from '../rooms/actions';
import { openModalAction } from '../modal/actions';
import MovieMatchModal from '../../components/Modals/MovieMatchModal';
import Firebase, { db } from '../../../config/Firebase';
import { MOST_POPULAR } from '../../components/MovieList/constants';

export const fetchMovieGenresAction = () => (dispatch) => {
  dispatch({
    type: GENRES,
    status: PENDING,
  });
  return fetchMovieGenres()
    .then((response) => response.text())
    .then((text) => {
      const genres = JSON.parse(text);

      dispatch({
        type: GENRES,
        status: SUCCESS,
        payload: genres,
      });
    })
    .catch(() => {
      dispatch({
        type: GENRES,
        status: FAILURE,
      });
    });
};

export const fetchMoviesByGenreAction = (genre, endpoint) => (
  dispatch,
  getState
) => {
  dispatch({
    type: MOVIES_BY_GENRE,
    status: PENDING,
  });
  const moviesByGenreExist = selectMoviesByGenreExists(getState(), genre);
  if (moviesByGenreExist) {
    return dispatch({
      type: MOVIES_BY_GENRE,
      status: SUCCESS,
    });
  }
  return fetchMoviesByGenre(endpoint)
    .then((response) => response.text())
    .then((text) => JSON.parse(text))
    .then((moviesByGenre) => {
      dispatch({
        type: MOVIES_BY_GENRE,
        status: SUCCESS,
        payload: { genre, moviesByGenre },
      });
    })
    .catch(() => {
      dispatch({
        type: MOVIES_BY_GENRE,
        status: FAILURE,
      });
    });
};

export const fetchMovieStreamingServicesAction = (
  genre = MOST_POPULAR
) => async (dispatch, getState) => {
  dispatch({
    type: MOVIE_STREAMING_SERVICES,
    status: PENDING,
  });
  const movieIndex = selectMovieIndex(getState(), genre);

  try {
    for (let i = movieIndex; i < movieIndex + 2; i++) {
      const movieId = selectMovieIdByIndex(getState(), genre, i);

      const actualMovieId = movieId.slice(
        movieId.indexOf('tt'),
        movieId.lastIndexOf('/')
      );

      const fetchMovieStreamingServicesResponse = await fetchMovieStreamingServices(
        actualMovieId
      );

      if (fetchMovieStreamingServicesResponse.ok) {
        const movieStreamServices = await fetchMovieStreamingServicesResponse.json();

        const fetchMovieDetailsResponse = await fetchMovieDetails(
          actualMovieId
        );

        if (fetchMovieDetailsResponse.ok) {
          const movieDetails = await fetchMovieDetailsResponse.json();

          dispatch({
            type: MOVIE_STREAMING_SERVICES,
            status: SUCCESS,
            payload: {
              movieId,
              movieStreamServices: movieStreamServices?.collection?.locations,
              movieTitle: movieDetails?.title?.title,
              moviePicture: movieDetails?.title?.image?.url,
              moviePlot: movieDetails?.plotOutline?.text,
              movieRating: movieDetails?.ratings?.rating,
              movieReleaseDate: movieDetails?.releaseDate,
              movieReleaseYear: movieDetails?.title?.year,
              movieRunningTime: movieDetails?.title?.runningTimeInMinutes,
            },
          });
        }
      }
    }
  } catch (err) {
    console.log(err);
    dispatch({
      type: MOVIE_STREAMING_SERVICES,
      status: FAILURE,
    });
  }
};

export const movieListIndexAction = (genre = MOST_POPULAR, reset) => (
  dispatch,
  getState
) => {
  const currentGenreIndex = selectMovieIndex(getState(), genre);

  dispatch({
    type: MOVIE_INDEX,
    status: SUCCESS,
    payload: { genre, newIndex: reset ? 0 : currentGenreIndex + 1 },
  });
};

export const saveMovieAction = (genre, liked, movie) => (
  dispatch,
  getState
) => {
  const isUserLoggedIn = selectUserIsLoggedIn(getState());
  const movieIndex = selectMovieIndex(getState(), genre);
  const movieId = selectMovieIdByIndex(getState(), genre, movieIndex);
  const actualMovieId = movieId.slice(
    movieId.indexOf('tt'),
    movieId.lastIndexOf('/')
  );
  const roomSize = selectRoomSize(getState());

  if (!movie) {
    movie = selectMovieStreamingServicesById(getState(), movieId);
  }
  // console.log(movie);

  if (!liked && isUserLoggedIn) {
    const uid = selectUserId(getState());

    // this is overriding the database
    fetchUserDatabase(uid)
      .child('movies/disliked')
      .push(actualMovieId)
      // ,
      // (error) => {
      //   if (error) {
      //     console.log('failed! ' + error)
      //   }
      // }
      .then(() => console.log('Movie disliked!'));
  }

  const roomID = selectRoomID(getState());
  const roomKey = selectRoomKey(getState());
  const userName = selectUserName(getState());
  const roomUserID = selectRoomUserID(getState());
  const movieName = movie.movieTitle;

  // saving user's like/dislike of the movie if in a room
  if (roomID && roomKey) {
    const movieObj = {
      movieName: movieName,
      users: [{ [roomUserID]: { [userName]: liked } }],
      tests: [{ [userName]: liked }],
    };

    let users = [];
    let tests = [];
    // let inDB = false;

    const refMovieId = fetchRoomsDatabase(roomKey + '/movies/' + actualMovieId);

    refMovieId.once(
      'value',
      function (snapshot) {
        if (snapshot.val()) {
          // inDB = true;
          users = snapshot.val().users;
          tests = snapshot.val().tests;
          // when there's only 1 user, it's not an array in firebase
          if (!Array.isArray(users)) {
            users = [users];
          }

          // search through users/tests and modify specific name
          let usersIndex = -1;
          if (users.indexOf(roomUserID) !== -1) {
            users[users.indexOf(roomUserID)] = liked;
          }
          let testsIndex = -1;
          if (tests.indexOf(userName) !== -1) {
            tests[tests.indexOf(userName)] = liked;
          } else {
            users.push({ [roomUserID]: { [userName]: liked } });
            tests.push({ [userName]: liked });
          }

          let found = true;
          // check if everyone is in the room
          if (roomSize !== 1 && users.length === roomSize) {
            users.forEach((element) => {
              if (!Object.values(Object.values(element)[0])[0]) {
                found = false;
              }
            });
          }

          let testFound = true;
          if (roomSize !== 1 && tests.length === roomSize) {
            tests.forEach((element) => {
              if (!Object.values(element)[0]) {
                found = false;
              }
            });
          }

          if (found) {
            dispatch(openModalAction(<MovieMatchModal movieId={movieId} />));
            fetchRoomsDatabase(roomKey).update({ found: movieId });
          }

          if (testFound) {
            console.log('Test has found a match');
          }

          refMovieId.update({
            users: users,
            tests: tests,
          });
        } else {
          refMovieId.set(movieObj).then(() => console.log('Sent to room!'));
        }
      },
      function (errorObject) {
        console.log('The read failed: ' + errorObject.code);
      }
    );
  }
};

export const fetchMostPopularMoviesActions = () => (dispatch) => {
  dispatch({
    type: MOST_POPULAR_MOVIES,
    status: PENDING,
  });

  return fetchMostPopularMovies()
    .then((response) => response.text())
    .then((text) => JSON.parse(text))
    .then((mostPopularMovies) => {
      dispatch({
        type: MOST_POPULAR_MOVIES,
        status: SUCCESS,
        payload: { mostPopularMovies },
      });
    })
    .catch(() => {
      dispatch({
        type: MOST_POPULAR_MOVIES,
        status: FAILURE,
      });
    });
};
