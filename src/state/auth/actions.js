import { FAILURE, SUCCESS } from '../constants';

import { SET_LOGIN_STATE } from './constants';
import { createUserWithEmailAndPassword } from '../../lib/sdk';

export const updateUserLogin = (isLoggedIn) => (dispatch) => {
  dispatch({
    type: SET_LOGIN_STATE,
    status: SUCCESS,
    payload: { isLoggedIn },
  });
};

export const createUserAction = (email, password) => (dispatch) =>
  createUserWithEmailAndPassword(email, password)
    .then(() => {
      dispatch({
        type: SET_LOGIN_STATE,
        status: SUCCESS,
        payload: { isLoggedIn: true },
      });
    })
    .catch(() => {
      dispatch({
        type: SET_LOGIN_STATE,
        status: FAILURE,
        payload: { isLoggedIn: false },
      });
    });

export const logUserOut = () => (dispatch) =>
  dispatch({
    type: SET_LOGIN_STATE,
    status: SUCCESS,
    payload: { isLoggedIn: false },
  });
