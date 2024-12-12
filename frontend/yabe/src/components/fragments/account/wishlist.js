import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Wishlist = () => {
    const [items, setItems] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchWishlistItems = async () => {
            try {
                const response = await axios.get('/store/api/wishlist');
                setItems(response.data);
            } catch (err) {
                setError('Failed to fetch wishlist items');
            }
        };

        fetchWishlistItems();
    }, []);

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div>
            <h2>My Wishlist</h2>
            <ul>
                {items.map((item) => (
                    <li key={item.id}>
                        <h3>{item.title}</h3>
                        <p>Category: {item.category}</p>
                        <p>Price: ${item.price.toFixed(2)}</p>
                        <p>{item.description}</p>
                        <p>Created At: {new Date(item.createdAt).toLocaleString()}</p>
                        <p>Status: {item.status}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Wishlist;
