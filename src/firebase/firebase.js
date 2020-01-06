import firebase from "firebase/app"
import "firebase/auth"
import "firebase/firestore"

const firebaseConfig = {
    apiKey: "AIzaSyBppI9cqxzopDhGUKHu40_8pyFuE_6wuSk",
    authDomain: "test-task-6b2c3.firebaseapp.com",
    databaseURL: "https://test-task-6b2c3.firebaseio.com",
    projectId: "test-task-6b2c3",
    storageBucket: "test-task-6b2c3.appspot.com",
    messagingSenderId: "573840797109",
    appId: "1:573840797109:web:e9e34ac7379f4c4513bdfc"
}

export const myFirebase = firebase.initializeApp(firebaseConfig);
const baseDb = myFirebase.firestore();
export const db = baseDb;