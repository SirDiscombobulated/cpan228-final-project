import React, { useEffect, useState } from 'react';
import { fetchData } from './auth/auth';
const ItemList = () => {
    const [items, setItems] = useState([]);

    useEffect(() => {
        fetchData('http://localhost:8080/store/api/items')
            .then(data => {
                if (data) setItems(data);
            })
            .catch(error => {
                console.error('There was an error fetching the items!', error);
            });
    }, []);

    return (
        <div className="items-list mt-5">
            <h2>Available Items</h2>
            <ul className="list-group">
                {items.map(item => (
                    <li key={item.id} className="list-group-item">
                        <h3>{item.title}</h3>
                        <p>Category: {item.category}</p>
                        <p>Description: {item.description}</p>
                        <p>Price: ${item.price.toFixed(2)}</p>
                        <p>Status: {item.status}</p>
                        <p>Created At: {new Date(item.createdAt).toLocaleString()}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ItemList;
