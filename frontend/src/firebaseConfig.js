import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDSGTsH3TK9ZeaW9eibLWfRDyEwiRTVgxU",
  authDomain: "fir-test-a83c7.firebaseapp.com",
  projectId: "fir-test-a83c7",
  storageBucket: "fir-test-a83c7.appspot.com",
  messagingSenderId: "291190585270",
  appId: "1:291190585270:web:8ecaeee91e4b06124b7317",
  measurementId: "G-RFPS5NRLVB"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);


export default firebaseConfig;