import React from 'react';

import MovieMatchModal from '../../components/Modals/MovieMatchModal';
import { FAILURE, SUCCESS } from '../constants';
import { SET_ROOM_STATE, SET_ROOM_SIZE, MATCH_FOUND } from './constants';
import { selectCurrentRoomSize, selectRoomID } from './selectors';
import { openModalAction } from '../modal/actions';
import { selectCurrentMovieId } from '../movies/selectors';
import { movieListIndexAction } from '../movies/actions';

export const updateRoomAction = (roomID, roomKey, userName, roomUserID) => (
  dispatch
) => {
  dispatch({
    type: SET_ROOM_STATE,
    status: SUCCESS,
    payload: { roomID, roomKey, userName, roomUserID },
  });
};

export const updateRoomSize = (roomSize) => (dispatch) => {
  dispatch({
    type: SET_ROOM_SIZE,
    status: SUCCESS,
    payload: { roomSize },
  });
};

export const movieMatchAction = () => (
  dispatch,
  getState
) => {
  const currentRoomSize = selectCurrentRoomSize(getState());
  const roomID = selectRoomID(getState());
  const currentMovieId = selectCurrentMovieId(getState());

  // room is size 1 and not in a group room
  if (currentRoomSize === 1 && !roomID) {
    dispatch(setMatchedMovieIdAction(currentMovieId));
  }
};

export const setMatchedMovieIdAction = (movieId) => (dispatch) => {
  dispatch({
    type: MATCH_FOUND,
    status: SUCCESS,
    payload: { matchedMovieId: movieId },
  });
}

// export const attachRoomSizeListenerAction = () => (dispatch) => {
//   dispatch({
//     type: ,
//     status: SUCCESS,
//     payload: { },
//   });
// };

// export const detachRoomSizeListenerAction = () => (dispatch) => {
//   dispatch({
//     type: ,
//     status: SUCCESS,
//     payload: { },
//   });
// };
