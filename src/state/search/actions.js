import { PENDING, SUCCESS, FAILURE } from '../constants'
import { fetchMovieFromSearch, fetchMovieDetails } from '../../lib/sdk'

import { MOVIE_FROM_SEARCH, RESULT, SEARCH_QUERY } from './constants'
import { STREAMING_SERVICES } from '../../components/StreamingServiceList/constants'

export const fetchMovieFromSearchAction = (query) => async (dispatch) => {
  dispatch({
    type: MOVIE_FROM_SEARCH,
    status: PENDING,
  })
  try {
    // const searchResponse = await fetchMovieFromSearch(query)
    const searchResponse = RESULT
    const sanitizedMovies = []

    // if (searchResponse.ok) {
    // const searchMovies = await searchResponse.json()

    for (let i = 0; i < searchMovies.results.length; i++) {
      const movie = searchMovies.results[i]
      const fetchMovieDetailsResponse = await fetchMovieDetails(
        movie.external_ids.imdb.id
      )

      if (fetchMovieDetailsResponse.ok) {
        const movieDetails = await fetchMovieDetailsResponse.json()
        const movieStreamServices = movie?.locations?.map((location) => {
          const displayName =
            STREAMING_SERVICES[location.name]?.displayName ||
            location.display_name

          return { ...location, display_name: displayName }
        })

        sanitizedMovies.push({
          movieStreamServices,
          movieId: movieDetails?.id,
          movieTitle: movieDetails?.primaryTitle,
          moviePicture: movieDetails?.primaryImage,
          moviePlot: movieDetails?.description,
          movieRating: movieDetails?.averageRating,
          movieReleaseDate: movieDetails?.releaseDate,
          movieReleaseYear: movieDetails?.startYear,
          movieRunningTime: movieDetails?.runtimeMinutes,
        })
      }
    }
    // }
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
