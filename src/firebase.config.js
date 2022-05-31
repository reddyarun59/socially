// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore"

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCFWvIUq3rAXEIdExQV98Dzngs5WMsMKio",
  authDomain: "socially-app-733b2.firebaseapp.com",
  projectId: "socially-app-733b2",
  storageBucket: "socially-app-733b2.appspot.com",
  messagingSenderId: "256513081688",
  appId: "1:256513081688:web:6a42f474676cfedb28e52d"
};

// Initialize Firebase
initializeApp(firebaseConfig);
export const db=getFirestore()