import firebase from "firebase";
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyBWoE8_9K-_oQXIWbj0nOUkvjDDXUns0-w",
  authDomain: "instagram-clone-sultan.firebaseapp.com",
  databaseURL: "https://instagram-clone-sultan.firebaseio.com",
  projectId: "instagram-clone-sultan",
  storageBucket: "instagram-clone-sultan.appspot.com",
  messagingSenderId: "625341358223",
  appId: "1:625341358223:web:6c91b191361113344150fa",
  measurementId: "G-DXM13TE3Y6",
});

const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export { db, auth, storage };
