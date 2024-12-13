import React, { useState } from 'react';
import './authStyle/register.css';

const RegisterPage = () => {
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [bio, setBio] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = {
            username: username,
            password: password,
            role: "USER",
            firstName: firstName,
            lastName: lastName,
            phoneNumber: phoneNumber,
            email: email,
            bio: bio,
            wishlist: []
        };
        // Registration
        try {
            const response = await fetch('http://localhost:8080/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                setMessage('Registration successful!');
            } else {
                setMessage('Registration failed!');
            }
        } catch (error) {
            console.error('Error:', error);
            setMessage('An error occurred. Please try again.');
        }
    };

    // Registration form
    return (
        <div className="register-container">
            <div className="register-form">
                <h1>Registration</h1>
                {message && <div className="alert alert-info">{message}</div>}
                <form onSubmit={handleSubmit}>
                    <input
                        type="email"
                        placeholder="Email"
                        className="register-input"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <input
                        type="text"
                        placeholder="Username"
                        className="register-input"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        className="register-input"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <input
                        type="text"
                        placeholder="First Name"
                        className="register-input"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        required
                    />
                    <input
                        type="text"
                        placeholder="Last Name"
                        className="register-input"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        required
                    />
                    <input
                        type="number"
                        placeholder="Phone Number"
                        className="register-input"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        required
                    />
                    <textarea
                        placeholder="Bio"
                        className="register-input"
                        value={bio}
                        onChange={(e) => setBio(e.target.value)}
                    />

                    <button type="submit" className="register-button">
                        Register
                    </button>
                    <div className="login-link">
                        <a href="/login">Back to Login</a>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default RegisterPage;
