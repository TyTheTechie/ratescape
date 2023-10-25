import React from 'react';
import { Link } from 'react-router-dom';

interface NavBarProps {
    isLoggedIn: boolean;
}

const NavBar: React.FC<NavBarProps> = ({ isLoggedIn }) => {
    return (
        <nav className="bg-blue-600 p-4 text-white">
            <ul className="flex space-x-4 justify-center">
                <li><Link to="/" className="hover:underline">Home</Link></li>
                <li><Link to="/login" className="hover:underline">Login</Link></li>
                {isLoggedIn && <li><Link to="/profile" className="hover:underline">Profile</Link></li>}
            </ul>
        </nav>
    );
};

export default NavBar;
