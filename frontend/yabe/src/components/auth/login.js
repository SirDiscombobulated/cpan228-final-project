import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './authStyle/login.css';

const LoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState(false);
    const navigate = useNavigate();

    const checkBanStatus = async (username) => {
        try {
            const response = await fetch(`http://localhost:8080/isBanned/${username}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                const data = await response.text();
                console.log("Ban status response:", data); // Log the response for debugging
                return data === "User is banned!";
            }
            console.log("Ban status check failed, non-OK response");
            return false;
        } catch (err) {
            console.error('Error checking ban status:', err);
            return false;
        }
    };

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
                const isBanned = await checkBanStatus(username);
                console.log("Is user banned:", isBanned);

                if (isBanned) {
                    console.log('Redirecting to banned page...');
                    setError(true);
                    setMessage('User is banned. Redirecting to banned page...');
                    setTimeout(() => {
                        navigate('/banned');
                        window.location.reload();
                    }, 500);
                    return;
                }

                console.log('User is not banned, proceeding to homepage');
                setError(false);
                setMessage('Login successful');

                // Store credentials (username and password) in localStorage
                localStorage.setItem('username', username);
                localStorage.setItem('password', btoa(password));

                // Redirect to homepage
                setTimeout(() => {
                    navigate('/store/home');
                    window.location.reload(); // Refresh
                }, 500);

            } else {
                console.log('Invalid username or password');
                setError(true);
                setMessage('Invalid username or password');
            }
        } catch (err) {
            console.log('Error during login process:', err);
            setError(true);
            setMessage('An error occurred. Please try again.');
        }
    };

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
            </div>
        </div>
    );
};

export default LoginPage;
