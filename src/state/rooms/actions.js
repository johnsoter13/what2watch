import { SUCCESS } from '../constants'
import {
  SET_ROOM_STATE,
  SET_ROOM_SIZE,
  MATCH_FOUND,
  SET_MOVIE_PAYLOAD,
} from './constants'
import { selectRoomId, selectRoomSize } from './selectors'
import { selectCurrentMovieId, selectMovie } from '../movies/selectors'
import { fetchMovieStreamingServicesHelper } from '../movies/actions'

export const updateRoomAction = (roomId, userName) => (dispatch) => {
  dispatch({
    type: SET_ROOM_STATE,
    status: SUCCESS,
    payload: { roomId, userName },
  })
}

export const updateRoomSize = (roomSize) => (dispatch) => {
  dispatch({
    type: SET_ROOM_SIZE,
    status: SUCCESS,
    payload: { roomSize },
  })
}

export const movieMatchAction = () => (dispatch, getState) => {
  const roomSize = selectRoomSize(getState())
  const roomId = selectRoomId(getState())
  const currentMovieId = selectCurrentMovieId(getState())

  // room is size 1 and not in a group room
  if (roomSize === 1 && !roomId) {
    dispatch(setMatchedMovieIdAction(currentMovieId))
  }
}

export const setMatchedMovieIdAction = (movieId) => (dispatch, getState) => {
  const movie = selectMovie(getState(), movieId)

  if (!movie) {
    dispatch(fetchMovieStreamingServicesHelper(movieId)).then()
  }

  dispatch({
    type: MATCH_FOUND,
    status: SUCCESS,
    payload: { matchedMovieId: movieId },
  })
}

export const updateMoviePayloadAction = (movieId, userName, roomId, liked) => (
  dispatch
) => {
  dispatch({
    type: SET_MOVIE_PAYLOAD,
    payload: { movieId, userName, roomId, liked },
  })
}
