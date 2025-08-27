import { Link, Outlet } from 'react-router-dom';
import { useAuth } from './context/AuthContext';

function App() {
  const { user, logout } = useAuth(); // Get user and logout from context

  return (
    <div>
      <header>
        <h1>Welcome to EncrpChat!</h1>
        <nav>
          {user ? (
            // If user exists (is logged in)
            <>
              <span>Welcome, {user.name}!</span>
              <button onClick={logout}>Logout</button>
            </>
          ) : (
            // If user does not exist (is logged out)
            <>
              <Link to="/login">Login</Link>
              {' | '}
              <Link to="/register">Register</Link>
            </>
          )}
        </nav>
      </header>
      <hr />
      <main>
        {/* This is where our child routes like Login and Register will be rendered */}
        <Outlet />
      </main>
    </div>
  );
}

export default App;