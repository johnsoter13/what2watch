import produce from 'immer';

import {SUCCESS} from '../constants';

import {OPEN_MODAL, CLOSE_MODAL} from './constants';

const initialState = {
  modalContent: undefined,
};

export default produce((draft, action) => {
  switch (action.type) {
    case OPEN_MODAL:
      switch (action.status) {
        case SUCCESS: {
          draft.modalContent = action.payload.modalContent;
          break;
        }
      }

      break;
    case CLOSE_MODAL:
      switch (action.status) {
        case SUCCESS: {
          draft.modalContent = undefined;
          break;
        }
      }

      break;
  }
}, initialState);
