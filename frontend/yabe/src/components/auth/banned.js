import React from 'react';
import './authStyle/banned.css';
import middleFinger from './authImages/middle-finger.png';

const BannedPage = () => {
    return (
        <div className="banned-container">
            <div className="banned-content">
                <img src={middleFinger} alt="Banned" className="banned-image" />
                <h1 className="banned-message">You have been banned.</h1>
                <p className="banned-description">
                    If you believe this is a mistake, please contact support for further assistance.
                </p>
            </div>
        </div>
    );
};

export default BannedPage;
