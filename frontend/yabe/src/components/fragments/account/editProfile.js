import React, { useState, useEffect } from 'react';
import { getAuthHeader } from '../../auth/auth';
import './accountStyle/account.css';

function EditProfile() {
    const [userData, setUserData] = useState({
        firstName: '',
        lastName: '',
        phoneNumber: '',
        email: '',
        bio: '',
        password: ''
    });
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        const fetchUserData = async () => {
            const username = localStorage.getItem('username');
            const authHeader = getAuthHeader();

            if (!username) {
                setError(true);
                return;
            }

            try {
                const response = await fetch(`http://localhost:8080/users/${username}`, {
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

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const username = localStorage.getItem('username');
        const authHeader = getAuthHeader();

        if (userData.password) {
            const enc = new TextEncoder();
            const hashBuffer = await crypto.subtle.digest('SHA-256', enc.encode(userData.password));
            const hashArray = Array.from(new Uint8Array(hashBuffer));
            userData.password = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
        }

        try {
            const response = await fetch(`http://localhost:8080/users/${username}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    ...authHeader
                },
                body: JSON.stringify(userData)
            });

            if (response.ok) {
                setSuccess(true);
                setError(false);
            } else {
                setError(true);
                setSuccess(false);
            }
        } catch (err) {
            console.error('Error updating profile:', err);
            setError(true);
            setSuccess(false);
        }
    };

    if (error) {
        return <div>Error loading profile. Please try again later.</div>;
    }

    if (!userData) {
        return <div>Loading...</div>;
    }

    return (
        <div className="profile-page">
            <h1>Edit Profile</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    First Name:
                    <input
                        type="text"
                        name="firstName"
                        value={userData.firstName}
                        onChange={handleChange}
                    />
                </label>
                <label>
                    Last Name:
                    <input
                        type="text"
                        name="lastName"
                        value={userData.lastName}
                        onChange={handleChange}
                    />
                </label>
                <label>
                    Phone Number:
                    <input
                        type="text"
                        name="phoneNumber"
                        value={userData.phoneNumber}
                        onChange={handleChange}
                    />
                </label>
                <label>
                    Email:
                    <input
                        type="email"
                        name="email"
                        value={userData.email}
                        onChange={handleChange}
                    />
                </label>
                <label>
                    Bio:
                    <textarea
                        name="bio"
                        value={userData.bio}
                        onChange={handleChange}
                    />
                </label>
                <label>
                    Password:
                    <input
                        type="password"
                        name="password"
                        value={userData.password}
                        className="password"
                        onChange={handleChange}
                    />
                </label>
                <button type="submit">Save Changes</button>
            </form>
            {success && <div>Profile updated successfully!</div>}
        </div>
    );
}

export default EditProfile;
