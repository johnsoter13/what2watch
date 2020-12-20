import { FAILURE, SUCCESS } from '../constants';

import { SET_LOGIN_STATE } from './constants';
import {
  createUserWithEmailAndPassword,
  loginUserWithEmailandPassword,
} from '../../lib/sdk';

const loginPayload = (isLoggedIn, uid = '') => {
  return {
    isLoggedIn,
    uid,
  };
};

export const updateUserLogin = (isLoggedIn) => (dispatch) => {
  dispatch({
    type: SET_LOGIN_STATE,
    status: SUCCESS,
    payload: loginPayload(isLoggedIn),
  });
};

export const createUserAction = (email, password) => (dispatch) => {
  return createUserWithEmailAndPassword(email, password)
    .then((account) => {
      // console.log(account);
      dispatch({
        type: SET_LOGIN_STATE,
        status: SUCCESS,
        payload: loginPayload(true, account.user.uid),
      });
    })
    .catch((error) => {
      dispatch({
        type: SET_LOGIN_STATE,
        status: FAILURE,
        payload: loginPayload(false),
      });
    });
};

export const logUserOutAction = () => (dispatch) => {
  return dispatch({
    type: SET_LOGIN_STATE,
    status: SUCCESS,
    payload: loginPayload(false),
  });
};

export const loginUserAction = (email, password) => (dispatch) => {
  return loginUserWithEmailandPassword(email, password)
    .then((account) => {
      // console.log(account.user.uid);
      dispatch({
        type: SET_LOGIN_STATE,
        status: SUCCESS,
        payload: loginPayload(true, account.user.uid),
      });
    })
    .catch((error) => {
      dispatch({
        type: SET_LOGIN_STATE,
        status: FAILURE,
        payload: loginPayload(false),
      });
    });
};
