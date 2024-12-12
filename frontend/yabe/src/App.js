import './components/styling/global.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from "./components/home";
import Navbar from "./components/fragments/navbar";
import Header from "./components/fragments/header";
import Footer from "./components/fragments/footer";
import AddItemPage from "./components/add-item";
import Register from "./components/auth/register";
import LoginPage from "./components/auth/login";
import Stock from "./components/stock";
import ProfileBar from "./components/fragments/profile";
import ProfilePage from "./components/fragments/profilePage";
import ItemDetail from "./components/ItemDetail";
import { useState, useEffect } from 'react';

const App = () => {
    const [searchQuery, setSearchQuery] = useState(""); // Shared search state
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchItems = async (query = "") => {
        try {
            setLoading(true);
            const url = query
                ? `http://localhost:8080/store/api/filter/${query}`
                : "http://localhost:8080/store/api/featured";
            const response = await fetch(url, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Basic " + btoa("admin:12345"), // Replace with your credentials
                },
            });
            if (!response.ok) {
                throw new Error(`Failed to fetch items. Status: ${response.status}`);
            }
            const data = await response.json();
            setItems(data);
            setError(null);
        } catch (err) {
            console.error("Error fetching items:", err);
            setError("Failed to load items. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    // Fetch default items when the app loads
    useEffect(() => {
        fetchItems();
    }, []);

    return (
        <Router>
            <ProfileBar />
            <Header handleSearch={fetchItems} /> {/* Pass fetchItems to Header */}
            <Navbar />
            <main>
                <Routes>
                    <Route path="/item/:id" element={<ItemDetail />} />
                    <Route path="/store/home" element={<HomePage />} />
                    <Route
                        path="/store/stock"
                        element={
                            <Stock
                                items={items}
                                loading={loading}
                                error={error}
                                fetchItems={fetchItems}
                            />
                        }
                    />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/store/admin/add-item" element={<AddItemPage />} />
                    <Route path="/profile" element={<ProfilePage />} />
                </Routes>
            </main>
            <Footer />
        </Router>
    );
};

export default App;
