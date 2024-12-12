import React from 'react';
import { Link } from 'react-router-dom';
import './accountStyle/account.css';

const AccountPage = () => {
    return (
        <div className="account-container">
            <div className="account-card">
                <h1 className="account-title">Your Account</h1>
                <Link to="/account-info" className="account-link">
                    <button className="account-button">Account Info</button>
                </Link>
                <Link to="/edit-profile" className="account-link">
                    <button className="account-button">Edit Profile</button>
                </Link>
                <Link to="/wishlist" className="account-link">
                    <button className="account-button">Wishlist</button>
                </Link>
            </div>
        </div>
    );
}

export default AccountPage;
