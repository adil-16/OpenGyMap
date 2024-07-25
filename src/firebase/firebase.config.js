import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

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
const db = getFirestore(app);

export { auth, db };
