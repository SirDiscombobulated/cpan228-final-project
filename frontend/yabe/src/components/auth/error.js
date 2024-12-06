import React from 'react';

const Error403 = () => {
    return (
        <div className="main" style={{ textAlign: 'center', padding: '50px' }}>
            <div className="error-container">
                <img
                    src="https://i.imgur.com/U3vTGjX.png"
                    alt="Error 403 Image"
                    width="100px"
                />
                <h1 className="error-heading">403 - Unauthorized Access!</h1>
                <p className="error-message">
                    You are not authorized to view this page.
                </p>
                <a href="/store/home" className="btn btn-primary">
                    Go to the Landing Page!
                </a>
            </div>
        </div>
    );
};

export default Error403;
