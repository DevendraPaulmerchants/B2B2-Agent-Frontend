import React, { useState,useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes,useLocation } from 'react-router-dom';
import './App.css';
import Home from './Component/Home/Home';
import Login from './Component/LogIn/Login';
import Navbar from './Component/Navbar/Navbar';
import Registration from './Component/Registration/Registration';
import Transfers from './Component/Transfers/Transfers';
import Cart from './Component/Cart/Cart';
// import Card from './Component/Card/Card';
// import Checkout from './Component/Checkout/Checkout';
import ContactUs from './Component/ContactUs/ContactUs';
import { CartProvider } from "./Component/context/CartContext";
import User from './Component/User/User';
import Packages from './Component/Packages/Packages';
import PacKageDetails from './Component/Packages/PackageDetails';
import LandCombos from './Component/LandCombos/LandCombos';
import LandCombosDetails from './Component/LandCombos/LandCombosDetails';
import Attractions from './Component/Attractions/Attractions';
import AttractionDetails from './Component/Attractions/AttractionDetails';
import Privacy from './Component/Footer/Privacy';
import Condition from './Component/Footer/Condition';
import Aboutus from './Component/AboutUs/Aboutus';
import PasswordReset from './Component/ForgotPassword/PasswordReset';

function App() {
  document.body.style.overflow="auto";
  const [isLoggedIn, setLoggedIn] = useState(false);
  const handleLogout = () => {
    setLoggedIn(false);
  };

  return (
   
    <div className="App">
      <CartProvider>
      <Router>
        <Navbar isLoggedIn={isLoggedIn} onLogout={handleLogout}/>
        <Routes>
          <Route path="/login" element={<Login setLoggedIn={setLoggedIn} /> }/>
          <Route path="/" element={<Home />} />
          <Route path="/registration" element={<Registration/>} />
          <Route path='/packages' element={<Packages/>}/>
          <Route path="/packageDetails/:packageId" element={<PacKageDetails/>} />
          <Route path='/landcombos' element={<LandCombos/>}/>
          <Route path='/landcombosDetails/:packageId' element={<LandCombosDetails/>}/>
          <Route path='/attractions' element={<Attractions/>}/>
          <Route path='/attractiondetails/:packageId' element={<AttractionDetails/>}/>
          <Route path='/transfers' element={<Transfers/>} />
          <Route path='/cart' element={<Cart/>}/>
          <Route path='/reset' element={<PasswordReset/>} />
          {/* <Route path='/card' element={<Card/>}/> */}
         {/* <Route path='/checkout' element={<Checkout/>}/>*/}
          <Route path='/contactus' element={<ContactUs/>}/>
          <Route path='/privacy_policy' element={<Privacy/>}/>
          <Route path='/term&condition' element={<Condition/>}/>
          <Route path='/aboutus' element={<Aboutus/>}/>
        </Routes>
        {isLoggedIn && (
          <Routes>
            <Route path='/user' element={<User/>}/>
          </Routes>
        )}
      </Router>
      </CartProvider>
    </div>
  
  );
}
export default App;

