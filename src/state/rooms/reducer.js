import { produce } from 'immer';
import { FAILURE, SUCCESS } from '../constants';
import { SET_ROOM_STATE, MOVIE_SWIPE } from './constants';

const initialState = {
  room: {
    roomID: '',
    roomKey: '',
    userName: '',
    roomUserID: '',
    roomSize: 0,
  },
  currentRoomSize: 0,
  soloSwipesByMovieId: {},
};

export default produce((draft, action) => {
  switch (action.type) {
    case SET_ROOM_STATE:
      switch (action.status) {
        case SUCCESS:
          draft.room.roomID = action.payload.roomID;
          draft.room.roomKey = action.payload.roomKey;
          draft.room.userName = action.payload.userName;
          draft.room.roomUserID = action.payload.roomUserID;
          draft.room.roomSize = action.payload.roomSize;
          break;
        case FAILURE:
          draft.room.roomID = action.payload.roomID;
          draft.room.roomKey = action.payload.roomKey;
          draft.room.userName = action.payload.userName;
          draft.room.roomUserID = action.payload.roomUserID;
          draft.room.roomSize = action.payload.roomSize;
      }
    case MOVIE_SWIPE:
      switch (action.status) {
        case SUCCESS:
          const {movieId, rightSwipe} = action.payload;

          break;
      }
  }
}, initialState);
