import { produce } from 'immer'
import { SUCCESS } from '../constants'
import {
  SET_ROOM_STATE,
  SET_ROOM_SIZE,
  MATCH_FOUND,
  SET_MOVIE_PAYLOAD,
} from './constants'

const initialState = {
  roomId: '',
  userName: '',
  roomSize: 1,
  matchedMovieId: '',
  moviePayload: {},
  likedMovies: {},
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
    case MATCH_FOUND:
      switch (action.status) {
        case SUCCESS:
          draft.matchedMovieId = action.payload.matchedMovieId
          break
      }
      break
    case SET_MOVIE_PAYLOAD:
      {
        const { movieId, userName } = action.payload

        if (draft.likedMovies[movieId]) {
          draft.likedMovies[movieId] = {
            ...draft.likedMovies[movieId],
            [userName]: true,
          }
        } else {
          draft.likedMovies[movieId] = { [userName]: true }
        }

        draft.moviePayload = action.payload
      }
      break
  }
}, initialState)
