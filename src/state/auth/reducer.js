import { produce } from "immer";
import { FAILURE, SUCCESS } from "../constants";
import { SET_LOGIN_STATE } from "./constants";

const initialState = {
  userLogin: {
      isLoggedIn: false,
      userId: ""
  },
};

export default produce((draft, action) => {
  switch (action.type) {
    case SET_LOGIN_STATE:
      switch (action.status) {
        case SUCCESS:
          draft.userLogin.isLoggedIn = action.payload?.isLoggedIn;
          break;
        case FAILURE:
            draft.userLogin.isLoggedIn = action.payload?.isLoggedIn;
      }
      break;
    default:
  }
}, initialState);
