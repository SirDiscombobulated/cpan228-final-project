import React, { useState, useEffect } from 'react';
import { getAuthHeader, fetchData } from '../../auth/auth';
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

            if (!username) {
                setError(true);
                return;
            }

            const data = await fetchData(`http://localhost:8080/api/users/${username}`);

            if (data) {
                setUserData(data);
            } else {
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

        const updatedData = { ...userData };

        console.log('Sending updated data:', updatedData);

        try {
            const headers = getAuthHeader();
            console.log('Auth headers:', headers); // Debugging: Check the auth headers

            const response = await fetch(`http://localhost:8080/api/users/${username}`, {
                method: 'PUT',
                headers: headers,
                body: JSON.stringify(updatedData)
            });

            if (response.ok) {
                setSuccess(true);
                setError(false);
            } else {
                const errorText = await response.text();
                console.error('Response error:', errorText); // Debugging: Check the response error
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
            <div className="profile-card">
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
                            placeholder="Enter new password"
                            className="password"
                            onChange={handleChange}
                        />
                    </label>
                    <button type="submit">Save Changes</button>
                    
                </form>
                {success && <div>Profile updated successfully!</div>}
            </div>
        </div>
    );
}

export default EditProfile;
