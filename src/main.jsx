import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

// 1. Import the global context provider
import { AuthProvider } from './context/AuthContext';

// 2. Import all page and layout components
import App from './App.jsx';
import LoginPage from './pages/LoginPage.jsx';
import RegisterPage from './pages/RegisterPage.jsx';
import ChatPage from './pages/ChatPage.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';

// 3. Import global styles
import './index.css';

// 4. Define the application's entire routing structure
const router = createBrowserRouter([
  {
    path: '/',
    element: <App />, // The <App> component provides the main layout (header, etc.)
    children: [
      // --- Public Routes ---
      // These are accessible to everyone
      { path: '/login', element: <LoginPage /> },
      { path: '/register', element: <RegisterPage /> },
      
      // --- Protected Routes ---
      // These are only accessible to logged-in users
      {
        element: <ProtectedRoute />, // The ProtectedRoute component checks for a user
        children: [
          // If the user is logged in, they can access these child routes
          { path: '/chat', element: <ChatPage /> },
          // e.g., { path: '/profile', element: <ProfilePage /> }
        ]
      }
    ],
  },
]);

// 5. Render the application
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* AuthProvider wraps the whole app, making user data available everywhere */}
    <AuthProvider>
      {/* RouterProvider renders the correct page based on the current URL */}
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
);