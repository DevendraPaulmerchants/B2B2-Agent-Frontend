import React, { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Navbar.css';
import { useCart } from '../context/CartContext';

const Navbar = ({ isLoggedIn, onLogout, setLoggedIn, setCart, cart }) => {
  const { cartLength, setToken, token, setAgentName } = useCart();
  const [userClick, setUserClick] = useState(false)
  const location = useLocation();

  const getCookie = (name) => {
    const decodedCookie = decodeURIComponent(document.cookie);
    const ca = decodedCookie.split(';');
    const nameEQ = `${name}=`;
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(nameEQ) === 0) {
        return c.substring(nameEQ.length, c.length);
      }
    }
    return null;
  };

  const getAgentInfoFromCookies = () => {
    const token1 = getCookie('token');
    const agentName = getCookie('agentName');
    return { token1, agentName };
  };

  useEffect(() => {
    setCart(localStorage.getItem('cart'));
    console.log("Cart length", cart);
    const { token1, agentName } = getAgentInfoFromCookies();
    if (token1 && agentName) {
      setToken(token1);
      setAgentName(agentName);
      setLoggedIn(true);
    }
  }, []);


  const deleteCookie = (name) => {
    document.cookie = `${name}=; path=/; max-age=0`;
  };

  const handleLogout = () => {
    deleteCookie('token');
    deleteCookie('agentName');
    localStorage.removeItem('cart')
  };

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
                className={`nav-link ${location.pathname.includes('/attraction') ? 'active' : ''}`}
                to="/attractions">
                Attractions
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
            {(isLoggedIn) && 
              <>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/cart">
                    <img src='/shoppingcart.svg' alt='cart' />
                    <sub style={{
                      background: "#595959", borderRadius: "50%", padding: "2px 6px 3px 6px", color: "#fff",
                      top: "-0.8rem", left: "-0.5rem",
                    }}>
                      {cart}
                    </sub>
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link">
                    <img src='/userIcon.svg' alt='user' height={32} width={32} style={{ fontSize: '2rem', color: '#52ccfc', }}
                      onClick={() => {
                        setUserClick(!userClick)
                      }}
                    />
                  </NavLink>
                  {userClick && (
                      <>
                        <ul className='user-log-out'>
                          <li>
                            <NavLink to="/userDetails"><p style={{ fontWeight: "500", color: '#0D8ACD', }}
                              onClick={() => {
                                setUserClick(!userClick)
                              }}
                            > <img src='/profile.svg' alt='Icon' />&nbsp;View Profile
                            </p></NavLink>
                          </li>
                          <li>
                            <NavLink to="/bookings"><p style={{ fontWeight: "500", color: '#0D8ACD' }}
                              onClick={() => {
                                setUserClick(!userClick)
                              }}
                            ><img src='/bookings.svg' alt='Icon' />&nbsp;My Bookings
                            </p></NavLink>
                          </li>
                          <li to="/" onClick={() => {
                            handleLogout();
                            onLogout();
                          }}>
                            <NavLink to="/"><p style={{ fontWeight: "500", color: '#0D8ACD' }}>
                              <img src='/logout.svg' alt='Icon' />&nbsp;Log Out
                            </p></NavLink>
                          </li>
                        </ul>
                      </>
                    )}
                </li>
              </>
          }
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

