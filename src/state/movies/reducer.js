import { produce } from 'immer'
import {
  GENRES,
  MOVIES_BY_GENRE,
  MOVIE_STREAMING_SERVICES,
  MOVIE_INDEX,
  MOST_POPULAR_MOVIES,
  SET_CURRENT_MOVIE_ID,
  SET_CURRENT_GENRE,
} from './constants'
import { FAILURE, PENDING, SUCCESS } from '../constants'
import { MOST_POPULAR } from '../../components/MovieList/constants'

const initialState = {
  genres: {},
  movies: {},
  moviesByGenre: {},
  genreLoadingStatus: null,
  moviesByGenreLoadingStatus: null,
  movieStreamingServices: {},
  movieStreamingServicesLoadingStatus: null,
  movieIndexes: {},
  currentMovieId: '',
  currentGenre: MOST_POPULAR,
}

// const createMovieStreamingServiceObj = (streamingServices) => {
//   const movieStreamingServicesObj = {}

//   // eslint-disable-next-line array-callback-return
//   streamingServices.map((streamingService) => {
//     movieStreamingServicesObj[streamingService?.name] = streamingService
//   })

//   return movieStreamingServicesObj
// }

export default produce((draft, action) => {
  switch (action.type) {
    case GENRES:
      switch (action.status) {
        case PENDING:
          draft.genreLoadingStatus = PENDING
          break
        case SUCCESS:
          draft.genres = action.payload
          draft.genreLoadingStatus = SUCCESS
          break
        default:
          draft.genreLoadingStatus = PENDING
      }
      break
    case MOVIE_INDEX:
      switch (action.status) {
        case SUCCESS:
          const { genre, newIndex, reset } = action.payload

          if (reset) {
            draft.movieIndexes = {}
          } else {
            draft.movieIndexes[genre] = newIndex
          }
          break
      }
      break
    case MOVIES_BY_GENRE:
      switch (action.status) {
        case PENDING:
          draft.moviesByGenreLoadingStatus = PENDING
          break
        case SUCCESS: {
          const {
            genre,
            moviesByGenre,
            hasMore,
            nextCuror,
            movieIds,
          } = action.payload
          draft.movies = { ...draft.movies, ...moviesByGenre }
          draft.moviesByGenre[genre] = movieIds
          draft.moviesByGenreLoadingStatus = SUCCESS
          break
        }
        default:
          draft.moviesByGenreLoadingStatus = PENDING
      }
      break
    case MOVIE_STREAMING_SERVICES:
      switch (action.status) {
        case PENDING:
          draft.movieStreamingServicesLoadingStatus = PENDING
          break
        case SUCCESS: {
          const { movieId, movieStreamServices } = action.payload
          if (movieStreamServices) {
            draft.movies[movieId] = {
              ...draft.movies[movieId],
              movieStreamServices,
            }
          } else {
            draft.movies[movieId] = 'not available'
          }
          draft.movieStreamingServicesLoadingStatus = SUCCESS
          break
        }
        default:
          draft.movieStreamingServicesLoadingStatus = FAILURE
      }
      break
    case MOST_POPULAR_MOVIES:
      switch (action.status) {
        case SUCCESS:
          const {
            mostPopularMovies,
            mostPopularMovieIdsShuffled,
          } = action.payload

          draft.movies = { ...draft.movies, ...mostPopularMovies }
          draft.moviesByGenre[MOST_POPULAR] = mostPopularMovieIdsShuffled
          break
      }
      break
    case SET_CURRENT_MOVIE_ID:
      switch (action.status) {
        case SUCCESS:
          const { movieId } = action.payload

          draft.currentMovieId = movieId
          break
      }
      break
    case SET_CURRENT_GENRE:
      switch (action.status) {
        case SUCCESS:
          const { genre } = action.payload

          draft.currentGenre = genre
          break
      }
      break
    default:
  }
}, initialState)
