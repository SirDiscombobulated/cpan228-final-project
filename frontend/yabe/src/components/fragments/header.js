import React from 'react';
import { Link } from 'react-router-dom';
import './fragmentsStyle/header.css';
import yabeTLogo from './fragmentsImages/yabet.png';

const Header = () => {
    return (
        <header className="header">
            <nav className="navbar navbar-expand-lg navbar-light">
                <div className="container d-flex align-items-center">


                    <form className="d-flex search-bar">
                        <Link className="navbar-brand" to="/store/home">
                            <div className="logo-wrapper">
                                <img src={yabeTLogo} alt="yabeT" className="logo"/>
                            </div>
                        </Link>
                        <input
                            type="text"
                            className="form-control search-input"
                            placeholder="Search for products, brands, and more"
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
