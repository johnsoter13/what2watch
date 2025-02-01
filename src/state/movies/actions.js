import {
  GENRES,
  MOVIES_BY_GENRE,
  MOVIE_STREAMING_SERVICES,
  MOVIE_INDEX,
  MOST_POPULAR_MOVIES,
  SET_CURRENT_MOVIE_ID,
  SET_CURRENT_GENRE,
} from './constants'
import { PENDING, SUCCESS, FAILURE } from '../constants'
import {
  fetchMovieGenres,
  fetchMoviesByGenre,
  fetchMovieStreamingServices,
  fetchMostPopularMovies,
  fetchMovieDetails,
} from '../../lib/sdk'

import {
  selectMostPopularMoviesExists,
  selectMovieIndex,
  selectMoviesByGenreExists,
} from './selectors'
import { selectRoomId, selectUserName } from '../rooms/selectors'
import { MOST_POPULAR } from '../../components/MovieList/constants'
import { shuffleMovies } from '../../utils/moviesUtils'
import {
  setMatchedMovieIdAction,
  updateMoviePayloadAction,
} from '../rooms/actions'

export const fetchMovieGenresAction = () => (dispatch) => {
  dispatch({
    type: GENRES,
    status: PENDING,
  })
  return fetchMovieGenres()
    .then((response) => response.text())
    .then((text) => {
      const genres = JSON.parse(text)

      dispatch({
        type: GENRES,
        status: SUCCESS,
        payload: genres,
      })
    })
    .catch(() => {
      dispatch({
        type: GENRES,
        status: FAILURE,
      })
    })
}

