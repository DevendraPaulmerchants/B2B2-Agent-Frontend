import React, { useState,useEffect } from "react";
import { MdOutlineMail } from "react-icons/md";
import { MdOutlineKey } from "react-icons/md";
import { IoEyeOffSharp } from "react-icons/io5";
import { MdRemoveRedEye } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';
import { APIPath } from "../../Config";
import './LogIn.css';
import { useCart } from "../context/CartContext";
import ForgotPassword from "../ForgotPassword/Forgot_password";

const Login = ({ setLoggedIn,setCart }) => {
  document.body.style.overflow="auto";
  const {setCartLength,setCartLengthValue,setToken,setAgentName,setUserId} =useCart()

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showpass,setShoPass]=useState(true);
  const [forgot,setForgot]=useState(false);
  
  const ExistUser = {
    email:username,
    password:password
  }

  const navigate = useNavigate();

const handleLogin = () => {
  fetch(`${APIPath}/api/v1/agent/auth/login`, {
      headers: {
          'Content-Type': 'application/json'
      },
      method: 'POST',
      credentials: 'include',
      mode: 'cors',
      body: JSON.stringify(ExistUser)
  }).then((res) => res.json())
    .then((data) => {
        if (data.message === "Login successful") {
            const agentName = data.data.account.agentName;
            const token = data.data.tokens.access.token;
            setAgentName(agentName);
            setToken(token);
            setUserId(data.data.account._id);
            setCartLength(data.data.account.cart);
            setCart(data.data.account.cart);
            localStorage.setItem('cart', data.data.account.cart)
            setCartLengthValue(true);
            setLoggedIn(true);
            document.cookie = `agentName=${agentName};path=/;max-age=${data.data.tokens.access.expiresIn}`;
            document.cookie = `token=${token};path=/;max-age=${data.data.tokens.access.expiresIn}`;
            navigate('/');
        } else {
            alert("Please Check Email and Password");
            return false;
        }
    })
    .catch((err) => {
        alert(err);
    });
};

  const forgotClose=()=>{
    setForgot(false);
  }

  return <>
    <div className="login-page-container">
      <div className="Login-page">
        <div className="login-page-content">
          <h2>WELCOME BACK</h2>
          <form onSubmit={(e) => { e.preventDefault(); handleLogin(); }}>
            <div className="email-logo-input">
              <MdOutlineMail
              style={{color: "#297CBB"}}
               />
              <input
                type="email"
                placeholder="Email address"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className="email-logo-input" style={{marginBottom:"5px"}} >
              <MdOutlineKey 
               style={{color: "#297CBB" }} 
              />
              <input
                type={showpass ? 'password' : 'text'}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <span onClick={()=>{setShoPass(!showpass)}}>{showpass ? <IoEyeOffSharp style={{color: "#297CBB" }}/> : 
                          <MdRemoveRedEye style={{color: "#297CBB" }} /> }
              </span>
            </div>
            <p 
            style={{display:"flex",justifyContent:"flex-end",
            color:"rgba(41, 124, 187, 1)",fontWeight:"500",
            paddingLeft:"11rem",
          }}><Link style={{textDecoration:"none"}} onClick={()=>{setForgot(true)}}
              >Forgot Password?</Link></p>
            <div className="remenderme-forget-password">
              <p><input type="checkbox" /> Remember me</p>
            </div>
            <div >
              <button type="submit" className="login-page-login-btn">LOGIN</button>
            </div>
          </form>
          <div className="login-not-have-account">
            <p>Do not have an account? 
              <Link to="/registration"> Sign Up</Link>
              </p>
          </div>
        </div>
      </div>
    </div>
    {forgot && <ForgotPassword onClose={forgotClose}/>}
  </>
};

export default Login;
