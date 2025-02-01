import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import {
  selectMovieIndex,
  selectMoviesByGenre,
  selectMovie,
} from '../state/movies/selectors'
import {
  movieListIndexAction,
  fetchMovieStreamingServicesAction,
  setCurrentMovieIdAction,
} from '../state/movies/actions'
import { selectUserStreamingServices } from '../state/streaming/selectors'
import { checkIfMovieIsAvailableToUser } from '../utils/moviesUtils'

export const useMovie = (genre) => {
  const dispatch = useDispatch()

  const movieIndex = useSelector((state) => selectMovieIndex(state, genre))
  const movies = useSelector((state) => selectMoviesByGenre(state, genre))
  const movieId = movies[movieIndex]
  const movie = useSelector((state) => selectMovie(state, movieId))

  const [sharedServices, setSharedServices] = useState({
    movieId: '',
    sharedServices: [],
  })

  const userStreamingServices = useSelector(selectUserStreamingServices)

  let movieLoadingComplete = !!(
    sharedServices.movieId === movieId &&
    sharedServices.sharedServices?.length > 0 &&
    movie?.movieStreamServices
  )

  useEffect(() => {
    // if movies doesn't exit or index has surpassed the length of the array
    if (!movies.length || movieIndex > movies.length) {
      return
    }

    if (movie === 'not available') {
      dispatch(movieListIndexAction(genre, false))
      // check if we have shared streaming services
    } else if (!movie?.movieStreamServices) {
      dispatch(fetchMovieStreamingServicesAction(movieId))
      // sometimes endpoint errors, skip to next movie
    } else {
      const sharedServicesForMovie = checkIfMovieIsAvailableToUser(
        userStreamingServices,
        movie
      )

      // if yes, set shared services
      if (sharedServicesForMovie.length) {
        setSharedServices({ movieId, sharedServices: sharedServicesForMovie })
        dispatch(setCurrentMovieIdAction(movieId))
        // skip to next movie
      } else {
        dispatch(movieListIndexAction(genre, false))
      }
    }
  }, [movie, movies, movieId, dispatch, fetchMovieStreamingServicesAction])

  return [
    movieIndex,
    movie,
    movieLoadingComplete,
    sharedServices.sharedServices,
  ]
}
