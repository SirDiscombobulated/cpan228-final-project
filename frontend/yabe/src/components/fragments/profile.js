import React, { useState } from "react";
import "./fragmentsStyle/profile.css";
import profileIcon from "./profile.png";

const ProfileBar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="profile-bar">
            <div className="profile-icon" onClick={toggleDropdown}>
                <img src={profileIcon} alt="Profile" className="profile-image" />
            </div>
            {isOpen && (
                <div className="dropdown-menu">
                    <a href="/login" className="dropdown-item">Sign-In</a>
                    <a href="/register" className="dropdown-item">Register</a>
                </div>
            )}
        </div>
    );
};

export default ProfileBar;
