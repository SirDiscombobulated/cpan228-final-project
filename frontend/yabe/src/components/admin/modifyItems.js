import React, { useState } from 'react';
import axios from 'axios';
import { getAuthHeader } from '../auth/auth';

const UpdateItemForm = () => {
    const [item, setItem] = useState({
        title: '',
        category: '',
        price: '',
        description: '',
        createdAt: '',
        status: '',
        ownerId: '',
    });

    const [itemId, setItemId] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setItem((prevItem) => ({
            ...prevItem,
            [name]: value,
        }));
    };

    const handleItemIdChange = (e) => {
        setItemId(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const url = `http://localhost:8080/api/items/${item.ownerId}/${itemId}`;

        try {
            const response = await axios.put(
                url,
                item,
                {
                    headers: getAuthHeader(),
                }
            );
            console.log('Item updated successfully:', response.data);
        } catch (error) {
            console.error('Error updating item:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                name="title"
                placeholder="Title"
                value={item.title}
                onChange={handleChange}
            />
            <input
                type="text"
                name="category"
                placeholder="Category"
                value={item.category}
                onChange={handleChange}
            />
            <input
                type="number"
                name="price"
                placeholder="Price"
                value={item.price}
                onChange={handleChange}
            />
            <textarea
                name="description"
                placeholder="Description"
                value={item.description}
                onChange={handleChange}
            />
            <input
                type="datetime-local"
                name="createdAt"
                value={item.createdAt}
                onChange={handleChange}
            />
            <input
                type="text"
                name="status"
                placeholder="Status"
                value={item.status}
                onChange={handleChange}
            />
            <input
                type="text"
                name="ownerId"
                placeholder="Owner ID"
                value={item.ownerId}
                onChange={handleChange}
            />
            <input
                type="text"
                name="itemId"
                placeholder="Item ID"
                value={itemId}
                onChange={handleItemIdChange}
            />
            <button type="submit">Update Item</button>
        </form>
    );
};

export default UpdateItemForm;
