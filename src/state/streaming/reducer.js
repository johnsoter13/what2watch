import { produce } from 'immer';
import { SUCCESS } from '../constants';

import { UPDATE_STREAMING_SERVICES } from './constants';

const initialState = {
  userStreamingServices: {},
};

export default produce((draft, action) => {
  switch (action.type) {
    case UPDATE_STREAMING_SERVICES:
      switch (action.status) {
        case SUCCESS:
          draft.userStreamingServices = action.payload.streamingServices;
          break;
      }
      break;
    default:
  }
}, initialState);
