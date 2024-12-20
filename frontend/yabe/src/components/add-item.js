import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { getAuthHeader } from './auth/auth';
import "./styling/add-item.css";

const AddItemPage = ({ itemId }) => {
    const [item, setItem] = useState({
        title: '',
        category: '',
        price: 0,
        description: '',
        createdAt: '',
        status: 'Available',
        ownerId: '',
        interested: [] // Ensure this is part of the initial state
    });
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null); // State for success message

    // Fetch the item if it's an update
    useEffect(() => {
        if (itemId) {
            axios.get(`http://localhost:8080/api/items/${itemId}`, { headers: getAuthHeader() })
                .then(response => {
                    const fetchedItem = response.data;
                    setItem({
                        ...fetchedItem,
                        createdAt: fetchedItem.createdAt?.$date || fetchedItem.createdAt,
                        interested: fetchedItem.interested || [] // Ensure the interested array is set
                    });
                })
                .catch(err => {
                    setError('Failed to load item details');
                });
        }
    }, [itemId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setItem((prevItem) => ({
            ...prevItem,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const endpoint = item.id ? `http://localhost:8080/api/items/${item.id}` : 'http://localhost:8080/api/items';
        const method = item.id ? 'PUT' : 'POST';
        const username = localStorage.getItem('username'); // Get the username from localStorage

        const itemData = {
            ...item,
            status: 'Available',
            ownerId: username,
            interested: item.interested // Ensure the array is included in the data sent to the backend
        };

        axios({
            method: method,
            url: endpoint,
            headers: getAuthHeader(),
            data: itemData
        })
            .then(response => {
                console.log('New Item ID:', response.data);
                setSuccess('Item saved successfully!'); // Set success message
                setError(null); // Clear any previous error message
            })
            .catch(error => {
                const message = error.response && error.response.data ? error.response.data : 'Failed to save item';
                setError(message);
                setSuccess(null); // Clear any previous success message
            });
    };

    return (
        <main>
            <header>
            </header>
            <div className="content">
                {error && <div className="alert alert-danger">{error}</div>}
                {success && <div className="alert alert-success">{success}</div>} {/* Display success message */}
                <h1>{item.id ? 'Update Item' : 'Add Item'}</h1>
                <form onSubmit={handleSubmit}>
                    <input type="hidden" name="id" value={item.id} />
                    <div>
                        <label>Title:
                            <input
                                type="text"
                                name="title"
                                value={item.title}
                                onChange={handleChange}
                            />
                        </label>
                    </div>
                    <div>
                        <label>Category:
                            <input
                                type="text"
                                name="category"
                                value={item.category}
                                onChange={handleChange}
                            />
                        </label>
                    </div>
                    <div>
                        <label>Price: $
                            <input
                                type="number"
                                name="price"
                                value={item.price}
                                onChange={handleChange}
                            />
                        </label>
                    </div>
                    <div>
                        <label>Description:
                            <textarea
                                name="description"
                                value={item.description}
                                onChange={handleChange}
                            />
                        </label>
                    </div>
                    <div>
                        <label>Created At:
                            <input
                                type="datetime-local"
                                name="createdAt"
                                value={item.createdAt}
                                onChange={handleChange}
                            />
                        </label>
                    </div>
                    <button type="submit" className="btn btn-primary">
                        {item.id ? 'Update' : 'Add'}
                    </button>
                </form>
            </div>
        </main>
    );
};

export default AddItemPage;
