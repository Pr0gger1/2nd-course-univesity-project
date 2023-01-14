import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './App.js';
import './styles/index.css';

import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyByyesgyia35Gm_BXXiwwSURszBgSsw_wE",
  authDomain: "productify-test.firebaseapp.com",
  databaseURL: "https://productify-test-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "productify-test",
  storageBucket: "productify-test.appspot.com",
  messagingSenderId: "531058036878",
  appId: "1:531058036878:web:c45843086958c18da939df",
  measurementId: "G-MRNR8GK61S"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const root = ReactDOM.createRoot(document.getElementById('root'));
document.title = "Productify ToDo App";

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

