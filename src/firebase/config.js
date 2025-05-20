
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBtfxI9X-kT5wtV4jDFwfztV7SC7HIKB9g",
  authDomain: "eventbook-25f25.firebaseapp.com",
  projectId: "eventbook-25f25",
  storageBucket: "eventbook-25f25.appspot.com", // Fixed storage bucket URL
  messagingSenderId: "479725325636",
  appId: "1:479725325636:web:fab1586c505b1271e29b11",
  measurementId: "G-Q9P9YPEZ94"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

console.log("Firebase initialized successfully");

export default app;
