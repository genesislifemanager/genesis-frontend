// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDj4ZbojEOj5HcxFoeJ1V65Hp4HwQ_O4gU",
  authDomain: "genesis-9f48d.firebaseapp.com",
  projectId: "genesis-9f48d",
  storageBucket: "genesis-9f48d.appspot.com",
  messagingSenderId: "771715993022",
  appId: "1:771715993022:web:8fbfb11591db58a30a3def",
  measurementId: "G-7BTB83Y2C6"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);