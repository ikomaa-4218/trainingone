#!/bin/bash

# This script generates the firebase-config.js file using environment variables
# This allows for secure handling of API keys when deploying to services like Render.

echo "Creating firebase-config.js..."

# Use a "here document" to write the file content.
# The EOL marker signifies the end of the content.
cat > firebase-config.js << EOL
// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// Your web app's Firebase configuration, populated by environment variables
const firebaseConfig = {
  apiKey: "\$FIREBASE_API_KEY",
  authDomain: "\$FIREBASE_AUTH_DOMAIN",
  projectId: "\$FIREBASE_PROJECT_ID",
  storageBucket: "\$FIREBASE_STORAGE_BUCKET",
  messagingSenderId: "\$FIREBASE_MESSAGING_SENDER_ID",
  appId: "\$FIREBASE_APP_ID",
  measurementId: "\$FIREBASE_MEASUREMENT_ID"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Export the firestore instance so other modules can use it
export { db };
EOL

echo "firebase-config.js created successfully."
