import React, { useState } from 'react';
import './authStyle/login.css';

const LoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:8080/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });

            if (response.ok) {
                setError(false);
                setMessage('Login successful');
                // Save token or handle session here
            } else {
                setError(true);
                setMessage('Invalid username or password');
            }
        } catch (err) {
            setError(true);
            setMessage('An error occurred. Please try again.');
        }
    };

    return (
        <div className="login-container">
            <div className="login-form">
                <h1 className="text-primary">Log In To Store</h1>

                {/* Login Form */}
                <form onSubmit={handleSubmit} className="d-flex flex-column align-items-center">
                    {/* Username Field */}
                    <div className="mb-3 w-100">
                        <input
                            type="text"
                            name="username"
                            placeholder="Username"
                            className="login-input"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>

                    {/* Password Field */}
                    <div className="mb-3 w-100">
                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            className="login-input"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    {/* Submit Button */}
                    <button type="submit" className="login-button">
                        Log in
                    </button>
                    {/* Message Display */}
                    {message && (
                        <div className={`alert ${error ? 'alert-danger' : 'alert-info'}`} role="alert">
                            {message}
                        </div>
                    )}

                    {/* Register Link */}
                    <div className="login-link">
                        <a href="/register">Register</a>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default LoginPage;
