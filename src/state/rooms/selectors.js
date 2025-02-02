export const selectRoomId = (state) => state.rooms.roomId

export const selectUserName = (state) => state.rooms.userName

export const selectRoomSize = (state) => state.rooms.roomSize

export const selectMoviePayload = (state) => state.rooms.moviePayload

export const selectIsThereARoomMatch = (state) => {
  const likedMovies = state.rooms.likedMovies
  const roomSize = state.rooms.roomSize

  let matchedMovieId = ''

  Object.entries(likedMovies).forEach(([movieId, users]) => {
    let likeCount = 0
    Object.values(users).forEach((liked) => {
      if (liked) {
        likeCount += 1
      }
    })
    if (likeCount >= roomSize) {
      matchedMovieId = movieId
    }
  })

  return matchedMovieId
}

export const selectExperience = (state) => state.rooms.experience
