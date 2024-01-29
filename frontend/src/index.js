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


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/quizsetup" element={<QuizSetup />} />
        <Route path="/quizgen" element={<QuizGen />} />
        <Route path="/playquiz" element={<PlayQuiz />} />
        <Route path="/results" element={<Results />} />
      </Routes>
    </Router>
  </React.StrictMode>
);
