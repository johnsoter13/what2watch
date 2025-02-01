export const selectRoomId = (state) => state.rooms.roomId

export const selectUserName = (state) => state.rooms.userName

export const selectRoomSize = (state) => state.rooms.roomSize

export const selectMatchedMovieId = (state) => state.rooms.matchedMovieId

export const selectMoviePayload = (state) => state.rooms.moviePayload

export const selectIsThereARoomMatch = (state) => {
  const likedMovies = state.rooms.likedMovies

  // Object.entries([movieId, users]).
}
