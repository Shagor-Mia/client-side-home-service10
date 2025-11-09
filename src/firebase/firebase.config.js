// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAv8OGAlzjF6y_TfRlP52WxpLJoq4FxtL4",
  authDomain: "hero-home-service10.firebaseapp.com",
  projectId: "hero-home-service10",
  storageBucket: "hero-home-service10.firebasestorage.app",
  messagingSenderId: "307646209257",
  appId: "1:307646209257:web:03c96ca8bfa77c4e97e478",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
