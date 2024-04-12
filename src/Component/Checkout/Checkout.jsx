import React, { useState } from "react";
import './Checkout.css';
import { useNavigate } from "react-router-dom";
import { APIPath,userToken } from "../../Config";
import { useCart } from "../context/CartContext";
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

const Checkout=({onClose,cartItemIds,cartCost})=>{
    document.body.style.overflow = 'hidden';
    const {token}=useCart();
    const [name,setName]=useState('');
    const [email,setEmail]=useState('');
    const [mobile,setMobile]=useState('');
    const [city,setCity]=useState('');
    const { setDataSecret, setCartCost } = useCart();

    const checkOutIntentData = {
        cartItemId:cartItemIds,
        customerDetails:{
            name:name,
            email:email,
            phone:mobile,
            address:{
                city:city
            }
        }
    }
    const navigate=useNavigate();

    const proceedToPay=(e)=>{
        console.log(checkOutIntentData)
        e.preventDefault();
        fetch(`${APIPath}/api/v1/agent/transfer/checkout-intent`, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            method: 'POST',
            mode: 'cors',
            body: JSON.stringify(checkOutIntentData)
        }).then((res) => res.json())
            .then((data) => {
                if(data.statusCode === 200){
                    setDataSecret(data.client_secret);
                    setCartCost(cartCost);
                    navigate(`/card`);

                }
                else{
                    alert("Something went wrong")
                }
            })
            .catch((err) => {
                console.log(err)
            })
    }
    return<>
     <div className="checkout-popup">
     <div className="checkout-container">
          <h2>Please fill the details for Booking Your Transfer</h2>
          <form action="#" onSubmit={proceedToPay}>
          <div className="checkout-input">
            <div className="checkout-input-name">
                <label htmlFor="Name"> Lead Passenger Name</label>
               <input type="text" placeholder="Enter Your Name." required
               onChange={(e)=>{
                setName(e.target.value)
               }}
               />  
            </div>
            <div className="checkout-input-name">
                <label htmlFor="Email"> Email</label>
               <input type="email" placeholder="Enter Your Email." required
               onChange={(e)=>{
                setEmail(e.target.value)
               }}
               />  
            </div>
            <div className="checkout-input-name">
                <label htmlFor="Mobile_Number"> Mobile </label>
               <PhoneInput
                placeholder="Enter phone number"
                international
                // defaultCountry="IN"
                country={'in'} 
                value={mobile}
                onChange={setMobile}
                />
            </div>
            <div className="checkout-input-name">
                <label htmlFor="Name"> City </label>
               <input type="text" placeholder="Enter Your City." required
               onChange={(e)=>{
                setCity(e.target.value)
               }}
               />  
            </div>
          </div>
          <div className="checkout-proceed-to-pay-btn">
            <button onClick={onClose}>Close</button>
            <button type="submit"
            >Proceed To Pay</button>
          </div>
          </form>
      </div>
     </div>
       {/* {cardpage && <Card cartCost={cartCost} datasecret={datasecret} />} */}
    </>
}
export default Checkout;