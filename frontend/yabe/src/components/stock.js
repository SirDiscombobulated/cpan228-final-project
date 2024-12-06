import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Stock = () => {
    const [dishes, setDishes] = useState([]);
    const [success, setSuccess] = useState(null);
    const [fail, setFail] = useState(null);
    const [searchedCategory, setSearchedCategory] = useState('');
    const [searchedPrice, setSearchedPrice] = useState('');
    const [totalItems, setTotalItems] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [sortField, setSortField] = useState('id');
    const [sortDirection, setSortDirection] = useState('asc');

    useEffect(() => {
        const fetchDishes = async () => {
            try {
                const response = await axios.get(`/store/menu/${currentPage}`, {
                    params: {
                        searchedCategory,
                        searchedPrice,
                        sortField,
                        sortDirection
                    }
                });
                setDishes(response.data.dishes);
                setTotalItems(response.data.totalItems);
                setTotalPages(response.data.totalPages);
            } catch (error) {
                console.error(error);
            }
        };
        fetchDishes();
    }, [currentPage, searchedCategory, searchedPrice, sortField, sortDirection]);

    const handleSearch = (e) => {
        e.preventDefault();
        setCurrentPage(1);
    };

    const handleReset = () => {
        setSearchedCategory('');
        setSearchedPrice('');
        setCurrentPage(1);
    };

    const toggleSortDirection = () => {
        setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    };

    return (
        <main>
            <div className="content">
                {success && <div className="alert alert-success">{success}</div>}
                {fail && <div className="alert alert-danger">{fail}</div>}
                <h1>Stock</h1>
                <form onSubmit={handleSearch}>
                    <input
                        type="text"
                        value={searchedCategory}
                        onChange={(e) => setSearchedCategory(e.target.value)}
                        placeholder="Enter a category"
                    />
                    <input
                        type="number"
                        value={searchedPrice}
                        onChange={(e) => setSearchedPrice(e.target.value)}
                        placeholder="Enter a price"
                    />
                    <button type="submit" className="btn btn-primary">Filter</button>
                    <button type="button" onClick={handleReset} className="btn btn-primary">Reset</button>
                    <Link to="/store/add-dish" className="btn btn-danger">Add</Link>
                </form>
                <table className="table table-dark">
                    <thead>
                    <tr>
                        <th>
                            <a
                                href="#"
                                onClick={() => {
                                    setSortField('id');
                                    toggleSortDirection();
                                }}
                            >
                                ID
                            </a>
                        </th>
                        <th>
                            <a
                                href="#"
                                onClick={() => {
                                    setSortField('name');
                                    toggleSortDirection();
                                }}
                            >
                                NAME
                            </a>
                        </th>
                        <th>
                            <a
                                href="#"
                                onClick={() => {
                                    setSortField('category');
                                    toggleSortDirection();
                                }}
                            >
                                CATEGORY
                            </a>
                        </th>
                        <th>
                            <a
                                href="#"
                                onClick={() => {
                                    setSortField('price');
                                    toggleSortDirection();
                                }}
                            >
                                PRICE
                            </a>
                        </th>
                        <th colSpan="2">Operations</th>
                    </tr>
                    </thead>
                    <tbody>
                    {dishes.map((dish) => (
                        <tr key={dish.id}>
                            <th scope="row">{dish.id}</th>
                            <td>{dish.name}</td>
                            <td>{dish.category}</td>
                            <td>{dish.price}</td>
                            <td>
                                <Link to={`/store/delete/${dish.id}`} className="btn btn-danger btn-sm">
                                    Delete
                                </Link>
                            </td>
                            <td>
                                <Link to={`/store/update/${dish.id}`} className="btn btn-danger btn-sm">
                                    Update
                                </Link>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            {totalPages > 0 && (
                <div className="pagination">
                    <div className="pagination-info">
                        <div>Total Dishes: {totalItems}</div>
                        <div>Current Page: {currentPage}</div>
                        <div>Total Pages: {totalPages}</div>
                    </div>
                    <div className="pagination-no">
                        {Array.from({ length: totalPages }, (_, i) => (
                            <div key={i + 1}>
                                <a
                                    href="#"
                                    onClick={() => setCurrentPage(i + 1)}
                                    className={i + 1 === currentPage ? 'active' : ''}
                                >
                                    {i + 1}
                                </a>
                            </div>
                        ))}
                    </div>
                </div>
            )}

        </main>
    );
};

export default Stock;
