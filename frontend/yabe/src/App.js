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
import ProfilePage from "./components/fragments/profilePage";
import ProfileBar from "./components/fragments/account/profile";
import AccountPage from "./components/fragments/account/account";
import AccountInfo from "./components/fragments/account/accountInfo";
import Wishlist from "./components/fragments/account/wishlist";
import EditProfile from "./components/fragments/account/editProfile";
import React from "react";
import BannedPage from "./components/auth/banned";

const App = () => {
    return (
        <Router>
            <ProfileBar />
            <Header />
            <Navbar />
            <main>
                <Routes>
                    <Route path="/store/home" element={<HomePage />} />
                    <Route path="/store/stock/1" element={<Stock />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<Register/>} />
                    <Route path="/profile" element={<ProfilePage/>} />
                    <Route path="/store/admin/add-item" element={<AddItemPage />} />
                    <Route path="/account" element={<AccountPage />} />
                    <Route path="/edit-profile" element={<EditProfile />} />
                    <Route path="/account-info" element={<AccountInfo />} />
                    <Route path="/wishlist" element={<Wishlist />} />
                    <Route path="/banned" element={<BannedPage />} />
                </Routes>

            </main>

            <Footer />
        </Router>
    );
};

export default App;