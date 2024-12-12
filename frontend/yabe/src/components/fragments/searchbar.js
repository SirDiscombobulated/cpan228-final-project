import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const SearchBar = ({ handleSearch }) => {
    const [searchQuery, setSearchQuery] = useState(""); // Proper use of hooks within the component
    const navigate = useNavigate();

    const onSearch = (e) => {
        e.preventDefault(); // Prevent default form submission
        handleSearch(searchQuery); // Pass the search query to App.js
        navigate("/store/stock"); // Redirect to the StockPage
    };

    return (
        <form className="d-flex search-bar" onSubmit={onSearch}>
            <input
                type="text"
                className="form-control search-input"
                placeholder="Search by title"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button type="submit" className="btn search-button">Search</button>
        </form>
    );
};

export default SearchBar;
