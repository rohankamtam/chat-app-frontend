import React, { createContext, useState, useContext, useEffect } from 'react';
import { login as loginService, register as registerService } from '../services/userService';

// 1. Create the Context
const AuthContext = createContext();

// 2. Create the Provider Component
// This component will wrap our app and provide the auth state to all children.
export const AuthProvider = ({ children }) => {
  // 3. The State
  // We get the user from localStorage to check if they were already logged in.
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')) || null);

  // This function will run whenever the 'user' state changes.
  // It keeps localStorage in sync with our state.
  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
  }, [user]);

  // 4. The Logic (functions to change the state)
  const login = async (userData) => {
    const loggedInUser = await loginService(userData);
    setUser(loggedInUser);
    return loggedInUser;
  };

  const register = async (userData) => {
    const registeredUser = await registerService(userData);
    setUser(registeredUser);
    return registeredUser;
  };

  const logout = () => {
    setUser(null); // This will trigger the useEffect to clear localStorage
  };

  // 5. The Value
  // This is the "announcement board" - we're making the user, login, logout, etc.
  // available to any component that wants them.
  const value = { user, login, register, logout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// 6. A custom hook to make it easy to use the context
export const useAuth = () => {
  return useContext(AuthContext);
};