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


const Home = () => <HomePage/>
const Stocks = () => <Stock/>


const App = () => {
    return (
        <Router>
            <Header />
            <Navbar/>
            <main>
                <Routes>

                    <Route path="/store/home" element={<Home />} />
                    <Route path="/store/stock/1" element={<Stocks />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<Register/>} />
                    <Route path="/store/add-item" element={<AddItemPage/>} />

                </Routes>




            </main>

            <Footer />
        </Router>
    );
};

export default App;