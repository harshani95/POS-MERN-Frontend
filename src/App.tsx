import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";

import Home from "./components/Home.tsx";
import Customer from "./components/Customer.tsx";
import Product from "./components/Product.tsx";
import Order from "./components/Order.tsx";
import Signup from "./components/Signup.tsx";
import Login from "./components/Login.tsx";
import { useState } from "react";
import Navbar from "./components/Navbar.tsx";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <Router>
      <Navbar isLoggedIn={isLoggedIn} onLogout={handleLogout} />
      <Routes>
        <Route path="/" element={<Home />} />
        {isLoggedIn && (
          <>
            <Route path="/customer" element={<Customer />} />
            <Route path="/product" element={<Product />} />
            <Route path="/orders" element={<Order />} />
          </>
        )}
        ;
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </Router>
  );
}

export default App;
