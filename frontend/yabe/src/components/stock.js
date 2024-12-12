import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Pagination from "./Pagination";

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
                ? `http://localhost:8080/store/api/filter/${query}`
                : "http://localhost:8080/store/api/featured";
            const response = await fetch(url, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Basic " + btoa("admin:12345"), // Replace with your credentials
                },
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
            if (a[key] < b[key]) {
                return direction === "asc" ? -1 : 1;
            }
            if (a[key] > b[key]) {
                return direction === "asc" ? 1 : -1;
            }
            return 0;
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
            <table border="1" style={{ width: "100%", textAlign: "left" }}>
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
                    <th>Created At</th>
                    <th onClick={() => sortItems("status")}>
                        Status {sortConfig.key === "status" ? (sortConfig.direction === "asc" ? "↑" : "↓") : ""}
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
                        <td>{item.status || "Unknown"}</td>
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
