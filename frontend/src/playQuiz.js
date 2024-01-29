import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from 'flowbite-react';

const PlayQuiz = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const quizData = location.state.quizData;

  const handleAnswer = (answer) => {
    setSelectedAnswer(answer);
    const isCorrect = answer === quizData[currentQuestionIndex].correctAnswer;
  
    if (isCorrect) {
      setScore(prevScore => prevScore + 1);
    }
  
    setTimeout(() => {
      if (currentQuestionIndex < quizData.length - 1) {
        setCurrentQuestionIndex(prevIndex => prevIndex + 1);
        setSelectedAnswer('');
      } else {
        navigate('/results', { state: { score: isCorrect ? score + 1 : score, total: quizData.length } });
      }
    }, 1000);
  };
  

  const currentQuestion = quizData[currentQuestionIndex];

  return (
    <div className="quiz-container flex flex-col items-center justify-center">
      <h3>{currentQuestion.question}</h3>
      <div className="options-grid">
        {Object.entries(currentQuestion.options).map(([key, value]) => (
          <Button 
            key={key} 
            onClick={() => handleAnswer(key)} 
            className={`option-button ${selectedAnswer === key ? 'selected' : ''}`}
          >
            {value}
          </Button>
        ))}
      </div>
      {/* Optional feedback message */}
      {selectedAnswer && (
        <p>{selectedAnswer === currentQuestion.correctAnswer ? 'Correct!' : 'Incorrect!'}</p>
      )}
    </div>
  );
};

export default PlayQuiz;
