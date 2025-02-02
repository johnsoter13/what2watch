import { produce } from 'immer'
import { SUCCESS } from '../constants'
import {
  SET_ROOM_STATE,
  SET_ROOM_SIZE,
  SET_MOVIE_PAYLOAD,
  REMOVE_LIKED_MOVIE,
  RESET_ROOM,
  RECEIVE_MESSAGE,
} from './constants'

const initialState = {
  roomId: '',
  userName: '',
  roomSize: 1,
  moviePayload: {},
  likedMovies: {},
  experience: '',
}

export default produce((draft, action) => {
  switch (action.type) {
    case SET_ROOM_STATE:
      switch (action.status) {
        case SUCCESS:
          draft.roomId = action.payload.roomId
          draft.userName = action.payload.userName
          break
      }
      break
    case SET_ROOM_SIZE:
      switch (action.status) {
        case SUCCESS:
          draft.roomSize = action.payload.roomSize
          break
      }
      break
    case SET_MOVIE_PAYLOAD:
      {
        const { movieId, userName, liked } = action.payload

        if (draft.likedMovies[movieId]) {
          draft.likedMovies[movieId] = {
            ...draft.likedMovies[movieId],
            [userName]: liked,
          }
        } else {
          draft.likedMovies[movieId] = { [userName]: liked }
        }

        draft.moviePayload = action.payload
      }
      break
    case REMOVE_LIKED_MOVIE:
      delete draft.likedMovies[action.payload.movieId]
      break
    case RESET_ROOM:
      draft.likedMovies = {}
      draft.experience = action.payload.experience
      break
    case RECEIVE_MESSAGE: {
      const { movieId, userName, liked, roomSize } = action.payload

      if (roomSize !== draft.roomSize) {
        draft.roomSize = roomSize
      }

      if (draft.likedMovies[movieId]) {
        draft.likedMovies[movieId] = {
          ...draft.likedMovies[movieId],
          [userName]: liked,
        }
      } else {
        draft.likedMovies[movieId] = { [userName]: liked }
      }

      break
    }
  }
}, initialState)
