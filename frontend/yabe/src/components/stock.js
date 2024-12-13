import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Pagination from "./Pagination";
import { getAuthHeader } from "./auth/auth"; // Import the getAuthHeader function
import "./styling/global.css";
import "./styling/stock.css";

const StockPage = ({ searchQuery }) => {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;
    const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });

    const fetchItems = async (query = "") => {
        try {
            setLoading(true);
            const url = query
                ? `http://localhost:8080/api/items/filter/${query}`
                : "http://localhost:8080/api/items";
            const response = await fetch(url, {
                method: "GET",
                headers: getAuthHeader(), // Use the getAuthHeader function
            });
            if (!response.ok) {
                throw new Error(`Failed to fetch items. Status: ${response.status}`);
            }
            const data = await response.json();
            setItems(data);
            setError(null);
        } catch (err) {
            console.error("Error fetching items:", err);
            setError("Failed to load items. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchItems(searchQuery); // Fetch items whenever the search query changes
    }, [searchQuery]);

    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentItems = items.slice(startIndex, startIndex + itemsPerPage);
    const totalPages = Math.ceil(items.length / itemsPerPage);

    const handlePageChange = (newPage) => {
        if (newPage > 0 && newPage <= totalPages) {
            setCurrentPage(newPage);
        }
    };

    const sortItems = (key) => {
        let direction = "asc";
        if (sortConfig.key === key && sortConfig.direction === "asc") {
            direction = "desc";
        }
        setSortConfig({ key, direction });

        items.sort((a, b) => {
            if (key === "createdAt") {
                const dateA = new Date(a[key]);
                const dateB = new Date(b[key]);
                return direction === "asc" ? dateA - dateB : dateB - dateA;
            } else {
                if (a[key] < b[key]) {
                    return direction === "asc" ? -1 : 1;
                }
                if (a[key] > b[key]) {
                    return direction === "asc" ? 1 : -1;
                }
                return 0;
            }
        });
    };

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div>
            <h1>Stock Items</h1>
            <table>
                <thead>
                <tr>
                    <th onClick={() => sortItems("title")}>
                        Title {sortConfig.key === "title" ? (sortConfig.direction === "asc" ? "↑" : "↓") : ""}
                    </th>
                    <th onClick={() => sortItems("category")}>
                        Category {sortConfig.key === "category" ? (sortConfig.direction === "asc" ? "↑" : "↓") : ""}
                    </th>
                    <th onClick={() => sortItems("price")}>
                        Price {sortConfig.key === "price" ? (sortConfig.direction === "asc" ? "↑" : "↓") : ""}
                    </th>
                    <th>Description</th>
                    <th onClick={() => sortItems("createdAt")}>
                        Created At {sortConfig.key === "createdAt" ? (sortConfig.direction === "asc" ? "↑" : "↓") : ""}
                    </th>
                    <th onClick={() => sortItems("interested")}>
                        Interested {sortConfig.key === "interested" ? (sortConfig.direction === "asc" ? "↑" : "↓") : ""}
                    </th>
                </tr>
                </thead>
                <tbody>
                {currentItems.map((item) => (
                    <tr key={item._id}>
                        <td>
                            <Link to={`/item/${item._id}`} className="stock-item-link">
                                {item.title || "N/A"}
                            </Link>
                        </td>
                        <td>{item.category || "N/A"}</td>
                        <td>${item.price ? item.price.toFixed(2) : "0.00"}</td>
                        <td>{item.description || "No description available"}</td>
                        <td>{item.createdAt ? new Date(item.createdAt).toLocaleString() : "Unknown"}</td>
                        <td>{item.interested.length || 0}</td>
                    </tr>
                ))}
                </tbody>
            </table>
            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
            />
        </div>
    );
};

export default StockPage;