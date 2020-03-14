import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyCH93KYQI6qSa_I6j7E0FwbYKTWqPkUdfA",
  authDomain: "crwn-db-cfa9a.firebaseapp.com",
  databaseURL: "https://crwn-db-cfa9a.firebaseio.com",
  projectId: "crwn-db-cfa9a",
  storageBucket: "crwn-db-cfa9a.appspot.com",
  messagingSenderId: "714206198302",
  appId: "1:714206198302:web:039651feac4e5c9f038c0f",
  measurementId: "G-PVXMR5X7B7"
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
