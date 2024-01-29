import { useLocation, useNavigate } from 'react-router-dom';
import {Button} from 'flowbite-react';

const QuizGenerator = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const quizData = location.state?.quizData || [];
  
    const handlePlayQuiz = () => {
      navigate('/playquiz', { state: { quizData } });
    };
  
    return (
      <div>
        {quizData.length > 0 ? (
          <div className='flex flex-col items-center justify-center p-6'>
            {/* Optionally, preview the quiz here */}
            <Button onClick={handlePlayQuiz} className="play-quiz-button">
              Play Quiz
            </Button>
          </div>
        ) : <p>No quiz data available.</p>}
      </div>
    );
  };
  
  export default QuizGenerator;
  