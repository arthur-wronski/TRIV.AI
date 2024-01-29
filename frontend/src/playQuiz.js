import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from 'flowbite-react';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { app } from './firebaseConfig';

const PlayQuiz = () => {
  const navigate = useNavigate();
  const { quizDocId } = useParams();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [quizData, setQuizData] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    // Fetch quiz data based on the document ID when the component mounts
    fetchQuizData(quizDocId);
  }, [quizDocId]);

  const fetchQuizData = async (docId) => {
    const db = getFirestore(app);
    const quizDocRef = doc(db, 'quizzes', docId);

    try {
      const quizDocSnap = await getDoc(quizDocRef);

      if (quizDocSnap.exists()) {
        const quiz = quizDocSnap.data();
        setQuizData(quiz.quizData);
        setLoading(false); // Data is available, set loading to false
      } else {
        console.error('Quiz document not found.');
      }
    } catch (error) {
      console.error('Error fetching quiz data:', error);
    }
  };

  const handleAnswer = (answer) => {
    setSelectedAnswer(answer);
    const isCorrect = answer === quizData[currentQuestionIndex].correctAnswer;

    if (isCorrect) {
      setScore((prevScore) => prevScore + 1);
    }

    setTimeout(() => {
      if (currentQuestionIndex < quizData.length - 1) {
        setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
        setSelectedAnswer('');
      } else {
        navigate(`/results/${quizDocId}`, {
          state: { score: isCorrect ? score + 1 : score, total: quizData.length },
        });
      }
    }, 1000);
  };

  if (loading) {
    return <p>Loading...</p>; // Display a loading message while data is being fetched
  }

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
