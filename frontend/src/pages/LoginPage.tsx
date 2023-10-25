import React, { useState } from 'react';

const LoginPage: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [rememberMe, setRememberMe] = useState(false);

    const handleLogin = async () => {
        try {
            const response = await fetch('/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            });
            const data = await response.json();
            if (data.token) {
                localStorage.setItem('authToken', data.token);
                window.location.href = '/';
            }
        } catch (err) {
            setError('Invalid email or password');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md w-96 transform transition-transform duration-500 hover:scale-105">
                <h2 className="text-2xl font-bold mb-4 text-center">Login to RateScape</h2>
                {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                        Email
                    </label>
                    <div className="flex items-center border rounded w-full py-2">
                        <span className="px-3 text-gray-500">
                            <i className="fas fa-envelope"></i>
                        </span>
                        <input
                            type="email"
                            id="email"
                            className="flex-1 appearance-none border-none py-2 px-3 text-gray-700 focus:outline-none"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                        Password
                    </label>
                    <div className="flex items-center border rounded w-full py-2">
                        <span className="px-3 text-gray-500">
                            <i className="fas fa-lock"></i>
                        </span>
                        <input
                            type="password"
                            id="password"
                            className="flex-1 appearance-none border-none py-2 px-3 text-gray-700 focus:outline-none"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                </div>
                <div className="flex justify-between items-center mb-4">
                    <label className="flex items-center">
                        <input type="checkbox" className="mr-2" checked={rememberMe} onChange={() => setRememberMe(!rememberMe)} />
                        Remember Me
                    </label>
                    <a href="#" className="text-blue-500 hover:underline">Forgot Password?</a>
                </div>
                <div className="text-center mb-3">
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full transform transition-transform duration-500 hover:scale-105"
                        onClick={handleLogin}
                    >
                        Sign in
                    </button>
                </div>
                <p className="text-center">
                    Not a member? <a href="/register" className="text-blue-500 hover:underline">Register</a>
                </p>
            </div>
        </div>
    );
};

export default LoginPage;
