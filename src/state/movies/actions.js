import React from 'react'
import {
  GENRES,
  MOVIES_BY_GENRE,
  MOVIE_STREAMING_SERVICES,
  MOVIE_INDEX,
  MOST_POPULAR_MOVIES,
  SET_CURRENT_MOVIE_ID,
  MOVIES_TO_FETCH_LIMIT,
  SET_CURRENT_GENRE,
} from './constants'
import { PENDING, SUCCESS, FAILURE } from '../constants'
import {
  fetchMovieGenres,
  fetchMoviesByGenre,
  fetchMovieStreamingServices,
  fetchUserDatabase,
  fetchmovie,
  fetchRoomsDatabase,
  fetchMostPopularMovies,
} from '../../lib/sdk'

import {
  selectMostPopularMoviesExists,
  selectMovieIdByIndex,
  selectMovieIndex,
  selectMoviesByGenreExists,
  selectMovieStreamingServicesById,
} from './selectors'
import { selectUserIsLoggedIn, selectUserId } from '../auth/selectors'
import {
  selectRoomID,
  selectRoomKey,
  selectUserName,
  selectRoomUserID,
  selectRoomSize,
} from '../rooms/selectors'
import { openModalAction } from '../modal/actions'
import MovieMatchModal from '../../components/Modals/MovieMatchModal'
import { MOST_POPULAR } from '../../components/MovieList/constants'
import { shuffleMovies } from '../../utils/moviesUtils'
import { setMatchedMovieIdAction } from '../rooms/actions'

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

// export const fetchMoviesByGenreAction = (genre, endpoint) => (
//   dispatch,
//   getState
// ) => {
//   const moviesByGenreExist = selectMoviesByGenreExists(getState(), genre);

//   // If movies in this genre already exist, don't fetch again
//   if (!moviesByGenreExist) {
//     dispatch({
//       type: MOVIES_BY_GENRE,
//       status: PENDING,
//     });

//     dispatch({
//       type: SET_CURRENT_GENRE,
//       status: SUCCESS,
//       payload: {genre}
//     });

//     return fetchMoviesByGenre(endpoint)
//       .then((response) => response.text())
//       .then((text) => JSON.parse(text))
//       .then((moviesByGenre) => {
//         const shuffledMovies = shuffleMovies(moviesByGenre);
//         dispatch({
//           type: MOVIES_BY_GENRE,
//           status: SUCCESS,
//           payload: { genre, moviesByGenre: shuffledMovies },
//         });
//       })
//       .catch(() => {
//         dispatch({
//           type: MOVIES_BY_GENRE,
//           status: FAILURE,
//         });
//       });
//   }
// };

export const fetchMovieStreamingServicesHelper = (movieId) => async (
  dispatch
) => {
  const fetchMovieStreamingServicesResponse = await fetchMovieStreamingServices(
    movieId
  )

  if (fetchMovieStreamingServicesResponse.ok) {
    const movieStreamServices = await fetchMovieStreamingServicesResponse.json()

    dispatch({
      type: MOVIE_STREAMING_SERVICES,
      status: SUCCESS,
      payload: {
        movieId,
        streamingServices: movieStreamServices?.collection?.locations,
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

export const saveMovieAction = (genre, liked, movie) => (
  dispatch,
  getState
) => {
  const isUserLoggedIn = selectUserIsLoggedIn(getState())
  const movieIndex = selectMovieIndex(getState(), genre)
  const movieId = selectMovieIdByIndex(getState(), genre, movieIndex)
  const actualMovieId = movieId.slice(
    movieId.indexOf('tt'),
    movieId.lastIndexOf('/')
  )
  const roomSize = selectRoomSize(getState())

  if (!movie) {
    movie = selectMovieStreamingServicesById(getState(), movieId)
  }

  // if user is logged in and disliked the movie, update database's list of disliked
  if (!liked && isUserLoggedIn) {
    const uid = selectUserId(getState())

    // this is overriding the database
    fetchUserDatabase(uid)
      .child('movies/disliked')
      .push(actualMovieId)
      .then(() => console.log('Movie disliked!'))
  }

  const roomID = selectRoomID(getState())
  const roomKey = selectRoomKey(getState())
  const userName = selectUserName(getState())
  const movieName = movie.movieTitle

  // saving user's like/dislike of the movie if in a room
  if (roomID && roomKey) {
    saveUserLike(
      roomSize,
      roomKey,
      userName,
      movieName,
      movieId,
      actualMovieId,
      liked,
      dispatch
    )
  }
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
