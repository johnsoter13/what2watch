import { produce } from "immer";
import { GENRES, MOVIES_BY_GENRE, MOVIE_STREAMING_SERVICES } from "./constants";
import { PENDING, SUCCESS } from "../constants";

const initialState = {
  genres: {},
  genreLoadingStatus: null,
  moviesByGenreLoadingStatus: null,
  movieStreamingServices: {},
  movieStreamingServicesLoadingStatus: null,
};

const createGenresObj = (genres) => {
  const genresObj = {};

  genres.map((genre) => {
    genresObj[genre.description] = genre;
  });

  return genresObj;
};

const createMovieStreamingServiceObj = (streamingServices) => {
  const movieStreamingServicesObj = {};

  streamingServices.map((streamingService) => {
    movieStreamingServicesObj[streamingService?.name] = streamingService;
  });

  return movieStreamingServicesObj;
};

export default produce((draft, action) => {
  switch (action.type) {
    case GENRES:
      switch (action.status) {
        case PENDING:
          draft.genreLoadingStatus = PENDING;
          break;
        case SUCCESS:
          draft.genres = createGenresObj(action.payload?.genres);
          draft.genreLoadingStatus = SUCCESS;
          break;
        default:
          draft.genreLoadingStatus = PENDING;
      }
      break;
    case MOVIES_BY_GENRE:
      switch (action.status) {
        case PENDING:
          draft.moviesByGenreLoadingStatus = PENDING;
          break;
        case SUCCESS:
          draft.moviesByGenre[action.payload.genre] =
            action.payload?.moviesByGenre;
          draft.moviesByGenreLoadingStatus = SUCCESS;
          break;
        default:
          draft.moviesByGenreLoadingStatus = PENDING;
      }
      break;
    case MOVIE_STREAMING_SERVICES:
      switch (action.status) {
        case PENDING:
          draft.movieStreamingServicesLoadingStatus = PENDING;
          break;
        case SUCCESS:
          const {
            genre,
            movieId,
            movieStreamServices,
            movieTitle,
          } = action.payload;
          if (movieStreamServices) {
            draft.movieStreamingServices[movieId] = {
              genre,
              movieTitle,
              streamingServices: createMovieStreamingServiceObj(
                movieStreamServices
              ),
            };
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
