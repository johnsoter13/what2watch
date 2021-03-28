import { produce } from 'immer';
import { FAILURE, SUCCESS } from '../constants';
import { SET_ROOM_STATE, SET_ROOM_SIZE, MATCH_FOUND } from './constants';

const initialState = {
  roomID: '',
  roomKey: '',
  userName: '',
  roomUserID: '',
  roomSize: 0,
  currentRoomSize: 0,
  soloSwipesByMovieId: {},
  matchedMovieId: '',
};

export default produce((draft, action) => {
  switch (action.type) {
    case SET_ROOM_STATE:
      switch (action.status) {
        case SUCCESS:
          draft.roomID = action.payload.roomID;
          draft.roomKey = action.payload.roomKey;
          draft.userName = action.payload.userName;
          draft.roomUserID = action.payload.roomUserID;
          break;
      }
      break;
    case SET_ROOM_SIZE:
      switch (action.status) {
        case SUCCESS:
          draft.roomSize = action.payload.roomSize;
          break;
      }
      break;
      case MATCH_FOUND:
        switch (action.status) {
          case SUCCESS:
            draft.matchedMovieId = action.payload.matchedMovieId;
            break;
        }
        break;
  }
}, initialState);
