// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC58DwoPnznwhURlOHaoJIXZVooRgyg8Pg",
  authDomain: "vipra-bandhana-2022.firebaseapp.com",
  projectId: "vipra-bandhana-2022",
  storageBucket: "vipra-bandhana-2022.appspot.com",
  messagingSenderId: "859906842038",
  appId: "1:859906842038:web:e93a0e1c4915f3095b3517",
  measurementId: "G-JK12Y43KG5",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const authentication = getAuth(app);
