import React, { useState, useEffect } from 'react';
import { getAuthHeader } from '../auth/auth';

function ProfilePage() {
    const [userData, setUserData] = useState(null);
    const [error, setError] = useState(false);

    useEffect(() => {
        const fetchUserData = async () => {
            const userId = localStorage.getItem('userId');
            const authHeader = getAuthHeader();

            if (!userId) {
                setError(true);
                return;
            }

            try {
                const response = await fetch(`http://localhost:8080/users/${userId}`, {
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
            <h1>{userData.firstName} {userData.lastName}</h1>
            <p>Username: {userData.username}</p>
            <p>Role: {userData.role}</p>
            <p>Phone Number: {userData.phoneNumber}</p>
            <p>Email: {userData.email}</p>
            <p>Bio: {userData.bio}</p>
            <h2>Wishlist</h2>
            <ul>
                {userData.wishlist && userData.wishlist.length > 0 ? (
                    userData.wishlist.map((item, index) => (
                        <li key={index}>{item}</li>
                    ))
                ) : (
                    <li>No items in wishlist</li>
                )}
            </ul>
        </div>
    );
}

export default ProfilePage;
