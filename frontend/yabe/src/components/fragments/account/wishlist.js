import React, { useState, useEffect } from 'react';
import { fetchData, sendData } from '../../auth/auth';

function Wishlist() {
    const [wishlist, setWishlist] = useState([]);
    const [error, setError] = useState(false);
    const username = localStorage.getItem('username');

    useEffect(() => {
        const fetchWishlist = async () => {
            if (!username) {
                setError(true);
                return;
            }

            try {
                const data = await fetchData(`http://localhost:8080/api/users/${username}`);
                if (data && data.wishlist && Array.isArray(data.wishlist)) {
                    setWishlist(data.wishlist); // Assuming the wishlist is stored in the "wishlist" field
                } else {
                    setError(true);
                }
            } catch (err) {
                console.error('Error fetching wishlist:', err);
                setError(true);
            }
        };

        fetchWishlist();
    }, [username]);

    const removeItem = async (itemId) => {
        if (!username) {
            setError(true);
            return;
        }

        try {
            const response = await sendData(`http://localhost:8080/api/wishlist/remove/${username}/${itemId}`, {});
            if (response) {
                setWishlist((prev) => prev.filter((item) => item._id !== itemId));
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
                    wishlist.map((item) => (
                        <li key={item._id}>
                            <strong>{item.title}</strong> - ${item.price.toFixed(2)}
                            <button onClick={() => removeItem(item._id)}>Remove</button>
                        </li>
                    ))
                ) : (
                    <li>No items in wishlist</li>
                )}
            </ul>
        </div>
    );
}

export default Wishlist;
