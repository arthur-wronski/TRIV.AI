import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button, Table } from 'flowbite-react';
import { getFirestore, collection, query, getDocs, doc, deleteDoc } from 'firebase/firestore';
import { app } from './firebaseConfig';

const QuizGenerator = () => {
    const navigate = useNavigate();
    const [createdQuizzes, setCreatedQuizzes] = useState([]); // List of created quizzes
    const db = getFirestore(app);
    const [loading, setLoading] = useState(true); // Add loading state

    useEffect(() => {
        // Fetch the list of created quizzes when the component mounts
        fetchCreatedQuizzes();
    }, []);

    const handlePlayQuiz = (quizDocId) => {
        navigate(`/playquiz/${quizDocId}`); // Pass quiz document ID as part of the URL
    };

    const fetchCreatedQuizzes = async () => {
        try {
            const q = query(collection(db, 'quizzes')); // Reference to the 'quizzes' collection
            const querySnapshot = await getDocs(q);

            const quizzes = [];
            querySnapshot.forEach((doc) => {
                console.log(`${doc.id} => ${doc.data()}`);
                const quiz = doc.data();
                quiz.id = doc.id; // Store the Firestore document ID for future updates/deletes
                quizzes.push(quiz);
            });
            setCreatedQuizzes(quizzes);
            setLoading(false); // Data is available, set loading to false
        } catch (error) {
            console.error("Error fetching created quizzes:", error);
        }
    };

    const deleteQuiz = async (quizId) => {
        try {
            const quizDoc = doc(db, 'quizzes', quizId);
            await deleteDoc(quizDoc);
            console.log(`Quiz with ID ${quizId} deleted successfully`);
            fetchCreatedQuizzes(); // Refresh the list of created quizzes
        } catch (error) {
            console.error(`Error deleting quiz with ID ${quizId}:`, error);
        }
    };

    const renderQuizTable = () => {
        if (loading) {
            return <p>Loading...</p>; // Display a loading message while data is being fetched
        }

        if (createdQuizzes.length === 0) {
            return <p>No quizzes created yet.</p>;
        }

        return (
            <Table>
                <thead>
                    <tr>
                        <th>Quiz Name</th>
                        <th>Difficulty</th>
                        <th>Number of Questions</th>
                        <th>Highest Score</th>
                        <th>Created On</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {createdQuizzes.map((quiz) => (
                        <tr key={quiz.id}>
                            <td>{quiz.title}</td>
                            <td>{quiz.difficulty}</td>
                            <td>{quiz.numQuestions}</td>
                            <td>{quiz.highestScore}</td>
                            <td>{new Date(quiz.timestamp?.toDate()).toLocaleDateString()}</td>
                            <td>
                                <Button onClick={() => handlePlayQuiz(quiz.id)} className="mr-2">Play</Button>
                                <Button onClick={() => deleteQuiz(quiz.id)} className="bg-red-500 text-white">Delete</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        );
    };

    return (
        <div>
            <div className="navbar">
                <h1>Trivia Quiz Generator using AI</h1>
                <Link to="/quizgen">
                    <Button>My Quizzes</Button>
                </Link>
                <Link to="/quizsetup">
                    <Button>Generate Quiz</Button>
                </Link>
            </div>

            <div>
                {createdQuizzes.length > 0 ? (
                    <div className="flex flex-col items-center justify-center p-6">
                        {/* Optionally, preview the quiz here */}
                    </div>
                ) : (
                    <p>No quiz data available.</p>
                )}
            </div>

            {/* Table of created quizzes */}
            <div>
                <h2>My Quizzes:</h2>
                {renderQuizTable()}
            </div>
        </div>
    );
};

export default QuizGenerator;
