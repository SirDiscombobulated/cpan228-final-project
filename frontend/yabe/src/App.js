import './components/styling/global.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from "./components/home";
import Navbar from "./components/fragments/navbar";
import Header from "./components/fragments/header";
import Footer from "./components/fragments/footer";
import AddItemPage from "./components/add-item";
import Register from "./components/auth/register";
import LoginPage from "./components/auth/login";
import StockPage from "./components/stock"; // Import StockPage
import ProfileBar from "./components/fragments/profile";
import ProfilePage from "./components/fragments/profilePage";
import ItemDetail from "./components/ItemDetail";
import { useState } from 'react';

const App = () => {
    const [searchQuery, setSearchQuery] = useState(""); // Define searchQuery state

    // Update searchQuery globally
    const handleSearch = (query) => {
        setSearchQuery(query);
    };

    return (
        <Router>
            <ProfileBar />
            <Header handleSearch={handleSearch} />
            <Navbar />
            <main>
                <Routes>
                    <Route path="/item/:id" element={<ItemDetail />} />
                    <Route path="/store/home" element={<HomePage />} />
                    <Route
                        path="/store/stock"
                        element={<StockPage searchQuery={searchQuery} />} // Pass searchQuery to StockPage
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
