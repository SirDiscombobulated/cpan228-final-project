import React, { useState, useEffect } from 'react';
import { getAuthHeader } from '../../auth/auth';
import './accountStyle/account.css';

function AccountInfo() {
    const [userData, setUserData] = useState(null);
    const [error, setError] = useState(false);

    useEffect(() => {
        const fetchUserData = async () => {
            const username = localStorage.getItem('username');
            const authHeader = getAuthHeader();

            if (!username) {
                setError(true);
                return;
            }

            try {
                const response = await fetch(`http://localhost:8080/api/users/${username}`, {
                    method: 'GET',
                    headers: authHeader,
                });

                if (response.ok) {
                    const data = await response.json();
                    setUserData(data);
                } else {
                    setError(true);
                }
            } catch (err) {
                console.error('Error fetching user data:', err);
                setError(true);
            }
        };

        fetchUserData();
    }, []);

    if (error) {
        return <div>Error loading profile. Please try again later.</div>;
    }

    if (!userData) {
        return <div>Loading...</div>;
    }

    return (
        <div className="profile-page">
            <div className="profile-card">
                <h1>{userData.firstName} {userData.lastName}</h1>
                <p><strong>Username:</strong> {userData.username}</p>
                <p><strong>Role:</strong> {userData.role}</p>
                <p><strong>Phone Number:</strong> {userData.phoneNumber}</p>
                <p><strong>Email:</strong> {userData.email}</p>
                <p><strong>Bio:</strong> {userData.bio}</p>
            </div>
        </div>
    );
}

export default AccountInfo;
