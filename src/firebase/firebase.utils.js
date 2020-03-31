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

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;
  const userRef = firestore.doc(`users/${userAuth.uid}`);
  const collectionRef = firestore.collection("users");

  const snapShot = await userRef.get();
  const collectionSnapshot = await collectionRef.get();
  console.log({ collection: collectionSnapshot.docs.map(doc => doc.data()) });

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createAt,
        ...additionalData
      });
    } catch (error) {
      console.log("Error Creating User", error.message);
    }
  }
  return userRef;
  console.log(snapShot);
};

firebase.initializeApp(config);

export const addCollectionAndDocuments = async (
  collectionKey,
  objectsToAdd
) => {
  const collectionRef = firestore.collection(collectionKey);
  // console.log(collectionRef);
  const batch = firestore.batch();
  objectsToAdd.forEach(obj => {
    const newDocRef = collectionRef.doc();
    console.log(newDocRef);
    batch.set(newDocRef, obj);
  });
  return await batch.commit();
};

export const convertCollectionSnapshotToMap = collections => {
  const transformedCollection = collections.docs.map(doc => {
    const { title, items } = doc.data();
    return {
      routeName: encodeURI(title.toLowerCase()),
      id: doc.id,
      title,
      items
    };
  });

  return transformedCollection.reduce((accumulator, collection) => {
    accumulator[collection.title.toLowerCase()] = collection;
    return accumulator;
  }, {});
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
