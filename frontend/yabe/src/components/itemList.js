// itemList.js
import React, { useEffect, useState } from 'react';
import { fetchData } from './auth/auth';
import './styling/itemList.css';
import ItemCard from './itemCard';

const ItemList = ({ url }) => {
    const [items, setItems] = useState([]);
    const username = localStorage.getItem('username'); // Get current username

    useEffect(() => {
        fetchData(url)
            .then(data => {
                if (data) setItems(data);
            })
            .catch(error => {
                console.error('There was an error fetching the items!', error);
            });
    }, [url]);

    return (
        <div className="items-list mt-5">
            <center><h2>FEATURED</h2></center>
            <div className="row">
                {items.map(item => (
                    <div key={item.id} className="col-md-3 mb-4">
                        <ItemCard item={item} username={username} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ItemList;
