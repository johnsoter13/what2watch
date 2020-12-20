import { produce } from "immer";
import { GENRES, MOVIES_BY_GENRE, MOVIE_STREAMING_SERVICES, MOVIE_INDEX } from "./constants";
import { FAILURE, PENDING, SUCCESS } from "../constants";

const initialState = {
  genres: {},
  moviesByGenre: {},
  genreLoadingStatus: null,
  moviesByGenreLoadingStatus: null,
  movieStreamingServices: {},
  movieStreamingServicesLoadingStatus: null,
  movieIndexes: {},
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
    case MOVIE_INDEX:
      switch (action.status) {
        case SUCCESS:
          const {genre, reset} = action.payload;

          if (reset) {
            draft.movieIndexes = {};
          } else {
            const newMovieIndex = draft.movieIndexes[genre] ? draft.movieIndexes[genre] + 1 : 1;
            draft.movieIndexes[genre] = newMovieIndex;
          }
          break;
      }
      break;
      case MOVIES_BY_GENRE:
        switch (action.status) {
          case PENDING:
            draft.moviesByGenreLoadingStatus = PENDING;
            break;
          case SUCCESS:
            draft.moviesByGenre[action.payload?.genre] =
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
            movieId,
            movieStreamServices,
            movieTitle,
            moviePicture,
          } = action.payload;
          if (movieStreamServices) {
            draft.movieStreamingServices[movieId] = {
              movieTitle,
              picture: moviePicture,
              streamingServices: createMovieStreamingServiceObj(
                movieStreamServices
              ),
            };
          } else {
            draft.movieStreamingServices[movieId] = 'not available'
          }
          draft.movieStreamingServicesLoadingStatus = SUCCESS;
          break;
        default:
          draft.movieStreamingServicesLoadingStatus = FAILURE;
      }
      break;
    default:
  }
}, initialState);
