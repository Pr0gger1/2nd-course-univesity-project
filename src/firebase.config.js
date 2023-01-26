import { initializeApp } from "firebase/app";
require('dotenv').config();

const apiKey = process.env.API_KEY_FIREBASE;
const authDomain = process.env.AUTH_DOMAIN_FIREBASE;
const databaseURL = process.env.DATABASE_URL_FIREBASE;
const projectId = process.env.PROJECT_ID_FIREBASE;
const storageBucket = process.env.STORAGE_BUCKET_FIREBASE;
const messagingSenderId = process.env.MESSAGING_SENDER_ID_FIREBASE;
const appId = process.env.APP_ID_FIREBASE;
const measurementId = process.env.MEASUREMENT_ID_FIREBASE;

const firebaseConfig = {
  apiKey, authDomain,
  databaseURL, projectId,
  storageBucket, messagingSenderId,
  appId, measurementId
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);