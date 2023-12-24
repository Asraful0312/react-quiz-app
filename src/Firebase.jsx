import { initializeApp } from "firebase/app";

const apiKey = import.meta.env.VITE_REACT_APP_API_KEY;
const authDomain = import.meta.env.VITE_REACT_APP_AUTH_DOMAIN;
const projectId = import.meta.env.VITE_REACT_APP_PROJECT_ID;
const storageBucket = import.meta.env.VITE_REACT_APP_STORAGE_BUCKET;
const messagingSenderId = import.meta.env.VITE_REACT_APP_MASSEGING_SENDER_ID;
const appId = import.meta.env.VITE_REACT_APP_APP_ID;
const databaseURL = import.meta.env.VITE_DATABASE_URL;

const firebaseConfig = initializeApp({
  apiKey,
  authDomain,
  projectId,
  storageBucket,
  messagingSenderId,
  appId,
  databaseURL,
});

export default firebaseConfig;
