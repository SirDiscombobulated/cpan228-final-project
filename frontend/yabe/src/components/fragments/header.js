import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./fragmentsStyle/header.css";
import yabeTLogo from "./yabet.png";

const Header = ({ handleSearch }) => {
    const [searchQuery, setSearchQuery] = useState("");
    const navigate = useNavigate();

    const onSearch = (e) => {
        e.preventDefault();
        handleSearch(searchQuery); // Pass the search query to the parent
        navigate("/store/stock"); // Redirect to the StockPage
    };

    return (
        <header className="header">
            <nav className="navbar navbar-expand-lg navbar-light">
                <div className="container d-flex align-items-center">
                    <form className="d-flex search-bar" onSubmit={onSearch}>
                        <Link className="navbar-brand" to="/store/home">
                            <div className="logo-wrapper">
                                <img src={yabeTLogo} alt="yabeT" className="logo" />
                            </div>
                        </Link>
                        <input
                            type="text"
                            className="form-control search-input"
                            placeholder="Search by title"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        <button type="submit" className="btn search-button">
                            Search
                            <i className="fas fa-search"></i>
                        </button>
                    </form>
                </div>
            </nav>
        </header>
    );
};

export default Header;
