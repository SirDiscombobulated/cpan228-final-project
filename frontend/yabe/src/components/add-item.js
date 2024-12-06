import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AddItemPage = ({ itemId }) => {
    const [item, setItem] = useState({
        id: '',
        name: '',
        category: '',
        price: ''
    });
    const [error, setError] = useState(null);

    // Fetch the item if it's an update
    useEffect(() => {
        if (itemId) {
            // Assuming there's an API endpoint to fetch the item by id
            axios.get(`/api/items/${itemId}`)
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
        const endpoint = item.id ? `/api/items/${item.id}` : '/api/items';
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
                        <label>Name:
                            <input
                                type="text"
                                name="name"
                                value={item.name}
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
                    <button type="submit" className="btn btn-primary">
                        {item.id ? 'Update' : 'Add'}
                    </button>
                </form>
            </div>
        </main>
    );
};

export default AddItemPage;
