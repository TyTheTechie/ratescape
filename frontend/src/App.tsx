import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import UserProfile from './pages/UserProfile';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import RegistrationPage from './pages/RegistrationPage';
import { io } from 'socket.io-client';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // State to manage login status

  // Establish a WebSocket connection to listen for new reviews
  useEffect(() => {
    const socket = io("http://localhost:5000");

    socket.on("newReview", (review: any) => {
      console.log("New review received:", review);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <Router>
      <div className="bg-gray-100 min-h-screen">
        <nav className="bg-blue-600 p-4 text-white">
          <ul className="flex space-x-4 justify-center">
            <li><Link to="/" className="hover:underline">Home</Link></li>
            <li><Link to="/login" className="hover:underline">Login</Link></li>
            <li><Link to="/register" className="hover:underline">Register</Link></li>
            {isLoggedIn && <li><Link to="/profile" className="hover:underline">Profile</Link></li>}
          </ul>
        </nav>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegistrationPage />} />
          <Route path="/profile" element={<UserProfile />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
