// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"; // ✅ Add this line

const firebaseConfig = {
  apiKey: "AIzaSyC0FhcZsJFvZzitpJsS7fBvMzZqlnmcH8U",
  authDomain: "trackmybus-8cfbd.firebaseapp.com",
  projectId: "trackmybus-8cfbd",
  storageBucket: "trackmybus-8cfbd.firebasestorage.app",
  messagingSenderId: "485585530607",
  appId: "1:485585530607:web:5e73ce374d6631de47351a",
  measurementId: "G-7TV10GNY56",
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app); // ✅ Add this line

export { auth, db }; // ✅ Export both
