import React, { useState } from 'react';

const InterestedButton = ({ isInterested, username, itemId }) => {
    const [interested, setInterested] = useState(isInterested);

    // Function to allow user to add item to interested/wishlist
    const toggleInterest = async () => {
        const url = `http://localhost:8080/api/wishlist/${interested ? 'remove' : 'add'}/${username}/${itemId}`;
        const method = 'PUT';
        const headers = {
            'Authorization': `Basic ${btoa(`${localStorage.getItem('username')}:${atob(localStorage.getItem('password'))}`)}`,
            'Content-Type': 'application/json',
        };

        try {
            const response = await fetch(url, { method, headers });
            if (response.ok) {
                setInterested(!interested);
            } else {
                console.error('Failed to update interest status');
            }
        } catch (error) {
            console.error('Error updating interest status:', error);
        }
    };

    return (
        <button
            className={`btn mt-3 ${interested ? 'btn-danger' : 'btn-primary'}`}
            onClick={toggleInterest}
        >
            {interested ? 'Remove from Wishlist' : 'Add to Wishlist'}
        </button>
    );
};

export default InterestedButton;
