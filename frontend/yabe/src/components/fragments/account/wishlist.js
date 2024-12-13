import React, { useState, useEffect } from 'react';
import {fetchData, sendData } from '../../auth/auth';

function Wishlist() {
    const [wishlist, setWishlist] = useState([]);
    const [item, setItem] = useState('');
    const [error, setError] = useState(false);

    useEffect(() => {
        const fetchWishlist = async () => {
            const username = localStorage.getItem('username');
            if (!username) {
                setError(true);
                return;
            }

            try {
                const data = await fetchData(`http://localhost:8080/api/users/${username}`);
                if (data && Array.isArray(data)) {
                    setWishlist(data);
                } else {
                    setError(true);
                }
            } catch (err) {
                console.error('Error fetching wishlist:', err);
                setError(true);
            }
        };

        fetchWishlist();
    }, []);

    const addItem = async () => {
        const username = localStorage.getItem('username');
        if (!username || !item) {
            setError(true);
            return;
        }

        try {
            const response = await sendData(`http://localhost:8080/api/users/${username}`, { item });
            if (response) {
                setWishlist([...wishlist, item]);
                setItem('');
            } else {
                setError(true);
            }
        } catch (err) {
            console.error('Error adding item:', err);
            setError(true);
        }
    };

    const removeItem = async (itemToRemove) => {
        const username = localStorage.getItem('username');
        if (!username) {
            setError(true);
            return;
        }

        try {
            const response = await sendData(`http://localhost:8080/api/users/${username}`, { item: itemToRemove });
            if (response) {
                setWishlist(wishlist.filter(wishlistItem => wishlistItem !== itemToRemove));
            } else {
                setError(true);
            }
        } catch (err) {
            console.error('Error removing item:', err);
            setError(true);
        }
    };

    if (error) {
        return <div>Error loading wishlist. Please try again later.</div>;
    }

    return (
        <div className="wishlist-page">
            <h2>Your Wishlist</h2>
            <ul>
                {wishlist.length > 0 ? (
                    wishlist.map((wishlistItem, index) => (
                        <li key={index}>
                            {wishlistItem}
                            <button onClick={() => removeItem(wishlistItem)}>Remove</button>
                        </li>
                    ))
                ) : (
                    <li>No items in wishlist</li>
                )}
            </ul>
            <div>
                <input
                    type="text"
                    value={item}
                    onChange={(e) => setItem(e.target.value)}
                    placeholder="Add new item"
                />
                <button onClick={addItem}>Add</button>
            </div>
        </div>
    );
}

export default Wishlist;