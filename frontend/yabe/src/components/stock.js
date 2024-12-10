import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Stock = () => {
    const [items, setItems] = useState([]);
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
        const fetchItems = async () => {
            try {
                const response = await axios.get(`/store/api/items/${currentPage}`, {
                    params: {
                        searchedCategory,
                        searchedPrice,
                        sortField,
                        sortDirection
                    }
                });
                setItems(response.data.items);
                setTotalItems(response.data.totalItems);
                setTotalPages(response.data.totalPages);
            } catch (error) {
                console.error(error);
            }
        };
        fetchItems();
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
                    <Link to="/store/add-item" className="btn btn-danger">Add</Link>
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
                    {items.map((item) => (
                        <tr key={item.id}>
                            <th scope="row">{item.id}</th>
                            <td>{item.name}</td>
                            <td>{item.category}</td>
                            <td>{item.price}</td>
                            <td>
                                <Link to={`/store/delete/${item.id}`} className="btn btn-danger btn-sm">
                                    Delete
                                </Link>
                            </td>
                            <td>
                                <Link to={`/store/update/${item.id}`} className="btn btn-danger btn-sm">
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
                        <div>Total Items: {totalItems}</div>
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
