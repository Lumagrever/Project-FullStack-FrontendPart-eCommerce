// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCIOQ7WtcSPGDR7XjlGUlMk8rXZAENWWEE",
  authDomain: "wowshop-55e32.firebaseapp.com",
  projectId: "wowshop-55e32",
  storageBucket: "wowshop-55e32.appspot.com",
  messagingSenderId: "767728711967",
  appId: "1:767728711967:web:a59ccdfadf0f4ad21d582a"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export default firebaseConfig