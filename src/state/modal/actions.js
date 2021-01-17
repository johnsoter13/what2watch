import {SUCCESS} from '../constants';

import {OPEN_MODAL, CLOSE_MODAL} from './constants';

export const openModalAction = (modalContent) => (dispatch) => {
  dispatch({
    type: OPEN_MODAL,
    status: SUCCESS,
    payload: {
      modalContent,
    },
  });
};

export const closeModalAction = () => (dispatch) => {
  dispatch({
    type: CLOSE_MODAL,
    status: SUCCESS,
  });
};
