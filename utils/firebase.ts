import { getAnalytics } from "firebase/analytics";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA0ZAckyi-toGz1P73rhpOkYc-whFj6yyw",
  authDomain: "quick-note-ai.firebaseapp.com",
  databaseURL: "https://quick-note-ai-default-rtdb.firebaseio.com",
  projectId: "quick-note-ai",
  storageBucket: "quick-note-ai.firebasestorage.app",
  messagingSenderId: "693768019131",
  appId: "1:693768019131:web:30224c00325ea1eed59d9e",
  measurementId: "G-EF82QPLCKV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);