import { GENRES, MOVIES_BY_GENRE, MOVIE_STREAMING_SERVICES, MOVIE_INDEX } from "./constants";
import { PENDING, SUCCESS, FAILURE } from "../constants";
import {
  fetchMovieGenres,
  fetchMoviesByGenre,
  fetchMovieStreamingServices,
} from "../../lib/sdk";

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
    .catch((err) => {
      dispatch({
        type: GENRES,
        status: FAILURE,
      });
    });
};

export const fetchMoviesByGenreAction = (genre) => (dispatch) => {
  dispatch({
    type: MOVIES_BY_GENRE,
    status: PENDING,
  });
  return fetchMoviesByGenre(genre)
    .then((response) => response.text())
    .then((text) => JSON.parse(text))
    .then((moviesByGenre) => {
      // movies.forEach((movie) => {
      //   const movieId = movie.slice(
      //     movie.indexOf("tt"),
      //     movie.lastIndexOf("/")
      //   );
      //   dispatch(fetchMovieStreamingServicesAction(movieId, genre));
      // });
      dispatch({
        type: MOVIES_BY_GENRE,
        status: SUCCESS,
        payload: {genre, moviesByGenre},
      });
    })
    .catch((err) => {
      dispatch({
        type: MOVIES_BY_GENRE,
        status: FAILURE,
      });
    });
};

export const fetchMovieStreamingServicesAction = (movieId) => (
  dispatch
) => {
  dispatch({
    type: MOVIE_STREAMING_SERVICES,
    status: PENDING,
  });

  const actualMovieId = movieId.slice(
    movieId.indexOf("tt"),
    movieId.lastIndexOf("/")
  );

  return fetchMovieStreamingServices(actualMovieId)
    .then((response) => response.text())
    .then((text) => {
      const movieStreamServices = JSON.parse(text)?.collection?.locations;
      const movieTitle = JSON.parse(text)?.collection?.name;
      const moviePicture = JSON.parse(text)?.collection?.picture

      dispatch({
        type: MOVIE_STREAMING_SERVICES,
        status: SUCCESS,
        payload: { movieId, movieStreamServices, movieTitle, moviePicture },
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: MOVIE_STREAMING_SERVICES,
        status: FAILURE,
      });
    });
};

export const movieListIndexAction = () => (dispatch) => {
  return dispatch({
    type: MOVIE_INDEX,
    status: SUCCESS,
  });
};
