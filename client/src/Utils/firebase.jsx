import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBUbTdVvbU0y3JBsF587wWcx9x3eVSVJec",
  authDomain: "crud-85b26.firebaseapp.com",
  projectId: "crud-85b26",
  storageBucket: "crud-85b26.appspot.com",
  messagingSenderId: "128553730697",
  appId: "1:128553730697:web:5420cdf2b293b2c30fbc58",
  measurementId: "G-SRTB3S7RJF",
};

const app = firebase.initializeApp(firebaseConfig);

export const auth = app.auth();

export default app;
