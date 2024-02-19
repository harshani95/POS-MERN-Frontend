import firebase from "firebase/compat/app";
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAlHnMC0cibbjJ5ZSjRlWjfhgwhrVOlOqY",
    authDomain: "react-pos-c3a52.firebaseapp.com",
    projectId: "react-pos-c3a52",
    storageBucket: "react-pos-c3a52.appspot.com",
    messagingSenderId: "1075094836616",
    appId: "1:1075094836616:web:d567b12f3e7d780e3f163d",
    measurementId: "G-SZ58J4WXGF"
  };

if (!firebase.apps.length){
    firebase.initializeApp(firebaseConfig)
}

export const storage = firebase.storage;
export default firebase;