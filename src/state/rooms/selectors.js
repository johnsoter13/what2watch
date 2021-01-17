export const selectRoomID = (state) => state.rooms.room.roomID;

export const selectRoomKey = (state) => state.rooms.room.roomKey;

export const selectUserName = (state) => state.rooms.room.userName;

export const selectCurrentRoomSize = (state) => state.rooms.currentRoomSize || 1;
export const selectRoomUserID = (state) => state.rooms.room.roomUserID;

export const selectRoomSize = (state) => state.rooms.room.roomSize;
