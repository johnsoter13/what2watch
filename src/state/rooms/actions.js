import { SUCCESS } from '../constants'
import {
  SET_ROOM_STATE,
  SET_ROOM_SIZE,
  REMOVE_LIKED_MOVIE,
  RESET_ROOM,
  RECEIVE_MESSAGE,
} from './constants'
import { selectExperience, selectRoomId } from './selectors'

export const updateRoomAction = (roomId, userName) => (dispatch, getState) => {
  const currentRoomId = selectRoomId(getState())
  const currentExperience = selectExperience(getState())

  dispatch({
    type: SET_ROOM_STATE,
    status: SUCCESS,
    payload: { roomId, userName },
  })

  if (currentRoomId !== roomId) {
    dispatch(resetRoomAction(currentExperience))
  }
}

export const updateRoomSize = (roomSize) => (dispatch) => {
  dispatch({
    type: SET_ROOM_SIZE,
    status: SUCCESS,
    payload: { roomSize },
  })
}

export const removeLikedMovieAction = (movieId) => (dispatch) => {
  dispatch({
    type: REMOVE_LIKED_MOVIE,
    payload: { movieId },
  })
}

export const resetRoomAction = (experience) => (dispatch) => {
  dispatch({
    type: RESET_ROOM,
    payload: { experience },
  })
}

export const receiveMessageAction = (payload) => (dispatch) => {
  dispatch({
    type: RECEIVE_MESSAGE,
    payload,
  })
}
