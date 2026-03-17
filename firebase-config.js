// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA8ZIgLFC13U41TLdxtMDRggIcgEocvjqI",
  authDomain: "upskill-project-5b6d0.firebaseapp.com",
  projectId: "upskill-project-5b6d0",
  storageBucket: "upskill-project-5b6d0.appspot.com",
  messagingSenderId: "255889760637",
  appId: "1:255889760637:web:bdf85e206048d18b8cac14",
  measurementId: "G-BEG6WC3DKJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

// Export the instances so other modules can use them
export { db, auth };
