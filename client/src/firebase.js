// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyA0Epw8e-5sQbSRE-gzzgfMGJ6ndFwd6J0",
  authDomain: "ojas-794a4.firebaseapp.com",
  projectId: "ojas-794a4",
  storageBucket: "ojas-794a4.firebasestorage.app",
  messagingSenderId: "239659924842",
  appId: "1:239659924842:web:afcd2075daba59cb19f913",
  measurementId: "G-KWDRL1XHMH"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider, signInWithPopup };