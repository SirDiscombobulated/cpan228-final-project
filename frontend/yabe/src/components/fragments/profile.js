import React, { useState, useEffect } from "react";
import "./fragmentsStyle/profile.css";
import profileIcon from "./profile.png";



const ProfileBar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [user, setUser] = useState(null);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    // Fetch user data from backend
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await fetch("/api/user"); 
                if (response.ok) {
                    const data = await response.json();
                    setUser(data); 
                }
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };

        fetchUser();
    }, []);

    const handleLogout = async () => {
        try {
            const response = await fetch("/api/logout", { method: "POST" });
            if (response.ok) {
                window.location.href = "/login"; 
            }
        } catch (error) {
            console.error("Error logging out:", error);
        }
    };

    const handleToggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="profile-bar">
            <div className="profile-icon" onClick={handleToggleDropdown}>
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
                        <a href="/register" className="dropdown-item">Register</a>.
                        </>
                    )}
                </div>
            )}
        </div>
    );
};

export default ProfileBar;
