// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyABhxySaHrT2eMmSB8BW5olVK4e2fGzuqg",
  authDomain: "gamepedia-79279.firebaseapp.com",
  projectId: "gamepedia-79279",
  storageBucket: "gamepedia-79279.appspot.com",
  messagingSenderId: "1014435455382",
  appId: "1:1014435455382:web:13276b5c16198dbab53db7"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);