export const fetchMoviesByGenreAction = (genre, country = 'us') => async (
  dispatch,
  getState
) => {
  const moviesByGenreExist = selectMoviesByGenreExists(getState(), genre)

  // If movies in this genre already exist, don't fetch again
  if (!moviesByGenreExist) {
    dispatch({
      type: MOVIES_BY_GENRE,
      status: PENDING,
    })

    dispatch({
      type: SET_CURRENT_GENRE,
      status: SUCCESS,
      payload: { genre },
    })

    try {
      const searchResponse = await fetchMoviesByGenre({ genre })
      const sanitizedMovies = []
      const movieIds = []

      if (searchResponse.ok) {
        const searchMoviesJSON = await searchResponse.json()
        const { shows, hasMore, nextCursor } = searchMoviesJSON

        for (let i = 0; i < shows.length; i++) {
          const movie = shows[i]
          movieIds.push(movie.imdbId)
          const fetchMovieDetailsResponse = await fetchMovieDetails(
            movie.imdbId
          )

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
                movieStreamServices: [
                  ...free,
                  ...subscription,
                  ...rent,
                  ...buy,
                ],
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

        const moviesByGenre = sanitizedMovies.reduce((acc, val) => {
          return {
            ...acc,
            [val.movieId]: val,
          }
        }, {})

        dispatch({
          type: MOVIES_BY_GENRE,
          status: SUCCESS,
          payload: {
            genre,
            moviesByGenre,
            hasMore,
            nextCursor,
            movieIds,
          },
        })
      }
    } catch {
      dispatch({
        type: MOVIES_BY_GENRE,
        status: FAILURE,
      })
    }
  }
}

export const fetchMovieStreamingServicesHelper = (
  movieId,
  country = 'us'
) => async (dispatch) => {
  const fetchMovieStreamingServicesResponse = await fetchMovieStreamingServices(
    { movieId }
  )

  if (fetchMovieStreamingServicesResponse.ok) {
    const movie = await fetchMovieStreamingServicesResponse.json()

    const movieStreamServices = movie?.streamingOptions?.[country] || []
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

    dispatch({
      type: MOVIE_STREAMING_SERVICES,
      status: SUCCESS,
      payload: {
        movieId,
        movieStreamServices: [...free, ...subscription, ...rent, ...buy],
      },
    })
  } else {
    dispatch({
      type: MOVIE_STREAMING_SERVICES,
      status: SUCCESS,
      payload: {
        movieId,
      },
    })
  }
}

export const fetchMovieStreamingServicesAction = (movieId) => async (
  dispatch
) => {
  dispatch({
    type: MOVIE_STREAMING_SERVICES,
    status: PENDING,
  })

  try {
    dispatch(fetchMovieStreamingServicesHelper(movieId))
  } catch (err) {
    console.log(err)
    dispatch({
      type: MOVIE_STREAMING_SERVICES,
      status: FAILURE,
    })
  }
}

export const movieListIndexAction = (genre = MOST_POPULAR, reset) => (
  dispatch,
  getState
) => {
  const currentGenreIndex = selectMovieIndex(getState(), genre)

  dispatch({
    type: MOVIE_INDEX,
    status: SUCCESS,
    payload: { genre, newIndex: reset ? 0 : currentGenreIndex + 1 },
  })
}

export const saveMovieAction = (liked, movieId) => (dispatch, getState) => {
  const roomId = selectRoomId(getState())
  const userName = selectUserName(getState())

  dispatch(updateMoviePayloadAction(movieId, userName, roomId, liked))
}

const saveUserLike = (
  roomSize,
  roomKey,
  userName,
  movieName,
  movieId,
  actualMovieId,
  liked,
  dispatch
) => {
  const movieObj = {
    movieName: movieName,
    users: { [userName]: liked },
  }

  let users = {}

  const refMovieId = fetchRoomsDatabase(roomKey + '/movies/' + actualMovieId)

  // get users from server
  refMovieId.once('value', function (snapshot) {
    if (snapshot.val()) {
      users = snapshot.val().users

      // set current user's pref
      users[userName] = liked

      // check if everyone in the room likes the movie
      let found = true
      if (roomSize !== 1 && Object.keys(users).length === roomSize) {
        for (let user in users) {
          if (!users[user]) {
            found = false
          }
        }
      }

      if (found) {
        dispatch(setMatchedMovieIdAction(movieId))
        fetchRoomsDatabase(roomKey).update({ found: movieId })
      }

      // update users in server
      refMovieId.update({
        users: users,
      })
    } else {
      refMovieId.set(movieObj)
    }
  })
}

export const fetchMostPopularMoviesActions = () => (dispatch, getState) => {
  const mostPopularMovies = selectMostPopularMoviesExists(getState())

  // If we have already fetched successfully, don't do it again
  if (!mostPopularMovies) {
    dispatch({
      type: MOST_POPULAR_MOVIES,
      status: PENDING,
    })

    dispatch({
      type: SET_CURRENT_GENRE,
      status: SUCCESS,
      payload: { genre: MOST_POPULAR },
    })

    return fetchMostPopularMovies()
      .then((response) => response.text())
      .then((text) => JSON.parse(text))
      .then((movies) => {
        const mostPopularMovieIds = []
        const mostPopularMovies = movies.reduce((acc, movie) => {
          mostPopularMovieIds.push(movie.id)

          return {
            ...acc,
            [movie.id]: {
              movieId: movie?.id,
              movieTitle: movie?.primaryTitle,
              moviePicture: movie?.primaryImage,
              moviePlot: movie?.description,
              movieRating: movie?.averageRating,
              movieReleaseDate: movie?.releaseDate,
              movieReleaseYear: movie?.startYear,
              movieRunningTime: movie?.runtimeMinutes,
            },
          }
        }, {})
        const mostPopularMovieIdsShuffled = shuffleMovies(mostPopularMovieIds)
        dispatch({
          type: MOST_POPULAR_MOVIES,
          status: SUCCESS,
          payload: { mostPopularMovies, mostPopularMovieIdsShuffled },
        })
      })
      .catch(() => {
        dispatch({
          type: MOST_POPULAR_MOVIES,
          status: FAILURE,
        })
      })
  }
}

export const setCurrentMovieIdAction = (movieId) => (dispatch) => {
  dispatch({
    type: SET_CURRENT_MOVIE_ID,
    status: SUCCESS,
    payload: { movieId },
  })
}

export const setCurrentGenreAction = (genre) => (dispatch) => {
  dispatch({
    type: SET_CURRENT_GENRE,
    status: SUCCESS,
    payload: { genre },
  })
}
