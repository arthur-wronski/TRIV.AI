import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './index.css';
import SignUp from './signUp';
import SignIn from './signIn';
import QuizSetup from './quizSetup';
import QuizGen from './quizGen';
import PlayQuiz from './playQuiz';
import Results from './Results';
import { getFirestore } from "firebase/firestore";
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
const db = getFirestore(app);



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/quizsetup" element={<QuizSetup />} />
        <Route path="/quizgen" element={<QuizGen />} />
        <Route path="/playquiz/:quizDocId" element={<PlayQuiz />} />
        <Route path="/results/:quizDocId" element={<Results />} />
      </Routes>
    </Router>
  </React.StrictMode>
);

export {auth,db};
