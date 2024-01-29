import React, { useState } from 'react';
import { Button, TextInput, Label, Select } from 'flowbite-react';
import { useNavigate } from 'react-router-dom';

const QuizConfigForm = () => {
  const [numberOfQuestions, setNumberOfQuestions] = useState('');
  const [theme, setTheme] = useState('');
  const [difficulty, setDifficulty] = useState('');
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);


  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch('http://localhost:3001/generateQuiz', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ numberOfQuestions, theme, difficulty }),
      });

      if (!response.ok) {
        throw new Error(`Server responded with status ${response.status}`);
      }

      const quizText = await response.json();
      console.log(quizText);
      console.log(JSON.stringify(quizText));
      const formattedQuiz = formatQuiz(quizText);
      console.log(formattedQuiz);
      navigate('/quizgen', { state: { quizData: formattedQuiz } });
    } catch (error) {
      console.error('Error generating quiz:', error);
    }finally{
        setIsLoading(false);
    }
  };

  const formatQuiz = (quizText) => {
    console.log(quizText);
    const quizRegex = /Question \d+: (.*?)\nA\. (.*?)\nB\. (.*?)\nC\. (.*?)\nD\. (.*?)\nCorrect answer: (\w)/gs;
    let match;
    const formattedQuiz = [];
  
    while ((match = quizRegex.exec(quizText)) !== null) {
      console.log(match); // Log the match to see what is being captured
      formattedQuiz.push({
        question: match[1],
        options: {
          A: match[2],
          B: match[3],
          C: match[4],
          D: match[5],
        },
        correctAnswer: match[6],
      });
    }
  
    return formattedQuiz;
  };
  

  return (
    <div className='flex flex-col items-center justify-center p-6'>
        {isLoading ? <p>Loading quiz...</p> : (
            <div className="w-full max-w-md">
                <h2 className="mb-6 text-2xl font-bold text-center">Quiz Setup</h2>
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div>
                    <Label htmlFor="numQuestions" value="Number of Questions" />
                    <TextInput 
                    id="numQuestions"
                    type="number"
                    value={numberOfQuestions}
                    onChange={(e) => setNumberOfQuestions(e.target.value)}
                    required
                    />
                </div>
                <div>
                    <Label htmlFor="theme" value="Theme" />
                    <TextInput 
                    id="theme"
                    type="text"
                    value={theme}
                    onChange={(e) => setTheme(e.target.value)}
                    required
                    />
                </div>
                <div>
                    <Label htmlFor="difficulty" value="Difficulty" />
                    <Select name="difficulty" htmlFor="difficulty" value={difficulty} onChange={(e) => setDifficulty(e.target.value)}>
                    <option value="easy">Easy</option>
                    <option value="medium">Medium</option>
                    <option value="hard">Hard</option>
                    </Select>
                </div>
                <Button type="submit">Generate Quiz</Button>
                </form>
            </div>
        )}
    </div>
  );
};

export default QuizConfigForm;
