import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
// import { setUser } from '../store/userSlice';
import axios from 'axios';
import { setUser } from '@/rtk/userSlice';

const SignIn: React.FC = () => {
  const dispatch = useDispatch();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const response = await axios.post('http://localhost:5000/api/user/login', {
        email,
        password,
      });

      const { user } = response.data;

      // Dispatch the setUser action to update the user state
      dispatch(setUser(user));
      localStorage.setItem('user', JSON.stringify(user));

      // Handle any necessary actions upon successful login
      console.log('Login successful', user);
    } catch (err) {
      setError('An error occurred during login.');
    }

    setIsLoading(false);
  };

  return (
    <form className="login max-w-xs mx-auto p-4 bg-white shadow-md rounded-md" onSubmit={handleSubmit}>
      <h3 className="text-xl font-semibold mb-4">Log In</h3>
  
      <label className="block mb-2">Email address:</label>
      <input
        className="w-full px-3 py-2 border border-gray-300 rounded-md mb-4"
        type="email"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        required
      />
  
      <label className="block mb-2">Password:</label>
      <input
        className="w-full px-3 py-2 border border-gray-300 rounded-md mb-4"
        type="password"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
        required
      />
  
      <button
        className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md mb-4"
        type="submit"
        disabled={isLoading}
      >
        Log in
      </button>
  
      {error && <div className="text-red-500">{error}</div>}
    </form>
  );
  
};

export default SignIn;
