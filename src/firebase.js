import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth'; // it is needed for authentication

const config = {
  apiKey: "AIzaSyAy5PIs2SJPTScRZmqSb0of2dqTX0SmpJw",
  authDomain: "think-piece-live-ee7d2.firebaseapp.com",
  databaseURL: "https://think-piece-live-ee7d2.firebaseio.com",
  projectId: "think-piece-live-ee7d2",
  storageBucket: "think-piece-live-ee7d2.appspot.com",
  messagingSenderId: "459552876793",
  appId: "1:459552876793:web:b68b10d75214c581b8da28"
};

firebase.initializeApp(config);

export const firestore = firebase.firestore();

// Just for debugging experience let's attach firebase to browser window 
window.firebase = firebase;

// It hides errors in the console but it not required anymore.
// const settings = { timestampsInSnapshots: true };
// firebase.settings(settings);

export const auth = firebase.auth();

export const provider = new firebase.auth.GoogleAuthProvider();
export const signInWithGoogle = () => auth.signInWithPopup(provider);
export const signOut = () => auth.signOut();

export default firebase;