import {
  GENRES,
  MOVIES_BY_GENRE,
  MOVIE_STREAMING_SERVICES,
  MOVIE_INDEX,
} from './constants';
import { PENDING, SUCCESS, FAILURE } from '../constants';
import {
  fetchMovieGenres,
  fetchMoviesByGenre,
  fetchMovieStreamingServices,
  fetchUserDatabase,
  fetchMovieDetails,
  fetchRoomsDatabase,
} from '../../lib/sdk';

import {
  selectMovieIdByIndex,
  selectMovieIndex,
  selectMoviesByGenreExists,
} from './selectors';
import { selectUserIsLoggedIn, selectUserId } from '../auth/selectors';
import {
  selectRoomID,
  selectRoomKey,
  selectUserName,
} from '../rooms/selectors';
import Firebase, { db } from '../../../config/Firebase';

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

export const fetchMovieStreamingServicesAction = (genre) => async (
  dispatch,
  getState
) => {
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

export const movieListIndexAction = (genre) => (dispatch, getState) => {
  dispatch({
    type: MOVIE_INDEX,
    status: SUCCESS,
    payload: { genre },
  });
};

export const saveMovieAction = (genre, disliked, movie) => (
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

  // console.log(movie);

  if (disliked && isUserLoggedIn) {
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
  const movieName = movie.movieTitle;

  if (roomID && roomKey && disliked) {
    const movieObj = {
      movieName: movieName,
      users: [userName],
    };

    let users = [];
    let inDB = false;

    const refMovieId = fetchRoomsDatabase(roomKey + '/movies/' + actualMovieId);

    refMovieId.once(
      'value',
      function (snapshot) {
        if (snapshot.val()) {
          inDB = true;
          users = snapshot.val().users;
          users.push(userName);
          refMovieId.update({
            users: users,
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
