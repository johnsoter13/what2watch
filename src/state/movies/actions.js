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
} from '../../lib/sdk';

import { selectMoviesByGenreExists } from './selectors';

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

export const fetchMovieStreamingServicesAction = (movieId) => async (
  dispatch
) => {
  dispatch({
    type: MOVIE_STREAMING_SERVICES,
    status: PENDING,
  });

  const actualMovieId = movieId.slice(
    movieId.indexOf('tt'),
    movieId.lastIndexOf('/')
  );

  try {
    const fetchMovieStreamingServicesResponse = await fetchMovieStreamingServices(
      actualMovieId
    );

    if (fetchMovieStreamingServicesResponse.ok) {
      const movieStreamServices = await fetchMovieStreamingServicesResponse.json();

      const fetchMovieDetailsResponse = await fetchMovieDetails(actualMovieId);

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
  } catch (err) {
    console.log(err);
    dispatch({
      type: MOVIE_STREAMING_SERVICES,
      status: FAILURE,
    });
  }
};

export const movieListIndexAction = (
  genre,
  isUserLoggedIn = false,
  uid = '',
  movieId
) => (dispatch) => {
  dispatch({
    type: MOVIE_INDEX,
    status: SUCCESS,
    payload: { genre },
  });
  if (isUserLoggedIn) {
    const actualMovieId = movieId.slice(
      movieId.indexOf('tt'),
      movieId.lastIndexOf('/')
    );
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
};
