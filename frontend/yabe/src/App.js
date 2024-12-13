import './components/styling/global.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from "./components/home";
import Navbar from "./components/fragments/navbar";
import Header from "./components/fragments/header";
import Footer from "./components/fragments/footer";
import AddItemPage from "./components/add-item";
import Register from "./components/auth/register";
import LoginPage from "./components/auth/login";
import StockPage from "./components/stock";
import ProfilePage from "./components/fragments/profilePage";
import ItemDetail from "./components/ItemDetail";
import { useState } from 'react';
import ProfileBar from "./components/fragments/account/profile";
import AccountPage from "./components/fragments/account/account";
import AccountInfo from "./components/fragments/account/accountInfo";
import Wishlist from "./components/fragments/account/wishlist";
import EditProfile from "./components/fragments/account/editProfile";
import BannedPage from "./components/auth/banned";
import React from "react";
import AdminPage from "./components/admin/admin";
import UpdateItemForm from "./components/admin/modifyItems";


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
                    <Route path="/store/stock" element={<StockPage searchQuery={searchQuery} />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/store/admin/add-item" element={<AddItemPage />} />
                    <Route path="/account" element={<AccountPage />} />
                    <Route path="/edit-profile" element={<EditProfile />} />
                    <Route path="/account-info" element={<AccountInfo />} />
                    <Route path="/wishlist" element={<Wishlist />} />
                    <Route path="/banned" element={<BannedPage />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/profile" element={<ProfilePage />} />
                    <Route path="/admin/admin-panel" element={<AdminPage/>}/>
                    <Route path="/modify-items" element={<UpdateItemForm/>}></Route>
                </Routes>
            </main>
            <Footer />
        </Router>
    );
};

export default App;
