import React, { useEffect, useState } from 'react';
import { fetchData } from './auth/auth';
import './styling/itemList.css';
import electronicsImg from './icons/electronics.png';
import kitchenImg from './icons/kitchen.png';
import clothingImg from './icons/clothing.png';
import InterestedButton from './interestedButton';

const ItemList = () => {
    const [items, setItems] = useState([]);
    const username = localStorage.getItem('username'); // Get current username

    useEffect(() => {
        fetchData('http://localhost:8080/api/items/featured')
            .then(data => {
                if (data) setItems(data);
            })
            .catch(error => {
                console.error('There was an error fetching the items!', error);
            });
    }, []);

    // Helper function to get the image based on category
    const getCategoryImage = (category) => {
        switch (category) {
            case 'Electronics':
                return electronicsImg;
            case 'Home & Kitchen':
                return kitchenImg;
            case 'Clothing & Apparel':
                return clothingImg;
            default:
                return null;
        }
    };

    return (
        <div className="items-list mt-5">
            <center><h2>FEATURED</h2></center>
            <div className="row">
                {items.map(item => (
                    <div key={item.id} className="col-md-3 mb-4">
                        <div className="card h-100">
                            <img src={getCategoryImage(item.category)} className="card-img-top" alt={item.category} />
                            <div className="card-body">
                                <h3 className="card-title">{item.title}</h3>
                                <p className="card-text"><strong>Category: </strong>{item.category}</p>
                                <p className="card-text"><strong>Description: </strong>{item.description}</p>
                                <p className="card-text"><strong>Price: </strong>${item.price.toFixed(2)}</p>
                                <p className="card-text"><strong>Status: </strong>{item.status}</p>
                                <p className="card-text"><strong>Created At: </strong>{new Date(item.createdAt).toLocaleString()}</p>
                                <InterestedButton
                                    isInterested={item.interested.includes(username)}
                                    username={username}
                                    itemId={item.id}
                                />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ItemList;
