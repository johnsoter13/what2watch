import React from 'react';

import MovieMatchModal from '../../components/Modals/MovieMatchModal';
import { FAILURE, SUCCESS } from '../constants';
import { SET_ROOM_STATE, MOVIE_SWIPE, SET_ROOM_SIZE } from './constants';
import { selectCurrentRoomSize, selectRoomID } from './selectors';
import { openModalAction } from '../modal/actions';

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

export const movieMatchAction = (movieId, rightSwipe) => (
  dispatch,
  getState
) => {
  const currentRoomSize = selectCurrentRoomSize(getState());
  const roomID = selectRoomID(getState());

  // room is size 1 and not in a group room
  if (currentRoomSize === 1 && !roomID) {
    if (rightSwipe) {
      dispatch(openModalAction(<MovieMatchModal movieId={movieId} />));
    }
  }
};
