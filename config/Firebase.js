import firebase from "firebase"
import {
    API_KEY,
    AUTH_DOMAIN,
    PROJECT_ID,
    STORAGE_BUCKET,
    MESSAGE_SENDER_ID,
    APP_ID
} from "@env"

const firebaseConfig = {
    apiKey: API_KEY,
    authDomain: AUTH_DOMAIN,
    projectId: PROJECT_ID,
    storageBucket: STORAGE_BUCKET,
    messagingSenderId: MESSAGE_SENDER_ID,
    appId: APP_ID
}

const Firebase = firebase.initializeApp(firebaseConfig)

export const db = firebase

export default Firebase