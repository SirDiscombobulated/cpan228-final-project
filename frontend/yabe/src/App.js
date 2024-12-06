import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from "./components/home";
import Header from "./components/fragments/header";
import Footer from "./components/fragments/footer";
import AddItemPage from "./components/add-item";
import Register from "./components/auth/register";
import LoginPage from "./components/auth/login";

const Home = () => <div>Welcome to Yabe!</div>;
const Stock = () => <div>Stock Page</div>;


const App = () => {
    return (
        <Router>
            <Header />

            <main>
                <Routes>
                    <Route path="/store/home" element={<Home />} />
                    <Route path="/store/stock/1" element={<Stock />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<Register/>} />
                    <Route path="/store/add-item" element={<AddItemPage/>} />

                </Routes>

                <HomePage/>


            </main>

            <Footer />
        </Router>
    );
};

export default App;