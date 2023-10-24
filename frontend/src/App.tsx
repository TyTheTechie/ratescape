import React, { useEffect } from 'react';
import { io } from "socket.io-client";
import logo from './logo.svg';
import './App.css';

function App() {
  useEffect(() => {
    const socket = io("http://localhost:5000"); // Replace 5000 with your backend port if different

    socket.on("newReview", (review: any) => {
      // Update the product's average rating in the UI
      // For now, we'll just log the new review to the console
      console.log("New review received:", review);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
