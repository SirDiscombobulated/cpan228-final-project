import React from 'react';
import ItemList from './itemList';
import '../App.css';

const HomePage = ({ sName }) => {
    return (
        <main>
            <div className="content">
                <div className="container mt-5">
                    <div className="card mx-auto" style={{ maxWidth: '600px' }}>
                        <div className="card-body">
                            <img
                                src=""
                                className="img-fluid"
                                alt="Store Logo"
                            />
                            <h5 className="card-title">
                                Welcome to {sName || 'Our Store'}!
                            </h5>
                            <p className="card-text">
                                Become a supervillain by stealing our food!
                            </p>
                            <a href="/store/stock/1" className="btn btn-primary">
                                Stock
                            </a>
                        </div>
                    </div>
                    <ItemList /> {/* Use the ItemList component */}
                </div>
            </div>
        </main>
    );
};

export default HomePage;
