import React, { useState } from 'react';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { Button, TextInput, Label, Forms } from 'flowbite-react'; //TODO: replace form with flowbite Forms
import {app} from './firebaseConfig';
import { Link } from 'react-router-dom';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [isSignedUp, setIsSignedUp] = useState(false); 

  const handleSignUp = (event) => {
    event.preventDefault();
    const auth = getAuth(app);

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        setIsSignedUp(true); 
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  return (
    <div className="flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-md">
        <h1 className="text-6xl font-bold text-center mb-8">Triv.IA</h1>

        <h2 className="mb-6 text-2xl font-bold text-center">Sign Up</h2>
        {isSignedUp ? ( 
          <div className="text-green-600 mb-4 justify-center">Sign-up successful! You can now log in.</div>
        ) : (
          <form onSubmit={handleSignUp} className="flex flex-col gap-4">
            <div>
              <Label htmlFor="email1" value="Your email" />
              <TextInput 
                id="email1" 
                type="email" 
                placeholder="name@example.com" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)}
                required 
              />
            </div>
            <div>
              <Label htmlFor="password1" value="Your password" />
              <TextInput 
                id="password1" 
                type="password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                required 
              />
            </div>
            {error && <p className="text-red-600">{error}</p>}
            <Button gradientDuoTone="tealToLime" type="submit">Sign Up</Button>
          </form>
        )}
        <div className="mt-4">
          <p>Already have an account?</p>
          <Link to="/signin">
           <Button gradientDuoTone="tealToLime">Sign In</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
