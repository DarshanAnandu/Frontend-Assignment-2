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

  useEffect(() => {
    const checkLoggedInStatus = () => {
      const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
      if (!isLoggedIn && window.location.pathname !== '/login') {
        // Redirect to login if not logged in
        window.location.replace('/login');
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
        <Route path="/" element={<MusicPlayer />} />
        {/* Add other routes as needed */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;
