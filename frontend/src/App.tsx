import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import UserProfile from './pages/UserProfile';
import { io } from 'socket.io-client';

function App() {
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
            <li><Link to="/profile" className="hover:underline">Profile</Link></li>
            <li><Link to="/reviews" className="hover:underline">Reviews</Link></li>
            <li><Link to="/about" className="hover:underline">About</Link></li>
          </ul>
        </nav>
        <main className="p-4">
          <h1 className="text-4xl font-bold mb-4 text-center">Welcome to RateScape</h1>
          <p className="text-xl mb-4 text-center">Your one-stop platform for product reviews.</p>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/profile" element={<UserProfile />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

// Placeholder for HomePage.tsx
function HomePage() {
  return <div>Welcome to the Home Page!</div>;
}

export default App;
