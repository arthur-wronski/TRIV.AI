import React, { useState, useEffect } from 'react';
import { OpenAI } from 'openai'; 
import { useLocation } from 'react-router-dom';

const QuizGenerator = () => {
  const [quiz, setQuiz] = useState('');
  const location = useLocation();
  
  const { numberOfQuestions, theme, difficulty } = location.state || {};

  useEffect(() => {
    if (location.state) {
      handleQuizRequest(location.state);
    }
  }, [location.state]);

  const handleQuizRequest = async (config) => {
    const openai = new OpenAI(process.env.OPENAI_API_KEY); 

    try {
      const response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: `Create a quiz with ${config.numberOfQuestions} questions about ${config.theme} at a ${config.difficulty} difficulty level.`,
        max_tokens: 500,
      });
      setQuiz(response.data.choices[0].text);
    } catch (error) {
      console.error('Error generating quiz:', error);
    }
  };

  return (
    <div>
      {quiz ? <div className="quiz">{quiz}</div> : <p>Loading quiz...</p>}
    </div>
  );
};

export default QuizGenerator;
