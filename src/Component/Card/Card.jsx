// import React from "react";
// import {  useParams } from "react-router-dom";
// import { useCart } from "../context/CartContext";

// import './Card.css';

// const Card=()=>{
//   const { dataSecret, cartCost } = useCart();
//   console.log(dataSecret, cartCost)

//   const payNow=()=>{
//   }
//   return<>
//     <div className="card-container">
//        <div className="card-container-header">
//          <h2>Make Payment</h2>
//        </div>
//        <div className="payment-method-and-card-details">
//           <div className="payment-method">
//              <div className="payment-method1">
//                <div className="payment-logo">
//                  <img src="/payment-mt.png" alt="payment-logo"/>
//                </div>
//                <div className="method-name">
//                 <h3>Credit/Dabit/ATM Card</h3>
//                 <p>Visa, Master, Amex, RupPay etc.</p>
//                </div>
//              </div>
//              <hr/>
//           </div>
//           <div className="card-details">
//             <div className="card-number">
//                <label htmlFor="Card-number"> Card Number</label>
//                <input type="text" placeholder="Enter your card number here." />
//             </div>
//             <div className="card-number">
//                <label htmlFor="Card-number">Name on Card</label>
//                <input type="text" placeholder="Enter your Name on card." />
//             </div>
//             <div className="exp-month-year-cvv">
//               <div className="card-exp-month-year">
//               <label htmlFor="month-year">Expiry Month & Year</label>
//               <select id="month">
//                 <option value="">Month</option>
//                 <option value="01">01</option>
//                 <option value="02">02</option>
//                 <option value="03">03</option>
//                 <option value="04">04</option>
//                 <option value="05">05</option>
//                 <option value="06">06</option>
//                 <option value="07">07</option>
//                 <option value="08">08</option>
//                 <option value="09">09</option>
//                 <option value="10">10</option>
//                 <option value="11">11</option>
//                 <option value="12">12</option>
//               </select>
//               <select id="year">
//                 <option value="">Year</option>
//                 <option value="01">01</option>
//                 <option value="02">02</option>
//                 <option value="03">03</option>
//                 <option value="04">04</option>
//                 <option value="05">05</option>
//                 <option value="06">06</option>
//                 <option value="07">07</option>
//                 <option value="08">08</option>
//                 <option value="09">09</option>
//                 <option value="10">10</option>
//                 <option value="11">11</option>
//                 <option value="12">12</option>
//               </select>
//               </div>
//               <div className="card-cvv">
//               <label htmlFor="card-cvv">Card CVV</label>
//               <input type="number" placeholder="Enter Card CVV" />
//               </div>
//             </div>
//             <div className="price-and-pay-now-btn">
//                <div className="price">
//                  <h2>{cartCost}</h2>
//                </div>
//                <div className="pay-now-btn">
//                 <button
//                 onClick={payNow}
//                 >Pay Now</button>
//                </div>
//           </div>
//           <div className="accepted-card">
//              <div>
//               <h4>we accept</h4>
//              </div>
//              <div>
//               <img src="/visa-card-logo-1.png"/>
//               <img src="/mastercard-logo-1.png"/>
//               <img src="/American-Express-1.png"/>
//               <img src="/Rupay-Logo-1.png"/>
//               <img src="/Diners_Club-logo-1.png"/>
//              </div>
//           </div>
//           </div>
//        </div>
//     </div>
//   </>
// }
// export default Card;

























import React, { useState, useEffect } from "react";
import { useCart } from "../context/CartContext";
import { loadStripe } from "@stripe/stripe-js";
import { APIPath } from "../../Config";

import './Card.css';

