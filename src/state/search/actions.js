import { PENDING, SUCCESS, FAILURE } from '../constants'
import { fetchMovieFromSearch, fetchMovieDetails } from '../../lib/sdk'

import { MOVIE_FROM_SEARCH, RESULT, SEARCH_QUERY } from './constants'
import { STREAMING_SERVICES } from '../../components/StreamingServiceList/constants'

export const fetchMovieFromSearchAction = (query, country = 'us') => async (
  dispatch
) => {
  dispatch({
    type: MOVIE_FROM_SEARCH,
    status: PENDING,
  })
  try {
    const searchResponse = await fetchMovieFromSearch({ query })
    const sanitizedMovies = []

    if (searchResponse.ok) {
      const searchMovies = await searchResponse.json()

      for (let i = 0; i < searchMovies.length; i++) {
        const movie = searchMovies[i]
        const fetchMovieDetailsResponse = await fetchMovieDetails(movie.imdbId)

        if (fetchMovieDetailsResponse.ok) {
          const movieDetails = await fetchMovieDetailsResponse.json()

          const movieStreamServices = movie.streamingOptions?.[country] || []
          const subscription = []
          const rent = []
          const buy = []
          const free = []

          movieStreamServices.forEach((movieStreamingService) => {
            if (movieStreamingService.type === 'rent') {
              rent.push(movieStreamingService)
            } else if (movieStreamingService.type === 'buy') {
              buy.push(movieStreamingService)
            } else if (movieStreamingService.type === 'subscription') {
              subscription.push(movieStreamingService)
            } else if (movieStreamingService.type !== 'addon') {
              free.push(movieStreamingService)
            }
          })

          if (movieDetails?.primaryImage) {
            sanitizedMovies.push({
              movieStreamServices: [...free, ...subscription, ...rent, ...buy],
              movieId: movie?.imdbId,
              movieTitle: movie?.title,
              moviePicture: movieDetails?.primaryImage,
              moviePlot: movie?.overview,
              movieRating: movieDetails?.averageRating,
              movieReleaseDate: movieDetails?.releaseDate,
              movieReleaseYear: movie?.releaseYear,
              movieRunningTime: movieDetails?.runtimeMinutes,
            })
          }
        }
      }
    }

    const sortedMovies = sanitizedMovies.sort(
      (a, b) => b.movieReleaseYear - a.movieReleaseYear
    )

    dispatch({
      type: MOVIE_FROM_SEARCH,
      status: SUCCESS,
      payload: { query, movies: sortedMovies },
    })
  } catch {
    dispatch({
      type: MOVIE_FROM_SEARCH,
      status: FAILURE,
    })
  }
}

export const setSearchQueryAction = (query) => (dispatch) => {
  dispatch({
    type: SEARCH_QUERY,
    status: SUCCESS,
    payload: { searchQuery: query },
  })
}
