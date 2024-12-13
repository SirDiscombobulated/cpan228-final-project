import React, { useState, useEffect } from 'react';
import './fragmentsStyle/featuredCarousel.css';
import electronicsImg from './carouselImages/computer.jpg';
import kitchenImg from './carouselImages/kitchen.jpg';
import clothingImg from './carouselImages/clothing.jpg';

const FeaturedCarousel = () => {
    const [items, setItems] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        // Dummy data for the carousel
        const fetchItems = () => [
            { id: 1, image: clothingImg },
            { id: 2, image: kitchenImg },
            { id: 3, image: electronicsImg },
        ];

        const data = fetchItems();
        setItems(data);
    }, []);

    // Interval for automated carousel image swap
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length);
        }, 3000);

        return () => clearInterval(interval);
    }, [items.length]);

    const handleNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length);
    };

    const handlePrev = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + items.length) % items.length);
    };

    return (
        <div className="carousel-container">
            {items.length > 0 && (
                <div className="carousel">
                    <div className="carousel-item" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
                        {items.map((item, index) => (
                            <div key={item.id} className="carousel-card">
                                <img
                                    src={item.image}
                                    alt={item.title}
                                    className="carousel-image"
                                />
                            </div>
                        ))}
                    </div>
                    <button className="carousel-control-prev" onClick={handlePrev}>
                        &#10094;
                    </button>
                    <button className="carousel-control-next" onClick={handleNext}>
                        &#10095;
                    </button>
                </div>
            )}
        </div>
    );
};

export default FeaturedCarousel;
