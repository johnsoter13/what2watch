import { produce } from 'immer';
import { FAILURE, SUCCESS } from '../constants';
import { SET_ROOM_STATE } from './constants';

const initialState = {
  room: {
    roomID: '',
    roomKey: '',
    userName: '',
  },
};

export default produce((draft, action) => {
  switch (action.type) {
    case SET_ROOM_STATE:
      switch (action.status) {
        case SUCCESS:
          draft.room.roomID = action.payload.roomID;
          draft.room.roomKey = action.payload.roomKey;
          draft.room.userName = action.payload.userName;
          break;
        case FAILURE:
          draft.room.roomID = action.payload.roomID;
          draft.room.roomKey = action.payload.roomKey;
          draft.room.userName = action.payload.userName;
      }
    default:
  }
}, initialState);
