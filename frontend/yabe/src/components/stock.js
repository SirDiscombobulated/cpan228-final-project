import React from "react";
import { Link } from "react-router-dom";
import Pagination from "./Pagination";

const StockPage = ({ items, loading, error }) => {
    const [currentPage, setCurrentPage] = React.useState(1);
    const itemsPerPage = 10;

    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentItems = items.slice(startIndex, startIndex + itemsPerPage);
    const totalPages = Math.ceil(items.length / itemsPerPage);

    const handlePageChange = (newPage) => {
        if (newPage > 0 && newPage <= totalPages) {
            setCurrentPage(newPage);
        }
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
                    <th>Title</th>
                    <th>Category</th>
                    <th>Price</th>
                    <th>Description</th>
                    <th>Created At</th>
                    <th>Status</th>
                </tr>
                </thead>
                <tbody>
                {currentItems.map((item) => (
                    <tr key={item._id}>
                        <td>
                            <Link to={`/item/${item._id}`}>{item.title || "N/A"}</Link>
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
