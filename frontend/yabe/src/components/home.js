import React from 'react';
import '../App.css'; //

const HomePage = ({ sName }) => {
    return (
        <main>
            <div className="content">
                <div className="container mt-5">
                    <div className="card mx-auto" style={{ maxWidth: '600px' }}>
                        <div className="card-body">
                            <img
                                src="/css/images/logo2.PNG"
                                className="img-fluid"
                                alt="Store Logo"
                            />
                            <h5 className="card-title">
                                Welcome to {sName || 'Our Store'}!
                            </h5>
                            <p className="card-text">
                                Become a supervillain by stealing our food!
                            </p>
                            <a href="/store/menu/1" className="btn btn-primary">
                                Menu
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default HomePage;
