import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { Button } from 'flowbite-react';
import { getFirestore, doc, getDoc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { app } from './firebaseConfig';

const Results = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { score, total } = location.state;
    const { quizDocId } = useParams(); // Get the quiz document ID from the URL
    console.log(quizDocId);

    const [highestScore, setHighestScore] = useState(0);

    useEffect(() => {
        // Fetch the existing highest score when the component mounts
        fetchHighestScore(quizDocId);
    }, [quizDocId]);

    const fetchHighestScore = async (docId) => {
        const db = getFirestore(app);
        const quizDocRef = doc(db, 'quizzes', docId);

        try {
            const quizDocSnap = await getDoc(quizDocRef);

            if (quizDocSnap.exists()) {
                const quiz = quizDocSnap.data();
                const currentHighestScore = quiz.highestScore || 0;
                setHighestScore(currentHighestScore);
            } else {
                console.error('Quiz document not found.');
            }
        } catch (error) {
            console.error('Error fetching quiz data:', error);
        }
    };

    const handlePlayAgain = () => {
        navigate(`/playquiz/${quizDocId}`); // Return to the quiz
    };

    const handleExit = () => {
        navigate('/quizgen');
    };

    const updateHighestScore = async () => {
        // Check if the current score is higher than the existing highest score
        if (score > highestScore) {
            const db = getFirestore(app);
            const quizDocRef = doc(db, 'quizzes', quizDocId);

            try {
                // Update the highest score in Firebase
                await updateDoc(quizDocRef, {
                    highestScore: score,
                    timestamp: serverTimestamp(), // Update the timestamp to reflect the change
                });
                setHighestScore(score); // Update the local state
                console.log('Highest score updated successfully.');
            } catch (error) {
                console.error('Error updating highest score:', error);
            }
        }
    };

    // Call the function to update the highest score when the component renders
    useEffect(() => {
        updateHighestScore();
    }, []);

    return (
        <div>
            <h2>Your Score: {score} / {total}</h2>
            <p>Highest Score: {highestScore}</p>
            <Button onClick={handlePlayAgain}>Play Again</Button>
            <Button onClick={handleExit}>Exit</Button>
        </div>
    );
};

export default Results;
