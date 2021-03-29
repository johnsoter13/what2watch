import { produce } from 'immer';
import {
  GENRES,
  MOVIES_BY_GENRE,
  MOVIE_STREAMING_SERVICES,
  MOVIE_INDEX,
  MOST_POPULAR_MOVIES,
  SET_CURRENT_MOVIE_ID,
  SET_CURRENT_GENRE,
} from './constants';
import { FAILURE, PENDING, SUCCESS } from '../constants';
import { MOST_POPULAR } from '../../components/MovieList/constants';

const initialState = {
  genres: {},
  moviesByGenre: {},
  genreLoadingStatus: null,
  moviesByGenreLoadingStatus: null,
  movieStreamingServices: {},
  movieStreamingServicesLoadingStatus: null,
  movieIndexes: {},
  mostPopularMovies: [],
  currentMovieId: '',
  currentGenre: MOST_POPULAR,
};

const createGenresObj = (genres) => {
  const genresObj = {};

  // eslint-disable-next-line no-return-assign
  genres.map((genre) => (genresObj[genre.description] = genre));

  return genresObj;
};

const createMovieStreamingServiceObj = (streamingServices) => {
  const movieStreamingServicesObj = {};

  // eslint-disable-next-line array-callback-return
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
          const { genre, newIndex, reset } = action.payload;

          if (reset) {
            draft.movieIndexes = {};
          } else {
            draft.movieIndexes[genre] = newIndex;
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
            moviePlot,
            movieRating,
            movieReleaseDate,
            movieReleaseYear,
            movieRunningTime,
          } = action.payload;
          if (movieStreamServices) {
            draft.movieStreamingServices[movieId] = {
              movieId,
              movieTitle,
              moviePicture,
              streamingServices: createMovieStreamingServiceObj(
                movieStreamServices
              ),
              moviePlot,
              movieRating,
              movieReleaseDate,
              movieReleaseYear,
              movieRunningTime,
            };
          } else {
            draft.movieStreamingServices[movieId] = 'not available';
          }
          draft.movieStreamingServicesLoadingStatus = SUCCESS;
          break;
        default:
          draft.movieStreamingServicesLoadingStatus = FAILURE;
      }
      break;
    case MOST_POPULAR_MOVIES:
      switch (action.status) {
        case SUCCESS: 
          const {mostPopularMovies} = action.payload;

          draft.mostPopularMovies = mostPopularMovies;
          break;
      }
      break;
      case SET_CURRENT_MOVIE_ID:
        switch (action.status) {
          case SUCCESS: 
            const {movieId} = action.payload;
  
            draft.currentMovieId = movieId;
            break;
        }
      break;
      case SET_CURRENT_GENRE:
        switch (action.status) {
          case SUCCESS: 
            const {genre} = action.payload;
  
            draft.currentGenre = genre;
            break;
        }
      break;
    default:
  }
}, initialState);
