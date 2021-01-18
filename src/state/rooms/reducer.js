import { produce } from 'immer';
import { FAILURE, SUCCESS } from '../constants';
import { SET_ROOM_STATE, MOVIE_SWIPE, SET_ROOM_SIZE } from './constants';

const initialState = {
  roomID: '',
  roomKey: '',
  userName: '',
  roomUserID: '',
  roomSize: 0,
  currentRoomSize: 0,
  soloSwipesByMovieId: {},
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
    case MOVIE_SWIPE:
      switch (action.status) {
        case SUCCESS:
          const { movieId, rightSwipe } = action.payload;

          break;
      }
    case SET_ROOM_SIZE:
      switch (action.status) {
        case SUCCESS:
          draft.roomSize = action.payload.roomSize;
          break;
      }
  }
}, initialState);
