import React from 'react';
import ItemList from './itemList';
import './styling/global.css';
import FeaturedCarousel from "./fragments/featuredCarousel";

const HomePage = ({ sName }) => {
    return (
        <main>
            <div className="content">
                <div className="container mt-5">
                    <div className="card welcome-card h-100 shadow-lg">
                        <div className="card-body text-center">
                            <h1 className="card-title">
                                Welcome to yabet!
                            </h1>
                            <FeaturedCarousel />
                            <a href="/store/stock/1" className="btn btn-primary btn-lg">
                                View Stock
                            </a>
                        </div>
                    </div>
                    <ItemList />
                </div>
            </div>
        </main>
    );
};

export default HomePage;
