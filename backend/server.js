require('dotenv').config();
const express = require('express');
const OpenAI = require('openai');
const app = express();
const cors = require('cors');

app.use(express.json())
app.use(cors({
    origin: 'http://localhost:3000', 
    methods: ['GET', 'POST'],       
    credentials: true                 
  }));

const apikey = process.env.REACT_APP_OPENAI_API_KEY;
const openai = new OpenAI({ apiKey: apikey });
console.log('OpenAI API Key:', apikey);

app.post('/generateQuiz', async (req, res) => {
    const { numberOfQuestions, theme, difficulty } = req.body;

    try {
        const prompt =`Create a quiz with ${numberOfQuestions} questions about ${theme} at a ${difficulty} difficulty level. Each question should be followed by four options labeled A, B, C, and D. One of these options is the correct answer. Separate the questions by a new line. Please format the quiz as follows:

Question 1: [Question text]
A. [Option A]
B. [Option B]
C. [Option C]
D. [Option D]
Correct answer: [A/B/C/D]

For example:

Question 1: What is the capital of France?
A. Paris
B. Madrid
C. Berlin
D. Rome
Correct answer: A

Please continue in this format for the remaining questions.`;
        const response = await openai.chat.completions.create({
            messages: [{ role: "user", content: prompt }],
            model: "gpt-3.5-turbo",
        });
        res.json(response.choices[0].message.content);
        console.log("Quiz text from OpenAI:", response.choices[0].message.content);
    } catch (error) {
        console.error('Error generating quiz:', error);
        if (!res.headersSent) {
            res.status(500).json('Error generating quiz');
        }
    }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
