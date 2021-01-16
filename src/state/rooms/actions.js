import { FAILURE, SUCCESS } from '../constants';
import { SET_ROOM_STATE } from './constants';

export const updateRoomIDRoomKeyAction = (roomID, roomKey) => (dispatch) => {
  dispatch({
    type: SET_ROOM_STATE,
    status: SUCCESS,
    payload: { roomID, roomKey },
  });
};
