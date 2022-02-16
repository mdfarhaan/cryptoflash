const {firebaseConfig} = require("./config")
const firebase = require("firebase");

const app = !firebase.apps.length
  ? firebase.initializeApp(firebaseConfig)
  : firebase.app();

const db = app.firestore();

module.exports = db;
