import { FAILURE, SUCCESS } from "../constants";

import { SET_LOGIN_STATE } from "./constants";
import {createUserWithEmailAndPassword} from '../../lib/sdk';

export const updateUserLogin = (isLoggedIn) => (
  dispatch
) => {
  dispatch({
    type: SET_LOGIN_STATE,
    status: SUCCESS,
    payload: { isLoggedIn },
  });
};

export const createUserAction = (email, password) => (dispatch) => {
    return createUserWithEmailAndPassword(email, password)
    .then((user) => {
        dispatch({
            type: SET_LOGIN_STATE,
            status: SUCCESS,
            payload: { isLoggedIn: true },
        });
    })
    .catch((error) =>{
        dispatch({
            type: SET_LOGIN_STATE,
            status: FAILURE,
            payload: { isLoggedIn: false },
        });
    })
}

export const logUserOut = () => (dispatch) => {
    return dispatch({
        type: SET_LOGIN_STATE,
        status: SUCCESS,
        payload: { isLoggedIn: false },
    });
}