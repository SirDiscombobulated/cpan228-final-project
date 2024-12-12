import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const ItemDetail = () => {
    const { id } = useParams(); // Retrieve the ID from URL
    const [item, setItem] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchItem = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/store/api/items/${id}`);
                setItem(response.data);
            } catch (err) {
                console.error("Error fetching item:", err);
                setError("Failed to load item details. Please try again.");
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
            <p>Price: ${item.price}</p>
            <p>Category: {item.category}</p>
            <p>Status: {item.status}</p>
            <p>Created At: {new Date(item.createdAt).toLocaleString()}</p>
        </div>
    );
};

export default ItemDetail;
