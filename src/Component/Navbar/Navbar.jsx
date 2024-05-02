import React, { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { FaCircleUser } from 'react-icons/fa6';
import { FaShoppingCart } from 'react-icons/fa';
import { IoIosWallet } from 'react-icons/io';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Navbar.css';
import { useCart } from '../context/CartContext';

const Navbar = ({ isLoggedIn, onLogout }) => {
  const { cartLength,setCartLength } = useCart();
  const [displayedCartLength, setDisplayedCartLength] = useState(0);
  const [userClick, setUserClick] = useState(false)
  const location = useLocation();

  // useEffect(() => {
  //   if (location.pathname === '/cart') {
  //     setDisplayedCartLength(cartLiveLength);
  //   } else {
  //     setDisplayedCartLength(cartLiveLength);
  //   }
  // }, [cartLength, cartLiveLength, location]);

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light" style={{ margin: "0", padding: "0" }}>
      <div className='container' id='container'>
        <Link to="/" className="navbar-brand">
          <img src="https://res.cloudinary.com/ddxawuqwy/image/upload/v1708420873/packages/mvlogo_mc4ai4.png" alt="Logo" />
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <NavLink className="nav-link" to="/">
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/packages"
                className={`nav-link ${location.pathname.includes('/package') ? 'active' : ''}`}
              >
                Packages
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                className={`nav-link ${location.pathname.includes('/landcombo') ? 'active' : ''}`}
                to="/landcombos">
                Land&nbsp;Combos
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink 
                className={`nav-link ${location.pathname.includes('/attraction') ? 'active' : ''}`}
                to="/attractions">
                Attractions
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/transfers">
                Transfers
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/contactus">
                Contact&nbsp;Us
              </NavLink>
            </li>
          </ul>

          <ul className="navbar-nav" id='navbarNav-mobile-tab'>
            {isLoggedIn ? (
              <>
                {/* <li className="nav-item children">
                  <NavLink className="nav-link" to="/wallet">
                    <img src='wallet.svg'/>
                  </NavLink>
                </li> */}
                <li className="nav-item">
                  <NavLink className="nav-link" to="/cart">
                    <img src='shoppingcart.svg' />
                    <sub style={{
                      background: "#595959", borderRadius: "50%", padding: "2px 6px 3px 6px", color: "#fff",
                      top: "-0.8rem", left: "-0.5rem"
                    }}>
                      {cartLength}
                    </sub>
                  </NavLink>
                </li>

                <li className="nav-item">
                  <NavLink className="nav-link user-login">
                    <img src='user1.svg' style={{ fontSize: '2rem', color: '#52ccfc' }}
                      onClick={() => {
                        setUserClick(!userClick)
                      }}
                    />
                    {userClick && (
                      <>
                        <ul className='user-log-out'>
                          <li>
                            <NavLink to="/user"><p style={{ textAlign: "center", textTransform: "capitalize", fontWeight: "300" }} 
                            onClick={()=>{
                              setUserClick(!userClick)
                            }}
                            >
                              Dashboard
                              </p></NavLink>
                          </li>
                          <li to="/" onClick={onLogout}>
                            <NavLink className="nav-links-log-out" to="/">Log Out</NavLink>
                          </li>
                        </ul>
                      </>
                    )}
                  </NavLink>
                </li>
              </>
            ) : (
              <li className="nav-item nav-link-btn">
                <NavLink className="nav-link" to="/login" 
                onClick={()=>{
                  setUserClick(false)
                }}
                >
                  Agent Login
                </NavLink>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

