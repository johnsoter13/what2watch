import { produce } from "immer";
import { MOVIE_FROM_SEARCH, SEARCH_QUERY } from "./constants";
import { FAILURE, PENDING, SUCCESS } from "../constants";

const initialState = {
  moviesFromSearch: {},
  moviesFromSearchLoadingStatus: null,
  searchQuery: "",
};

export default produce((draft, action) => {
  switch (action.type) {
    case MOVIE_FROM_SEARCH:
      switch (action.status) {
        case PENDING:
          draft.moviesFromSearchLoadingStatus = PENDING;
          break;
        case SUCCESS:
          const { query, movies } = action.payload;
          if (movies) {
            draft.moviesFromSearch[query] = movies;
          }
          draft.moviesFromSearchLoadingStatus = SUCCESS;
          break;
        default:
          draft.moviesFromSearchLoadingStatus = FAILURE;
      }
      break;
    case SEARCH_QUERY:
      switch (action.status) {
        case SUCCESS:
          const { searchQuery } = action.payload;
          draft.searchQuery = searchQuery;
          break;
      }
      break;
    default:
  }
}, initialState);
