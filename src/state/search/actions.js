import { PENDING, SUCCESS, FAILURE } from '../constants';
import { fetchMovieFromSearch, fetchMovieDetails } from '../../lib/sdk';

import { MOVIE_FROM_SEARCH, SEARCH_QUERY } from './constants';

export const fetchMovieFromSearchAction = (query) => async (dispatch) => {
  dispatch({
    type: MOVIE_FROM_SEARCH,
    status: PENDING,
  });
  try {
    const searchResponse = await fetchMovieFromSearch(query);
    const sanitizedMovies = [];

    if (searchResponse.ok) {
      const searchMovies = await searchResponse.json();

      for (let i = 0; i < searchMovies.results.length; i++) {
        const movie = searchMovies.results[i];
        const fetchMovieDetailsResponse = await fetchMovieDetails(
          movie.external_ids.imdb.id
        );

        if (fetchMovieDetailsResponse.ok) {
          const movieDetails = await fetchMovieDetailsResponse.json();

          sanitizedMovies.push({
            movieStreamServices: movie?.locations,
            movieTitle: movieDetails?.title?.title,
            moviePicture: movieDetails?.title?.image?.url,
            moviePlot: movieDetails?.plotOutline?.text,
            movieRating: movieDetails?.ratings?.rating,
            movieReleaseDate: movieDetails?.releaseDate,
            movieReleaseYear: movieDetails?.title?.year,
            movieRunningTime: movieDetails?.title?.runningTimeInMinutes,
          });
        }
      }
    }
    const sortedMovies = sanitizedMovies.sort((a, b) => b.movieReleaseYear - a.movieReleaseYear);

    dispatch({
      type: MOVIE_FROM_SEARCH,
      status: SUCCESS,
      payload: { query, movies: sortedMovies },
    });
  } catch {
    dispatch({
      type: MOVIE_FROM_SEARCH,
      status: FAILURE,
    });
  }
};

export const setSearchQueryAction = (query) => (dispatch) => {
  dispatch({
    type: SEARCH_QUERY,
    status: SUCCESS,
    payload: { searchQuery: query },
  });
};