const Card = () => {
    document.body.style.overflow = 'auto';
    const { dataSecret, cartCost,token } = useCart();
    const [cardNumber, setCardNumber] = useState("");
    const [nameOnCard, setNameOnCard] = useState("");
    const [expiryMonth, setExpiryMonth] = useState("");
    const [expiryYear, setExpiryYear] = useState("");
    const [cvv, setCvv] = useState("");
    const [stripe, setStripe] = useState(null);
    const [cardElement, setCardElement] = useState(null);

    useEffect(() => {
        const initializeStripe = async () => {
            const stripePromise = loadStripe("pk_test_51ONuagDlvGS7eWqTkz88NYU7TrRkcAW9S9zGc0fMDps0q0OiFXKaZn1mVPRrIvWynUGO20JR3e6AqjNvbjbnVk3l00ugbCgX6d");
            setStripe(await stripePromise);
        };

        initializeStripe();
    }, []);

    useEffect(() => {
        if (stripe) {
            const elements = stripe.elements();
            const card = elements.create('card');
            card.mount('#card-element');
            setCardElement(card);
        }
    }, [stripe]);

    const payNow = async (e) => {

        if (!stripe || !cardElement) {
            console.error("Stripe or Card Element is not initialized");
            return;
        }

        try {
            const { error, paymentIntent } = await stripe.confirmCardPayment(dataSecret, {
                payment_method: {
                    card: cardElement,
                    billing_details: {
                        name: nameOnCard
                    }
                }
            });

            if (error) {
                let obj = {
                    statusCode : 400,
                    error:error
                }
                fetch(`${APIPath}/api/v1/agent/transfer/checkout`, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    },
                    method: 'POST',
                    mode: 'cors',
                    body:JSON.stringify(obj)
                })
                //  .then((res) => res.json())
                //   .then((data) => {})
                //   .catch((err) => {alert(err)})

                console.log("errorrr",obj)
                console.error("Payment failed:", error.message);
                alert("somethings went wrog")
                // Handle payment failure
            } else if (paymentIntent.status === 'succeeded') {
                let obj = {
                    statusCode : 200,
                    success:paymentIntent
                }
                fetch(`${APIPath}/api/v1/agent/transfer/checkout`, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    },
                    method: 'POST',
                    mode: 'cors',
                    body:JSON.stringify(obj)
                })

                console.log("successs",paymentIntent)
                console.log("Payment succeeded!");
                alert("Payment Success!!")
                // Handle payment success
            }
        } catch (error) {
            let obj = {
                statusCode : 400,
                error:error
            }

            fetch(`${APIPath}/api/v1/agent/transfer/checkout`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                method: 'POST',
                mode: 'cors',
                body:JSON.stringify(obj)
            })
            console.log("catch error",error)
            console.error("Error confirming payment:", error);
            // Handle error
        }
    };

    return (
        <div className="card-container">
            <div className="card-container-header">
                <h2>Make Payment</h2>
            </div>
            <div className="payment-method-and-card-details">
                <div className="payment-method">
                    <div className="payment-method1">
                        <div className="payment-logo">
                            <img src="/payment-mt.png" alt="payment-logo"/>
                        </div>
                        <div className="method-name">
                            <h3>Credit/Dabit/ATM Card</h3>
                            <p>Visa, Master, Amex, RupPay etc.</p>
                        </div>
                    </div>
                    <hr/>
                </div>
                <div className="card-details">
                    <div className="card-number">
                        <label htmlFor="Card-number">Name on Card</label>
                        <input type="text" placeholder="Enter your Name on card." required 
                        onChange={(e) => setNameOnCard(e.target.value)} />
                    </div>
                    <div className="card-number">
                        <label htmlFor="Card-number"> Card Number</label>
                        <div id="card-element"></div>
                    </div>
                    <div className="price-and-pay-now-btn">
                        <div className="price">
                            <h2>{cartCost}</h2>
                        </div>
                        <div className="pay-now-btn">
                            <button onClick={payNow}>Pay Now</button>
                        </div>
                    </div>
                    <div className="accepted-card">
                        <div>
                            <h4>we accept</h4>
                        </div>
                        <div>
                            <img src="/visa-card-logo-1.png" alt="Visa"/>
                            <img src="/mastercard-logo-1.png" alt="Mastercard"/>
                            <img src="/American-Express-1.png" alt="American Express"/>
                            <img src="/Rupay-Logo-1.png" alt="Rupay"/>
                            <img src="/Diners_Club-logo-1.png" alt="Diners Club"/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Card;

// --------------------My Way-------------







