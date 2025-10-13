// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBip424dxYN0-FKwh7DPJ2QeGiVrNrAyJU",
  authDomain: "invoice-b5d95.firebaseapp.com",
  projectId: "invoice-b5d95",
  storageBucket: "invoice-b5d95.firebasestorage.app",
  messagingSenderId: "939457832709",
  appId: "1:939457832709:web:d86f0afcc9b4c1d17ff96c",
  measurementId: "G-RTL119CGHY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

const analytics = getAnalytics(app);