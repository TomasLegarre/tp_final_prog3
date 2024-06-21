import app from 'firebase/app'
import firebase from 'firebase'
import { counterEvent } from 'react-native/Libraries/Performance/Systrace';

const firebaseConfig = {
    apiKey: "AIzaSyACyP9wwRsCtFs7ts7DeFJyXeGw1bRF3gE",
    authDomain: "tp-final-2024.firebaseapp.com",
    projectId: "tp-final-2024",
    storageBucket: "tp-final-2024.appspot.com",
    messagingSenderId: "460608063085",
    appId: "1:460608063085:web:bdccf88d867797ed02e164"
  };


app.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const storage = app.storage();
export const db = app.firestore();


