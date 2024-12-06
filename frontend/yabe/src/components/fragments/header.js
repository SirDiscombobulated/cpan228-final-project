import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <nav className="navbar navbar-expand-lg">
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item">
                        <Link className="nav-link" to="/store/home">Home</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/store/stock/1">Stock</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/store/admin/">Admin</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/login">Login</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/register">Register</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/store/add-item">Add Items</Link>
                    </li>

                </ul>
            </div>
        </nav>
    );
};

export default Header;
