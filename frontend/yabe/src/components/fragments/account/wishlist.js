import React, { useEffect, useState } from 'react';
import { getAuthHeader } from '../../auth/auth';
import './accountStyle/wishlist.css';
import ItemCard from '../../itemCard';

function Wishlist() {
    const [wishlistItems, setWishlistItems] = useState([]);
    const [error, setError] = useState(false);
    const username = localStorage.getItem('username');

    useEffect(() => {
        const fetchWishlistItems = async () => {
            const authHeader = getAuthHeader();

            if (!username) {
                setError(true);
                return;
            }

            try {
                const userResponse = await fetch(`http://localhost:8080/api/users/${username}`, {
                    method: 'GET',
                    headers: authHeader,
                });

                if (userResponse.ok) {
                    const userData = await userResponse.json();
                    const items = await Promise.all(userData.wishlist.map(async (itemId) => {
                        const itemResponse = await fetch(`http://localhost:8080/api/items/${itemId}`, {
                            method: 'GET',
                            headers: authHeader,
                        });

                        if (itemResponse.ok) {
                            return await itemResponse.json();
                        } else {
                            console.error('Error fetching item data:', itemResponse.statusText);
                            return null;
                        }
                    }));
                    setWishlistItems(items.filter(item => item !== null));
                } else {
                    setError(true);
                }
            } catch (err) {
                console.error('Error fetching wishlist items:', err);
                setError(true);
            }
        };

        fetchWishlistItems();
    }, [username]);

    if (error) {
        return <div>Error loading wishlist. Please try again later.</div>;
    }

    if (!wishlistItems.length) {
        return <div>Loading...</div>;
    }

    return (
        <div className="wishlist-page">
            <div className="wishlist-card">
                <h1>Wishlist</h1>
                <div className="row">
                    {wishlistItems.map(item => (
                        <div key={item.id} className="col-md-3 mb-4">
                            <ItemCard item={item} username={username} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Wishlist;
