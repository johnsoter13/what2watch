import React from "react";

import MovieMatchModal from '../../components/Modals/MovieMatchModal';
import { FAILURE, SUCCESS } from '../constants';
import { SET_ROOM_STATE, MOVIE_SWIPE } from './constants';
import { selectCurrentRoomSize } from './selectors';
import {openModalAction} from '../modal/actions';

export const updateRoomAction = (
  roomID,
  roomKey,
  userName,
  roomUserID,
  roomSize
) => (dispatch) => {
  dispatch({
    type: SET_ROOM_STATE,
    status: SUCCESS,
    payload: { roomID, roomKey, userName, roomUserID, roomSize },
  });
};

export const movieMatchAction = (movieId, rightSwipe) => (
  dispatch, getState
) => {
  const currentRoomSize = selectCurrentRoomSize(getState());

  if (currentRoomSize === 1) {
    if (rightSwipe) {
      dispatch(openModalAction(
        <MovieMatchModal movieId={movieId}/>
      ));
    }
  } else {
    dispatch({
      type: MOVIE_SWIPE,
      status: SUCCESS,
      payload: { movieId, rightSwipe },
    });
  }
};
