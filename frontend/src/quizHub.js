import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Table, Navbar, Button } from 'flowbite-react';
import { getFirestore, collection, query, getDocs, doc, deleteDoc } from 'firebase/firestore';
import { app } from './firebaseConfig';

const QuizGenerator = () => {
    const navigate = useNavigate();
    const [createdQuizzes, setCreatedQuizzes] = useState([]);
    const db = getFirestore(app);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchCreatedQuizzes();
    }, []);

    const handlePlayQuiz = (quizDocId) => {
        navigate(`/playquiz/${quizDocId}`);
    };

    const handleGenerateQuiz = () => {
        navigate('/quizsetup');
    };

    const fetchCreatedQuizzes = async () => {
        try {
            const q = query(collection(db, 'quizzes'));
            const querySnapshot = await getDocs(q);

            const quizzes = [];
            querySnapshot.forEach((doc) => {
                console.log(`${doc.id} => ${doc.data()}`);
                const quiz = doc.data();
                quiz.id = doc.id;
                quizzes.push(quiz);
            });
            setCreatedQuizzes(quizzes);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching created quizzes:", error);
        }
    };

    const deleteQuiz = async (quizId) => {
        try {
            const quizDoc = doc(db, 'quizzes', quizId);
            await deleteDoc(quizDoc);
            console.log(`Quiz with ID ${quizId} deleted successfully`);
            fetchCreatedQuizzes();
        } catch (error) {
            console.error(`Error deleting quiz with ID ${quizId}:`, error);
        }
    };

    const renderQuizTable = () => {
        if (loading) {
            return <p>Loading...</p>;
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
                                <Button color="blue" pill onClick={() => handlePlayQuiz(quiz.id)} className="mr-2">Play</Button>
                                <Button color="failure" pill onClick={() => deleteQuiz(quiz.id)} className="bg-red-500 text-white">Delete</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        );
    };

    return (
        <div>
            <Navbar fluid className="navbar bg-black text-white">
                <div className="flex justify-center w-full">
                    <Link to="/quizhub" className="brand-link">
                        <span className="text-2xl font-bold">Triv.IA</span>
                    </Link>
                </div>
            </Navbar>

            <div className="flex justify-center mt-6">
                <Button gradientDuoTone="tealToLime" onClick={handleGenerateQuiz}>Generate Quiz</Button>
            </div>

            <div>
                {createdQuizzes.length > 0 ? (
                    <div className="flex flex-col items-center justify-center p-6">
                    </div>
                ) : (
                    <p>No quiz data available.</p>
                )}
            </div>
            <div>
                {renderQuizTable()}
            </div>
        </div>
    );
};

export default QuizGenerator;
