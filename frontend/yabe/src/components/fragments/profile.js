import React, { useEffect, useState } from "react";
import "./fragmentsStyle/profile.css";
import profileIcon from "./profile.png";

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
        console.log("Logout button clicked");

        // Clear localStorage
        localStorage.removeItem('username');
        localStorage.removeItem('password');

        // Call the logout API
        try {
            const response = await fetch("/logout", { method: "POST" });
            if (response.ok) {
                console.log("Logout successful, state updated");
                setUser(null);
                setIsOpen(false);
                window.location.href = "/login";
            } else {
                console.error("Logout failed");
            }
        } catch (error) {
            console.error("Error logging out:", error);
        }
    };

    return (
        <div className="profile-bar">
            <div className="profile-icon" onClick={toggleDropdown}>
                <img src={profileIcon} alt="Profile" className="profile-image" />
            </div>
            {isOpen && (
                <div className="dropdown-menu">
                    {user ? (
                        <>
                            <span className="dropdown-item">Welcome back, {user.username}!</span>
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
