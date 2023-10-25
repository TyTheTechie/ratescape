import React from 'react';

interface HomePageProps {
    isLoggedIn: boolean;
}

const HomePage: React.FC<HomePageProps> = ({ isLoggedIn }) => {
    return (
        <div className="bg-gray-100 min-h-screen flex flex-col items-center justify-center">
            <h1 className="text-4xl font-bold mb-4">Welcome to RateScape</h1>
            <p className="text-xl mb-4">Your one-stop platform for rating everything!</p>
            {!isLoggedIn && (
                <div>
                    <p className="mb-2">New here? <a href="/register" className="text-blue-500 hover:underline">Register</a></p>
                    <p>Already a member? <a href="/login" className="text-blue-500 hover:underline">Login</a></p>
                </div>
            )}
        </div>
    );
};

export default HomePage;
