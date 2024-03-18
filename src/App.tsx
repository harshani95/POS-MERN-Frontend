import {BrowserRouter as Router,Routes,Route,Link} from 'react-router-dom';
import './App.css'

import Home from "./components/Home.tsx";
import Customer from "./components/Customer.tsx";
import Product from "./components/Product.tsx";
import Order from "./components/Order.tsx";
import Signup from './components/Signup.tsx';
import Login from './components/Login.tsx';

function App() {
    return(
        <Router>
            <div>
                <nav className="navbar navbar-expand-lg bg-body-tertiary">
                    <div className="container-fluid">
                        <div className="navbar-brand">
                            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRRhowJ0cgtGyC-KrCESr6LIws0f7zQuIzex4BoM4bBUJGDCrIpjUEhXiJllo0a6FyxTMc&usqp=CAU"
                                 alt="" className='logo'/>
                        </div>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                                data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarNav">
                            <ul className="navbar-nav">
                                <li className="nav-item">
                                    <Link className="nav-link active" aria-current="page" to='/'>Home</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link"  to='/customer'>Customers</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link"  to='/orders'>Order Management</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link"  to='/product'>Products</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link"  to='/login'>Login</Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
                <Routes>
                    <Route path='/' element={<Home/>}/>
                    <Route path='/customer' element={<Customer/>}/>
                    <Route path='/product' element={<Product/>}/>
                    <Route path='/orders' element={<Order/>}/>
                    <Route path='/login' element={<Login/>}/>
                    <Route path='/signup' element={<Signup/>}/>
                </Routes>
            </div>
        </Router>
    )
}

export default App
