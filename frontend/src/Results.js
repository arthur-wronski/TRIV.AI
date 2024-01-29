import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const Results = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { score, total } = location.state;

  return (
    <div>
      <h2>Your Score: {score} / {total}</h2>
      <button onClick={() => navigate('/')}>Play Again</button>
      <button onClick={() => navigate('/')} >Exit</button>
    </div>
  );
};

export default Results;
