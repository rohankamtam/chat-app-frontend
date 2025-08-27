import axios from 'axios';

const API_URL = 'https://chat-app-backend-aqvj.onrender.com/api/users/';

// Register a new user
const register = async (userData) => {
  const response = await axios.post(`${API_URL}/register`, userData);

  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data));
  }

  return response.data;
};

// Login a user
const login = async (userData) => {
  const response = await axios.post(`${API_URL}/login`, userData);

  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data));
  }

  return response.data;
};


// --- UPDATE THE EXPORT AT THE BOTTOM ---
export {
  register,
  login, // Add login here
};