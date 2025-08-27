import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // <-- Use our custom hook

const RegisterPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  const { register } = useAuth(); // <-- Get the register function from context

  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError('Passwords do not match!');
      return;
    }
    setIsLoading(true);
    setError(null);
    try {
      await register({ name, email, password }); // <-- Use the context's register function
      navigate('/login');
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred during registration.');
    } finally {
      setIsLoading(false);
    }
  };

  // ... The rest of the JSX form is exactly the same
  return (
    <div>
      <h1>Register</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={submitHandler}>
        <div>
          <label>Name:</label>
          <input type="text" placeholder="Enter name" value={name} onChange={(e) => setName(e.target.value)} required />
        </div>
        <div>
          <label>Email Address:</label>
          <input type="email" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div>
          <label>Password:</label>
          <input type="password" placeholder="Enter password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <div>
          <label>Confirm Password:</label>
          <input type="password" placeholder="Confirm password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
        </div>
        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Registering...' : 'Register'}
        </button>
      </form>
    </div>
  );
};

export default RegisterPage;