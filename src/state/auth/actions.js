import { FAILURE, SUCCESS } from '../constants';

import { SET_LOGIN_STATE } from './constants';
import {
  createUserWithEmailAndPassword,
  fetchUserDatabase,
  loginUserWithEmailandPassword,
} from '../../lib/sdk';
import { UPDATE_STREAMING_SERVICES } from '../streaming/constants';

const loginPayload = (isLoggedIn, uid = '', idToken = '') => {
  return {
    isLoggedIn,
    uid,
    idToken,
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
      account.user.getIdToken().then((idToken) => {
        // console.log(account);
        const uid = account.user.uid;
        dispatch({
          type: SET_LOGIN_STATE,
          status: SUCCESS,
          payload: loginPayload(true, uid, idToken),
        });
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
      account.user.getIdToken().then((idToken) => {
        // console.log(idToken);
        const { uid } = account.user;
        fetchUserDatabase(uid)
          .once('value')
          .then((snapshot) => {
            const streamingServices = snapshot.val().streaming_services;
            dispatch({
              type: UPDATE_STREAMING_SERVICES,
              status: SUCCESS,
              payload: { streamingServices },
            });
          });

        dispatch({
          type: SET_LOGIN_STATE,
          status: SUCCESS,
          payload: loginPayload(true, uid, idToken),
        });
      });
    })
    .catch((error) => {
      console.log(error);
      dispatch({
        type: SET_LOGIN_STATE,
        status: FAILURE,
        payload: loginPayload(false),
      });
    });
};
