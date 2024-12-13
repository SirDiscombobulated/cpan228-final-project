// ItemCard.js
import React from 'react';
import InterestedButton from './interestedButton';
import electronicsImg from './icons/electronics.png';
import kitchenImg from './icons/kitchen.png';
import clothingImg from './icons/clothing.png';

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

const ItemCard = ({ item, username }) => (
    <div className="card h-100">
        <img src={getCategoryImage(item.category)} className="card-img-top" alt={item.category} />
        <div className="card-body">
            <h3 className="card-title">{item.title}</h3>
            <p className="card-text"><strong>Category: </strong>{item.category}</p>
            <p className="card-text"><strong>Description: </strong>{item.description}</p>
            <p className="card-text"><strong>Price: </strong>${item.price.toFixed(2)}</p>
            <p className="card-text"><strong>Status: </strong>{item.status}</p>
            <p className="card-text"><strong>Created At: </strong>{new Date(item.createdAt).toLocaleString()}</p>
            {item.interested && <InterestedButton isInterested={item.interested.includes(username)} username={username} itemId={item.id} />}
        </div>
    </div>
);

export default ItemCard;
