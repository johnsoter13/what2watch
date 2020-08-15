import { produce } from "immer";
import { USER_STREAMING_SERVICES } from "./constants";
import { SUCCESS } from "../constants";

const initialState = {
  userStreamingServices: {},
};

export default produce((draft, action) => {
  switch (action.type) {
    case USER_STREAMING_SERVICES:
      switch (action.status) {
        case SUCCESS:
          draft.userStreamingServices = action.payload.streamingServices;
          break;
      }
      break;
    default:
  }
}, initialState);
