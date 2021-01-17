import { FAILURE, SUCCESS } from '../constants';
import { SET_ROOM_STATE } from './constants';

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
