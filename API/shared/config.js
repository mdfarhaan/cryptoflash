require("dotenv").config();

const PORT = process.env.PORT || 3000

const firebaseConfig = {
  apiKey: process.env.FIREBASE_APIKEY,
  authDomain: process.env.FIREBASE_AUTHDOMAIN,
  projectId: process.env.FIREBASE_PROJECTID,
};

module.exports = {firebaseConfig, PORT}