import React, { useState } from 'react';
import { Button, TextInput, Label, Select } from 'flowbite-react';
import { useNavigate } from 'react-router-dom';

const QuizConfigForm = ({ onQuizRequest }) => {
  const [numberOfQuestions, setNumberOfQuestions] = useState('');
  const [theme, setTheme] = useState('');
  const [difficulty, setDifficulty] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    navigate('/quizgen', { state: { numberOfQuestions, theme, difficulty } });
  };

  return (
    <div className='flex flex-col items-center justify-center p-6'>
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
                    <Select id="difficulty" value={difficulty} onChange={(e) => setDifficulty(e.target.value)}>
                    <option value="easy">Easy</option>
                    <option value="medium">Medium</option>
                    <option value="hard">Hard</option>
                    </Select>
                </div>
                <Button type="submit">Generate Quiz</Button>
                </form>
            </div>
        </div>
  );
};

export default QuizConfigForm;
