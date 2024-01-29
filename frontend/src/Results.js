import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { Button } from 'flowbite-react';
import { getFirestore, doc, getDoc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { app } from './firebaseConfig';

const Results = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { score, total } = location.state;
    const { quizDocId } = useParams();

    const [highestScore, setHighestScore] = useState(0);

    useEffect(() => {
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
        navigate(`/playquiz/${quizDocId}`);
    };

    const handleExit = () => {
        navigate('/quizhub');
    };

    const updateHighestScore = async () => {
        if (score > highestScore) {
            const db = getFirestore(app);
            const quizDocRef = doc(db, 'quizzes', quizDocId);

            try {
                await updateDoc(quizDocRef, {
                    highestScore: score,
                    timestamp: serverTimestamp(),
                });
                setHighestScore(score);
                console.log('Highest score updated successfully.');
            } catch (error) {
                console.error('Error updating highest score:', error);
            }
        }
    };

    useEffect(() => {
        updateHighestScore();
    }, []);

    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <h2 className="text-4xl font-bold mb-4">Your Score: {score} / {total}</h2>
            <p className="text-2xl">Highest Score: {highestScore}</p>
            <div className="mt-6">
                <Button gradientMonochrome="cyan" onClick={handlePlayAgain}>Play Again</Button>
                <div className="h-4"></div>
                <Button gradientMonochrome="failure" onClick={handleExit}>Exit</Button>
            </div>
        </div>
    );
};

export default Results;
