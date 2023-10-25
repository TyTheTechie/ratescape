import React from 'react';
import { Link } from 'react-router-dom';

interface NavBarProps {
    isLoggedIn: boolean;
}

const NavBar: React.FC<NavBarProps> = ({ isLoggedIn }) => {
    return (
        <nav className="bg-purple-700 p-4 text-white shadow-md">
            <div className="container mx-auto">
                <div className="flex justify-between items-center">
                    <div className="text-2xl font-bold">
                        <Link to="/">RateScape</Link>
                    </div>
                    <ul className="flex space-x-4">
                        {!isLoggedIn && <li><Link to="/login" className="hover:text-purple-300">Login</Link></li>}
                        {isLoggedIn && <li><Link to="/profile" className="hover:text-purple-300">Profile</Link></li>}
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default NavBar;
