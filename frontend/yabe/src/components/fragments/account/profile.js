import React, { useState, useEffect } from 'react';
import { logout as performLogout } from '../../auth/auth.js';
import "./accountStyle/profile.css";
import profileIcon from "../fragmentsImages/profile.png";

const ProfileBar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [user, setUser] = useState(null);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    useEffect(() => {
        const username = localStorage.getItem('username');
        if (username) {
            setUser({ username });
        }
    }, []);

    const handleLogout = async () => {
        try {
            performLogout();
            setUser(null);
            setIsOpen(false);
            window.location.href = "/login";
        } catch (error) {
            console.error("Error logging out:", error);
        }
    };

    return (
        <div className="profile-bar">
            <div className="username">
                {user ? (
                    <>
                        <a>Hello, {user.username}</a>
                    </>
                ) : (
                        <a></a>
                )}
            </div>
            <div className="profile-icon" onClick={toggleDropdown}>
                <img src={profileIcon} alt="Profile" className="profile-image"/>

            </div>
            {isOpen && (
                <div className="dropdown-menu">
                    {user ? (
                        <>
                            <span className="dropdown-item">Welcome back, {user.username}!</span>
                            <a href="/account" className="dropdown-item">Account</a>
                            <button onClick={handleLogout} className="dropdown-item">Logout</button>
                        </>
                    ) : (
                        <>
                            <a href="/login" className="dropdown-item">Login</a>
                            <a href="/register" className="dropdown-item">Register</a>
                        </>
                    )}
                </div>
            )}
        </div>
    );
};

export default ProfileBar;
