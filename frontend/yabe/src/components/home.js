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
                        </div>
                    </div>
                    <ItemList url="http://localhost:8080/api/items/featured" />
                </div>
            </div>
        </main>
    );
};

export default HomePage;
