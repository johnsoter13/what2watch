import { SUCCESS } from "../constants"
import { MATCH_ANIMATION } from "./constants"

export const setMatchAnimationAction = (finished) => (dispatch) => {
  dispatch({
    type: MATCH_ANIMATION,
    status: SUCCESS,
    payload: {finished}
  })
}