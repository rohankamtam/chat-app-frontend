import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = () => {
  const { user } = useAuth(); // Get the user from our AuthContext

  if (!user) {
    // If the user is not logged in, redirect them to the /login page
    // 'replace' is a good practice to prevent the user from using the "back" button
    // to get back to the protected page after being redirected.
    return <Navigate to="/login" replace />;
  }

  // If the user is logged in, render the child component (our ChatPage).
  // The <Outlet /> component is a placeholder for the nested route.
  return <Outlet />;
};

export default ProtectedRoute;