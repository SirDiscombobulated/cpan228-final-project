import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

const UpdateItemPage = () => {
    const { username, itemId } = useParams(); // Extract parameters from URL
    const [itemDetails, setItemDetails] = useState({
        title: '',
        category: '',
        price: '',
        description: '',
    });
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setItemDetails({
            ...itemDetails,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const url = `http://localhost:8080/api/items/${username}/${itemId}`;
        const headers = {
            'Authorization': `Basic ${btoa(`${localStorage.getItem('username')}:${localStorage.getItem('password')}`)}`,
            'Content-Type': 'application/json',
        };

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers,
                body: JSON.stringify(itemDetails),
            });

            if (response.ok) {
                setSuccessMessage('Item updated successfully!');
                setErrorMessage('');
            } else {
                setErrorMessage('Failed to update item. Please try again.');
                setSuccessMessage('');
            }
        } catch (error) {
            console.error('Error updating item:', error);
            setErrorMessage('An error occurred. Please try again later.');
            setSuccessMessage('');
        }
    };

    return (
        <div>
            <h1>Update Item</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Title:</label>
                    <input
                        type="text"
                        name="title"
                        value={itemDetails.title}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div>
                    <label>Category:</label>
                    <input
                        type="text"
                        name="category"
                        value={itemDetails.category}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div>
                    <label>Price:</label>
                    <input
                        type="number"
                        name="price"
                        value={itemDetails.price}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div>
                    <label>Description:</label>
                    <textarea
                        name="description"
                        value={itemDetails.description}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <button type="submit">Update Item</button>
            </form>
            {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
        </div>
    );
};

export default UpdateItemPage;
