import firebase from 'firebase/app';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAy5PIs2SJPTScRZmqSb0of2dqTX0SmpJw",
  authDomain: "think-piece-live-ee7d2.firebaseapp.com",
  databaseURL: "https://think-piece-live-ee7d2.firebaseio.com",
  projectId: "think-piece-live-ee7d2",
  storageBucket: "think-piece-live-ee7d2.appspot.com",
  messagingSenderId: "459552876793",
  appId: "1:459552876793:web:3edc283292e98e2d"
};

firebase.initializeApp(firebaseConfig);

export const firestore = firebase.firestore();

firestore.settings({ timestampsInSnapshots: true });

window.firebase = firebase;

export default firebase;
