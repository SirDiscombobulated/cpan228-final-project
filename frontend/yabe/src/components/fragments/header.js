import React from "react";
import { Link } from "react-router-dom";
import "./fragmentsStyle/header.css";
import yabeTLogo from "./fragmentsImages/yabet.png";
import SearchBar from "./searchbar";

const Header = ({ handleSearch }) => {
    return (
        <header className="header">
            <nav className="navbar navbar-expand-lg navbar-light">
                <div className="container d-flex align-items-center">
                    <Link className="navbar-brand" to="/store/home">
                        <div className="logo-wrapper">
                            <img src={yabeTLogo} alt="yabeT" className="logo" />
                        </div>
                    </Link>
                    <SearchBar setSearchQuery={handleSearch} />
                </div>
            </nav>
        </header>
    );
};

export default Header;
