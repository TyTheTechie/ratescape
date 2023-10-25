import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import UserProfile from './pages/UserProfile';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import NavBar from './components/NavBar';
import useWebSocket from './hooks/useWebSocket';

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false); // State to manage login status

    // Establish a WebSocket connection to listen for new reviews
    useWebSocket("http://localhost:5000", (review: any) => {
        console.log("New review received:", review);
    });

    return (
        <Router>
            <div className="bg-gray-100 min-h-screen">
                <NavBar isLoggedIn={isLoggedIn} />
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/profile" element={<UserProfile />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
