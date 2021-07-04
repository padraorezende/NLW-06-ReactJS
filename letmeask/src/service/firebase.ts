import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";

const firebaseConfig = {
    apiKey: "AIzaSyBk_wyHARjlt6RgJP_bA7Qxw5OO6IsJsAQ",
    authDomain: "letmeask-d8d97.firebaseapp.com",
    databaseURL: "https://letmeask-d8d97-default-rtdb.firebaseio.com",
    projectId: "letmeask-d8d97",
    storageBucket: "letmeask-d8d97.appspot.com",
    messagingSenderId: "440966810650",
    appId: "1:440966810650:web:791a9472b385e3f1f815a3"
  };

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const database = firebase.database();

export {firebase, auth, database};