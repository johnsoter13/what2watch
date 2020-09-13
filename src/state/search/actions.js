import { PENDING, SUCCESS, FAILURE } from "../constants";
import { fetchMovieFromSearch } from "../../lib/sdk";

import { MOVIE_FROM_SEARCH } from "./constants";

export const fetchMovieFromSearchAction = (query) => (dispatch) => {
  dispatch({
    type: MOVIE_FROM_SEARCH,
    status: PENDING,
  });
  return fetchMovieFromSearch(query)
    .then((response) => response.text())
    .then((text) => {
      const movies = JSON.parse(text)?.results;

      dispatch({
        type: MOVIE_FROM_SEARCH,
        status: SUCCESS,
        payload: { query, movies },
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: MOVIE_FROM_SEARCH,
        status: FAILURE,
      });
    });
};
