import { produce } from "immer";
// import { LOGIN, LOGIN_PENDING, LOGIN_SUCCESS } from './constants';
import { PENDING, SUCCESS } from "../constants";

const initialState = {
  user: {},
  userStatus: null,
};

export default produce((draft, action) => {
  switch (action.type) {
    case INIT:
      switch (action.status) {
        case PENDING:
          draft.userStatus = PENDING;
          break;
        case SUCCESS:
          draft.user = action.payload;
          draft.userStatus = SUCCESS;
          break;
        default:
      }
      break;
    default:
  }
}, initialState);
