//app-item.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AddItemPage = ({ itemId }) => {
    const [item, setItem] = useState({
        title: '',
        category: '',
        price: 0,
        description: '',
        createdAt: '',
        status: 'Available',
        ownerId: '',
        interested: []
    });
    const [error, setError] = useState(null);

    // Fetch the item if it's an update
    useEffect(() => {
        if (itemId) {
            // Assuming there's an API endpoint to fetch the item by id
            axios.get(`http://localhost:8080/store/api/items/${itemId}`)
                .then(response => {
                    setItem(response.data);
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
        const endpoint = item.id ? `http://localhost:8080/store/api/items/${item.id}` : 'http://localhost:8080/store/api/items';
        const method = item.id ? 'put' : 'post';

        axios({
            method: method,
            url: endpoint,
            data: item
        })
            .then(response => {
                window.location.href = '/store/items'; // Redirect to items list page
            })
            .catch(err => {
                setError('Failed to save item');
            });
    };

    return (
        <main>
            <header>
                {/* Include your header component here */}
            </header>
            <div className="content">
                {error && <div className="alert alert-danger">{error}</div>}
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
                    <div>
                        <label>Status:
                            <input
                                type="text"
                                name="status"
                                value={item.status}
                                onChange={handleChange}
                            />
                        </label>
                    </div>
                    <div>
                        <label>Owner ID:
                            <input
                                type="text"
                                name="ownerId"
                                value={item.ownerId}
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
