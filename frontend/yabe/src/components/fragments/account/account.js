import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './accountStyle/account.css';
import { fetchData } from '../../auth/auth'; // Importing fetchData function

const AccountPage = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetching username and role from localStorage and ensuring they are set
    useEffect(() => {
        const username = localStorage.getItem('username');

        if (!username) {
            setError("No username found in localStorage.");
            setLoading(false);
            return;
        }

        // Fetch user data using Basic Authentication
        const fetchUserData = async () => {
            try {
                const data = await fetchData(`http://localhost:8080/api/users/${username}`);

                if (data) {
                    setUser({ ...data, username });
                } else {
                    setError("Failed to fetch user data.");
                }
            } catch (err) {
                setError("Error fetching user data.");
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, []);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div className="account-container">
            <div className="account-card">
                <h1 className="account-title">Your Account</h1>
                {user && (
                    <>
                        <Link to="/account-info" className="account-link">
                            <button className="account-button">Account Info</button>
                        </Link>
                        <Link to="/edit-profile" className="account-link">
                            <button className="account-button">Edit Profile</button>
                        </Link>
                        <Link to="/item-postings" className="account-link">
                            <button className="account-button">Item Postings</button>
                        </Link>
                        <Link to="/wishlist" className="account-link">
                            <button className="account-button">Wishlist</button>
                        </Link>
                        {user.role === 'ADMIN' && (
                            <Link to="/admin" className="account-link">
                                <button className="account-button">Admin Settings</button>
                            </Link>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default AccountPage;
