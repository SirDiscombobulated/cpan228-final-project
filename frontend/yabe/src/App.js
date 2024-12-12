import logo from './logo.svg';
import './components/styling/global.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from "./components/home";
import Navbar from "./components/fragments/navbar"
import Header from "./components/fragments/header";
import Footer from "./components/fragments/footer";
import AddItemPage from "./components/add-item";
import Register from "./components/auth/register";
import LoginPage from "./components/auth/login";
import Stock from "./components/stock";
import ProfileBar from "./components/fragments/profile";


const App = () => {
    return (
        <Router>
            <ProfileBar/>
            <Header />
            <Navbar/>
            <main>
                <Routes>

                    <Route path="/store/home" element={<HomePage />} />
                    <Route path="/store/stock/1" element={<Stock />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<Register/>} />
                    <Route path="/store/admin/add-item" element={<AddItemPage/>} />

                </Routes>




            </main>

            <Footer />
        </Router>
    );
};

export default App;