// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { getFirestore, collection, addDoc, serverTimestamp } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCpCac-8llOtIlz1uiJ2BGHkzn-qQXkkMM",
  authDomain: "login-fb041.firebaseapp.com",
  projectId: "login-fb041",
  storageBucket: "login-fb041.firebasestorage.app",
  messagingSenderId: "103286695461",
  appId: "1:103286695461:web:d5c55924ef9819b9f8c1cc",
  measurementId: "G-VZJ0MQ64VM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);