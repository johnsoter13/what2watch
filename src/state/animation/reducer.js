import produce from 'immer';

import {SUCCESS} from '../constants';

import {MATCH_ANIMATION} from './constants';

const initialState = {
  finished: false,
};

export default produce((draft, action) => {
  switch (action.type) {
    case MATCH_ANIMATION:
      switch (action.status) {
        case SUCCESS: {
          draft.finished = action.payload.finished;
          break;
        }
      }

      break;
  }
}, initialState);
