// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "car-stores.firebaseapp.com",
  projectId: "car-stores",
  storageBucket: "car-stores.appspot.com",
  messagingSenderId: "91459566898",
  appId: "1:91459566898:web:fa0d62107ab8879fbb6b2b",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
