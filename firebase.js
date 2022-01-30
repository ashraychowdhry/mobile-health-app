// Import the functions you need from the SDKs you need

import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCFyzWbFIm26V_EvRIUQUJJ88y9hXB2000",
  authDomain: "mobile-stock-app.firebaseapp.com",
  projectId: "mobile-stock-app",
  storageBucket: "mobile-stock-app.appspot.com",
  messagingSenderId: "373566762332",
  appId: "1:373566762332:web:bd4759cb6105a54f85e599",
  measurementId: "G-PPBH04QT2H"
};

// Initialize Firebase
let app;

if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig)
} else {
  app = firebase.app();
}

const auth = firebase.auth();

export { auth };