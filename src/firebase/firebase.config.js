// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { connectAuthEmulator, getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBfdvFMBVDtZxDwOdcKHYmLljo6VLdvghY",
  authDomain: "opengymapp-172a8.firebaseapp.com",
  projectId: "opengymapp-172a8",
  storageBucket: "opengymapp-172a8.appspot.com",
  messagingSenderId: "495177834817",
  appId: "1:495177834817:web:2fa0a5ef74c00f2a7641c0",
  measurementId: "G-Z9L22JM25Q",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

if (window.location.hostname === "localhost") {
  connectAuthEmulator(auth, "http://localhost:9099");
}

export { auth };
