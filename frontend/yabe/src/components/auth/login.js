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

                // Store credentials (username and password) in localStorage
                localStorage.setItem('username', username);
                localStorage.setItem('password', btoa(password));

            } else {
                setError(true);
                setMessage('Invalid username or password');
            }
        } catch (err) {
            setError(true);
            setMessage('An error occurred. Please try again.');
        }
    };
    // Logout
    const handleLogout = () => {
        localStorage.removeItem('username');
        localStorage.removeItem('password');
        setMessage('Logged out successfully');
        setUsername('');
        setPassword('');
    };

    return (
        <div className="login-container">
            <div className="login-form">
                <h1 className="text-primary">Log In To Store</h1>

                {/* Login Form */}
                <form onSubmit={handleSubmit} className="d-flex flex-column align-items-center">
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

                    <button type="submit" className="login-button">
                        Log in
                    </button>

                    {message && (
                        <div className={`alert ${error ? 'alert-danger' : 'alert-info'}`} role="alert">
                            {message}
                        </div>
                    )}

                    <div className="login-link">
                        <a href="/register">Register</a>
                    </div>
                </form>

                {/* Logout Button */}
                <button onClick={handleLogout} className="logout-button">
                    Log out
                </button>
            </div>
        </div>
    );
};

export default LoginPage;
