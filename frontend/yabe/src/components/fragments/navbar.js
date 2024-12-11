import React from 'react';
import { Link } from 'react-router-dom';
import './fragmentsStyle/navbar.css';
const Header = () => {
    return (
        <nav className="navbar navbar-expand-lg">
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <div className="navbar-nav d-flex ms-auto">
                    <Link className="nav-link" to="/store/stock/1">Stock</Link>
                    <Link className="nav-link" to="/store/admin/">Admin</Link>
                    <Link className="nav-link" to="/store/admin/add-item">Add Items</Link>
                    <Link className="nav-link" to="/store/sweepstakes">Sweepstakes</Link>
                </div>
            </div>
        </nav>
    );
};

export default Header;
