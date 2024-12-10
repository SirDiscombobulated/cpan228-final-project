
import React, { useState } from 'react';

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
        <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh'}}>
            <div className="main bg-white p-4 shadow rounded" style={{ width: '100%', maxWidth: '400px' }}>
                <h1 className="text-primary">Log In To Store</h1>

                {/* Message Display */}
                {message && (
                    <div className={`alert ${error ? 'alert-danger' : 'alert-info'}`} role="alert">
                        {message}
                    </div>
                )}

                {/* Login Form */}
                <form onSubmit={handleSubmit} className="d-flex flex-column align-items-center">
                    {/* Username Field */}
                    <div className="mb-3 w-100">
                        <input
                            type="text"
                            name="username"
                            placeholder="Username"
                            className="form-control"
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
                            className="form-control"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    {/* Submit Button */}
                    <button type="submit" className="btn btn-primary w-100">
                        Log in
                    </button>

                    {/* Register Link */}
                    <div className="alert">
                        <a className="nav-link" href="/register">
                            Register
                        </a>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default LoginPage;
