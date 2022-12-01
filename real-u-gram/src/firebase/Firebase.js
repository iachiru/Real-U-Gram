import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

import { getStorage } from "firebase/storage";
import {
  getFirestore,
  collection,
  addDoc,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSEGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const database = getFirestore();
const storage = getStorage();
const user = auth.currentUser;

export default app;

export {
  database,
  auth,
  storage,
  user,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  collection,
  addDoc,
  doc,
  getDoc,
  getDocs,
  query,
  where,
};
