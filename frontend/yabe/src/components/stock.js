import React, { useEffect, useState } from "react";
import axios from "axios";

const Stock = () => {
    const [items, setItems] = useState([]); // State to store items
    const [error, setError] = useState(null); // State for error handling

    useEffect(() => {
        // Fetch items from the backend
        axios
            .get("http://localhost:8080/store/api/items") // API endpoint
            .then((response) => {
                setItems(response.data); // Set the items to state
            })
            .catch((error) => {
                console.error("Error fetching items:", error);
                setError("Unable to fetch items. Please try again later.");
            });
    }, []); // Empty dependency array ensures it runs only once

    return (
        <div className="container">
            <h1>Stock</h1>
            {error && <div className="alert alert-danger">{error}</div>}
            {!error && items.length === 0 && <p>Loading items...</p>}
            {items.length > 0 && (
                <table className="table">
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>Title</th>
                        <th>Category</th>
                        <th>Price</th>
                        <th>Description</th>
                        <th>Status</th>
                        <th>Created At</th>
                    </tr>
                    </thead>
                    <tbody>
                    {items.map((item) => (
                        <tr key={item.id}>
                            <td>{item.id}</td>
                            <td>{item.title}</td>
                            <td>{item.category}</td>
                            <td>${item.price.toFixed(2)}</td>
                            <td>{item.description}</td>
                            <td>{item.status}</td>
                            <td>{new Date(item.createdAt).toLocaleString()}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default Stock;
