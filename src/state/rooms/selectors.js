export const selectRoomID = (state) => state.rooms.roomID;

export const selectRoomKey = (state) => state.rooms.roomKey;

export const selectUserName = (state) => state.rooms.userName;

export const selectCurrentRoomSize = (state) =>
  state.rooms.currentRoomSize || 1;

export const selectRoomUserID = (state) => state.rooms.roomUserID;

export const selectRoomSize = (state) => state.rooms.roomSize;

export const selectMatchedMovieId = (state) => state.rooms.matchedMovieId;
