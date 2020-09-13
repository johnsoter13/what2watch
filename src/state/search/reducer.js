import { produce } from "immer";
import { MOVIE_FROM_SEARCH } from "./constants";
import { PENDING, SUCCESS } from "../constants";

const initialState = {
  moviesFromSearch: {},
  moviesFromSearchLoadingStatus: null,
};

export default produce((draft, action) => {
  switch (action.type) {
    case MOVIE_FROM_SEARCH:
      switch (action.status) {
        case PENDING:
          draft.movieStreamingServicesLoadingStatus = PENDING;
          break;
        case SUCCESS:
          const { query, movies } = action.payload;
          if (movies) {
            draft.moviesFromSearch[query] = movies;
          }
          draft.movieStreamingServicesLoadingStatus = SUCCESS;
          break;
        default:
          draft.movieStreamingServicesLoadingStatus = PENDING;
      }
      break;
    default:
  }
}, initialState);
