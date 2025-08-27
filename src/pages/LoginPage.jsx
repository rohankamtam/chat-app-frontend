import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // <-- Use our custom hook

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  const { login } = useAuth(); // <-- Get the login function from context

  const submitHandler = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    try {
      await login({ email, password }); // <-- Use the context's login function
      navigate('/'); 
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred during login.');
    } finally {
      setIsLoading(false);
    }
  };

  // ... The rest of the JSX form is exactly the same
  return (
    <div>
      <h1>Login</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={submitHandler}>
        <div>
          <label>Email Address:</label>
          <input type="email" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div>
          <label>Password:</label>
          <input type="password" placeholder="Enter password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Logging in...' : 'Login'}
        </button>
      </form>
    </div>
  );
};

export default LoginPage;