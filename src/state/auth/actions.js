import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin'

import { FAILURE, SUCCESS } from '../constants'

import { SET_DISLIKED, SET_LOGIN_STATE } from './constants'
import {
  createUserWithEmailAndPassword,
  fetchUserDatabase,
  login,
} from '../../lib/sdk'
import { UPDATE_STREAMING_SERVICES } from '../streaming/constants'
import { values } from 'lodash'

const loginPayload = (isLoggedIn, uid = '', idToken = '') => {
  return {
    isLoggedIn,
    uid,
    idToken,
  }
}

export const updateUserLogin = (isLoggedIn) => (dispatch) => {
  dispatch({
    type: SET_LOGIN_STATE,
    status: SUCCESS,
    payload: loginPayload(isLoggedIn),
  })
}

export const createUserAction = (email, password) => (dispatch) => {
  return createUserWithEmailAndPassword(email, password)
    .then((account) => {
      account.user.getIdToken().then((idToken) => {
        const uid = account.user.uid
        dispatch({
          type: SET_LOGIN_STATE,
          status: SUCCESS,
          payload: loginPayload(true, uid, idToken),
        })
      })
    })
    .catch((error) => {
      dispatch({
        type: SET_LOGIN_STATE,
        status: FAILURE,
        payload: loginPayload(false),
      })
    })
}

export const logUserOutAction = () => (dispatch) => {
  return dispatch({
    type: SET_LOGIN_STATE,
    status: SUCCESS,
    payload: loginPayload(false),
  })
}

export const loginUserAction = () => async (dispatch) => {
  try {
    await GoogleSignin.hasPlayServices()
    const userInfo = await GoogleSignin.signIn()
    const idToken = userInfo.idToken

    const loginResponse = await login(idToken)

    // fetches user database
    // fetchUserDatabase(uid)
    //   .once('value')
    //   .then((snapshot) => {
    //     // console.log(snapshot.val());

    //     // runs if database is not empty
    //     // updates list of streaming services
    //     if (snapshot.val()) {
    //       const streamingServices = snapshot.val().streaming_services
    //       dispatch({
    //         type: UPDATE_STREAMING_SERVICES,
    //         status: SUCCESS,
    //         payload: { streamingServices },
    //       })

    //       // runs if movies exists in database
    //       // stores list of disliked movies
    //       if (snapshot.val().movies) {
    //         let values = []
    //         const disliked = snapshot.val().movies.disliked
    //         // change this to Object.values
    //         for (const [key, value] of Object.entries(disliked)) {
    //           values.push(value)
    //         }
    //         dispatch({
    //           type: SET_DISLIKED,
    //           status: SUCCESS,
    //           payload: { disliked: values },
    //         })
    //       }
    //     }
    //   })

    dispatch({
      type: SET_LOGIN_STATE,
      status: SUCCESS,
      payload: loginPayload(true, uid, idToken),
    })
  } catch (error) {
    console.log(error)
    dispatch({
      type: SET_LOGIN_STATE,
      status: FAILURE,
      payload: loginPayload(false),
    })
    dispatch({
      type: SET_DISLIKED,
      status: FAILURE,
      payload: {},
    })
  }
}

export const updateDislikedAction = (uid) => (dispatch) => {
  fetchUserDatabase(uid)
    .once('value')
    .then((snapshot) => {
      let values = []
      if (snapshot.val() && snapshot.val().movies) {
        const disliked = snapshot.val().movies.disliked
        // change this to Object.values
        for (const [key, value] of Object.entries(disliked)) {
          values.push(value)
        }
        dispatch({
          type: SET_DISLIKED,
          status: SUCCESS,
          payload: { disliked: values },
        })
      }
    })
}
