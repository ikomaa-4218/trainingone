// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// TODO: Add your own Firebase configuration below
const firebaseConfig = {
  apiKey: "AIzaSyA8ZIgLFC13U41TLdxtMDRggIcgEocvjqI",
  authDomain: "upskill-project-5b6d0.firebaseapp.com",
  projectId: "upskill-project-5b6d0",
  storageBucket: "upskill-project-5b6d0.firebasestorage.app",
  messagingSenderId: "255889760637",
  appId: "1:255889760637:web:bdf85e206048d18b8cac14",
  measurementId: "G-BEG6WC3DKJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
