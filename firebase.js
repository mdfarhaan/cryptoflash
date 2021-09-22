import firebase from "firebase";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB_IxolyWcGDWCbKseZa0E3gyMtBQnqIes",
  authDomain: "crypto-portfolio-cf86b.firebaseapp.com",
  projectId: "crypto-portfolio-cf86b",
  storageBucket: "crypto-portfolio-cf86b.appspot.com",
  messagingSenderId: "1028742613963",
  appId: "1:1028742613963:web:0ee04012e0dc34efe9844e",
  measurementId: "G-94FQLQLH7F",
};
const app = !firebase.apps.length
  ? firebase.initializeApp(firebaseConfig)
  : firebase.app();

const db = app.firestore();
const auth = app.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { db, auth, provider };
