import React, { useEffect } from 'react';
import { io } from "socket.io-client";
import UserProfile from './UserProfile';

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
    <div className="bg-gray-100 min-h-screen">
      <nav className="bg-blue-600 p-4 text-white">
        <ul className="flex space-x-4 justify-center">
          <li><a href="/" className="hover:underline">Home</a></li>
          <li><a href="/profile" className="hover:underline">Profile</a></li>
          <li><a href="/reviews" className="hover:underline">Reviews</a></li>
          <li><a href="/about" className="hover:underline">About</a></li>
        </ul>
      </nav>
      <main className="p-4">
        <h1 className="text-4xl font-bold mb-4 text-center">Welcome to RateScape</h1>
        <p className="text-xl mb-4 text-center">Your one-stop platform for product reviews.</p>
        <UserProfile />
      </main>
    </div>
  );
}

export default App;
