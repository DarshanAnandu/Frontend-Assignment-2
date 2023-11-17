import React, { useEffect } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import './App.css';
import Login from './pages/Login';
import MusicPlayer from './pages/MusicPlayer';

function App() {
  // localStorage.setItem('loggedIn', 'false');
  const log = localStorage.getItem('loggedIn') === 'true';

  useEffect(() => {
    const checkLoggedInStatus = () => {
      const isLoggedIn = localStorage.getItem('loggedIn') === 'true';
      const isLoginPage = window.location.pathname === '/login';

      if (!isLoggedIn && !isLoginPage) {
        // Redirect to login if not logged in and not on the login page
        window.location.replace('/login');
      } else if (isLoggedIn && isLoginPage) {
        // Redirect to home if logged in and on the login page
        window.location.replace('/');
      }
    };

    // Check initially
    checkLoggedInStatus();

    // Set up interval to check every minute
    const intervalId = setInterval(checkLoggedInStatus, 60000);

    // Cleanup on component unmount
    return () => clearInterval(intervalId);
  }, []);
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        {/* <Route path="/" element={<MusicPlayer />} /> */}
        <Route
          path="/"
          element={log ? <MusicPlayer /> : <Navigate to="/login" />}
        />
        {/* Add other routes as needed */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;
