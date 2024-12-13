import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const SearchBar = ({ setSearchQuery }) => {
    const [inputValue, setInputValue] = useState("");
    const navigate = useNavigate();

    const onSearch = (e) => {
        e.preventDefault();
        setSearchQuery(inputValue);
        navigate("/store/stock");
    };

    return (
        <form className="d-flex search-bar" onSubmit={onSearch}>
            <input
                type="text"
                className="form-control search-input"
                placeholder="Search by title"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
            />
            <button type="submit" className="btn search-button">
                Search
            </button>
        </form>
    );
};

export default SearchBar;
