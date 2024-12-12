import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const ItemDetail = () => {
    const { id } = useParams(); // Ensure this is correctly pulling the 'id' from the route
    const [item, setItem] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!id) {
            setError("No item ID provided.");
            setLoading(false);
            return;
        }

        const fetchItem = async () => {
            try {
                setLoading(true);
                const response = await axios.get(`http://localhost:8080/store/api/items/${id}`, {
                    headers: {
                        "Authorization": "Basic " + btoa("admin:12345"), // Add your credentials here
                        "Content-Type": "application/json",
                    },
                });
                setItem(response.data);
                setError(null);
            } catch (err) {
                console.error("Error fetching item:", err);
                if (err.response && err.response.status === 404) {
                    setError("Item not found.");
                } else if (err.response && err.response.status === 401) {
                    setError("Unauthorized access. Please check your credentials.");
                } else {
                    setError("Failed to load item details. Please try again later.");
                }
            } finally {
                setLoading(false);
            }
        };

        fetchItem();
    }, [id]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div>
            <h1>{item.title}</h1>
            <p>{item.description}</p>
            <p>Price: ${item.price.toFixed(2)}</p>
            <p>Category: {item.category}</p>
            <p>Status: {item.status}</p>
            <p>Created At: {new Date(item.createdAt).toLocaleString()}</p>
        </div>
    );
};

export default ItemDetail;
