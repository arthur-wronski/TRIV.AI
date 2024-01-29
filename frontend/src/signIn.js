import React, { useState } from 'react';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { Button, TextInput, Label } from 'flowbite-react';
import { useNavigate } from 'react-router-dom'; 
import {app} from './firebaseConfig'

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate(); 

  const handleSignIn = (event) => {
    event.preventDefault();
    const auth = getAuth(app);
  
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        navigate('/quizGen');
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  return (
    <div className="flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-md">
        <h2 className="mb-6 text-2xl font-bold text-center">Sign In</h2>
        <form onSubmit={handleSignIn} className="flex flex-col gap-4">
          <div>
            <Label htmlFor="email" value="Email" />
            <TextInput 
              id="email" 
              type="email" 
              placeholder="name@example.com" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)}
              required 
            />
          </div>
          <div>
            <Label htmlFor="password" value="Password" />
            <TextInput 
              id="password" 
              type="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              required 
            />
          </div>
          {error && <p className="text-red-600">{error}</p>}
          <Button type="submit">Sign In</Button>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
