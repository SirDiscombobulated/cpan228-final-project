import React, { useState, useEffect } from "react";
import axiosInstance from "../axiosConfig";

const Stock = () => {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        axiosInstance.get("/store/api/items")
            .then(response => {
                setItems(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error("Error fetching items:", error);
                setError("Failed to fetch items. Please try again later.");
                setLoading(false);
            });
    }, []);

    if (loading) return <p>Loading items...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="container mt-5">
            <h1 className="text-center">Stock Items</h1>
            <table className="table table-striped">
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
                {items.map(item => (
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
        </div>
    );
};

export default Stock;
