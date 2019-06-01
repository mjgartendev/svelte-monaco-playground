import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
const firebaseConfig = {
  apiKey: "AIzaSyAnC9JDucKkS3nPJVDEEOCF69Sw5-vImMk",
  authDomain: "fullstackvoyage.firebaseapp.com",
  databaseURL: "https://fullstackvoyage.firebaseio.com",
  projectId: "fullstackvoyage",
  storageBucket: "fullstackvoyage.appspot.com",
  messagingSenderId: "630829677802",
  appId: "1:630829677802:web:b45fa077eac0efe9"
};

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const googleProvider = new firebase.auth.GoogleAuthProvider();

export const db = firebase.firestore();