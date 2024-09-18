import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import './App.css';
import Home from './Component/Home/Home';
import Login from './Component/LogIn/Login';
import Navbar from './Component/Navbar/Navbar';
import Registration from './Component/Registration/Registration';
import Transfers from './Component/Transfers/Transfers';
import Cart from './Component/Cart/Cart';
import ContactUs from './Component/ContactUs/ContactUs';
import { CartProvider } from "./Component/context/CartContext";
import User from './Component/User/Bookings';
import Packages from './Component/Packages/Packages';
import PackageDetails from './Component/Packages/PackageDetails';
import LandCombos from './Component/LandCombos/LandCombos';
import LandCombosDetails from './Component/LandCombos/LandCombosDetails';
import Attractions from './Component/Attractions/Attractions';
import AttractionDetails from './Component/Attractions/AttractionDetails';
import Privacy from './Component/Footer/Privacy';
import Condition from './Component/Footer/Condition';
import Aboutus from './Component/AboutUs/Aboutus';
import PasswordReset from './Component/ForgotPassword/PasswordReset';
import UserDetails from './Component/User/UserDetails';
import Bookings from './Component/User/Bookings';

function App() {
  document.body.style.overflow = "auto";
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [cart,setCart]=useState(0);
  const [agentName, setAgentName] = useState('');
  const [token, setToken] = useState('');

  const handleLogout = () => {
    setLoggedIn(false);
    setAgentName('');
    setToken('');
    document.cookie = 'agentName=;path=/;max-age=0';
    document.cookie = 'token=;path=/;max-age=0';
  };

  useEffect(() => {
    const getCookie = (name) => {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      if (parts.length === 2) return parts.pop().split(';').shift();
    };

    const tokenFromCookie = getCookie('token');
    const agentNameFromCookie = getCookie('agentName');
    if (tokenFromCookie && agentNameFromCookie) {
      setToken(tokenFromCookie);
      setAgentName(agentNameFromCookie);
      setLoggedIn(true);
    }
  }, []);

  return (
    <div className="App">
      <CartProvider>
        <Router>
          {isLoggedIn && (
            <Navbar isLoggedIn={isLoggedIn} onLogout={handleLogout} setLoggedIn={setLoggedIn} setCart={setCart} cart={cart} />
          )}
          <Routes>
            <Route path="/" element={isLoggedIn ? <Home token={token} setLoggedIn={setLoggedIn} /> : <Login setLoggedIn={setLoggedIn} setCart={setCart} />} />
            <Route path="/registration" element={<Registration />} />
            <Route path="/reset" element={<PasswordReset />} />
            {isLoggedIn && (
              <>
                <Route path="/bookings" element={<Bookings />} />
                <Route path='/userDetails' element={<UserDetails/>}/>
                <Route path="/packages" element={<Packages />} />
                <Route path="/packageDetails/:packageId" element={<PackageDetails />} />
                <Route path="/landcombos" element={<LandCombos />} />
                <Route path="/landcombosDetails/:packageId" element={<LandCombosDetails />} />
                <Route path="/attractions" element={<Attractions />} />
                <Route path="/attractiondetails/:packageId" element={<AttractionDetails />} />
                <Route path="/transfers" element={<Transfers tokenH={token} />} />
                <Route path="/cart" element={<Cart tokenH={token} setCart={setCart} cart={cart}/>} />
                <Route path="/contactus" element={<ContactUs />} />
                <Route path="/privacy_policy" element={<Privacy />} />
                <Route path="/term&condition" element={<Condition />} />
                <Route path="/aboutus" element={<Aboutus />} />
              </>
            )}
          </Routes>
        </Router>
      </CartProvider>
    </div>
  );
}

export default App;


