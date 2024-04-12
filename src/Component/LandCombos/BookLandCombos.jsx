import React from "react";
import { IoMdClose } from "react-icons/io";
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
// import './Packages.css';
import { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { APIPath } from "../../Config";
import { useCart } from "../context/CartContext";

const BookLandCombos = ({ onClose, bookingPackageId, packagedata, price }) => {
    const { token } = useCart();
    document.body.style.overflow = 'hidden';
    const pkgId = packagedata[0]._id;
    const [name, setName] = useState('');
    const [adultPassenger, setAdultPassenger] = useState(0);
    const [childPassenger, setChildPassenger] = useState(0);
    const [email, setEmail] = useState('');
    const [mobile, setMobile] = useState('');
    const [fromDate, setFromDate] = useState('');
    const [toDate, setToDate] = useState('');
    const pkgPrice = price * (adultPassenger) + price * (childPassenger)
    const handleNameChange = (e) => {
        const name = e.target.value;
        const isAlphabetic = /^[a-zA-Z\s]*$/.test(name);
        if (isAlphabetic || name === "") {
            const sanitizedValue = name.replace(/^\s+|\s+(?=\s)/g, '');
            setName(sanitizedValue)
        }
    };
    const getCurrentDate = () => {
        const now = new Date();
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const day = String(now.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }
    const BookingPackageData = {
        landComboId: pkgId,
        numberOfAdults: adultPassenger,
        numberOfChildrens: childPassenger,
        price: pkgPrice,
        customerDetails: {
            name: name,
            email: email,
            phone: mobile
        },
        startDate: fromDate,
        endDate: toDate
    }
    const navigate = useNavigate();
    const bookThisPackage = () => {
        if (name.length <= 0) {
            alert("please fill lead passenger details")
            return
        }
        if (mobile.toString().length < 8) {
            alert("Mobile number should have 10 digits");
            return;
        }
        if (email.length <= 10) {
            alert("please fill passenge email:");
            return;
        }
        if (adultPassenger <= 0 ) {
            alert("please Add at least 1 Adult")
            return
        }
        if (fromDate.length < 2 ) {
            alert("please select from date: ")
            return;
        }
        if(toDate.length < 2) {
            alert("please select to date : ")
            return;
        }
        else {
            fetch(`${APIPath}/api/v1/agent/landCombo/book-landCombo`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                method: 'POST',
                mode: 'cors',
                body: JSON.stringify(BookingPackageData)
            }).then((res) => res.json())
                .then((data) => {
                    alert("Request successfully sent to admin...")
                    navigate('/landcombos')
                })
                .catch((err) => {
                    alert(err)
                    return
                })

        }
    }
    const addToCartLandcombo = {
        type: 4,
        landCombos: [
            {
                landComboId: pkgId,
                numberOfAdults: adultPassenger,
                numberOfChildrens: childPassenger,
                price: pkgPrice,
                startDate: fromDate,
                endDate: toDate
            }
        ],
        customerDetails: {
            name: name,
            email: email,
            phone: mobile,
            address: {
                city: "Jaipur"
            }
        }
    }
    const addToCart = () => {
        //    e.preventDefault();
        if (name.length <= 0) {
            alert("please fill lead passenger details")
            return
        }
        if (mobile.toString().length < 8) {
            alert("Please check mobile number");
            return;
        }
        if (email.length <= 10) {
            alert("please fill passenge email:");
            return;
        }
        if (adultPassenger <= 0 ) {
            alert("please Add at least 1 Adult")
            return
        }
        if (fromDate.length < 2 ) {
            alert("please select from date: ")
            return;
        }
        if(toDate.length < 2) {
            alert("please select to date : ")
            return;
        }
        else {
            fetch(`${APIPath}/api/v1/agent/new-cart`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                method: 'POST',
                mode: 'cors',
                body: JSON.stringify(addToCartLandcombo)
            }).then((res) => res.json())
                .then((data) => {
                    alert(data.message)
                    navigate('/cart')
                })
                .catch((err) => {
                    alert(err)
                    return
                })
        }
    }

    return <>
        <div className="booking-package-container">
            <div className="booking-package-page">
                <div className="booking-package-header">
                    <h2 style={{ fontSize: "14px", color: "#25867D" }}>You are booking:
                        <p style={{ fontSize: "20px", color: "#25867D" }}>{packagedata[0].title}</p>
                    </h2>
                    <h2 onClick={onClose} style={{ cursor: "pointer" }}><IoMdClose /></h2>
                </div>
                <form onSubmit={(e) => { 
                    e.preventDefault(); 
                    // bookThisPackage(); 
                    }}>
                    <div className="lead-passenger-parent-container">
                        <div className="lead-passenger-name">
                            <label htmlFor="Lead-Passenger-Name">Lead Passenge Name</label>
                            <input type="text" placeholder="Enter Name.. " required
                                minLength={3} maxLength={30}
                                value={name}
                                onChange={(e) => { handleNameChange(e) }}
                            />
                        </div>
                        <div className="lead-passenger-name" style={{ width: "100%" }}>
                            <label htmlFor="Lead-Passenger-Mobile">Mobile No.</label>
                            <PhoneInput
                                placeholder="Enter phone number"
                                international
                                country={'in'}
                                value={mobile}
                                onChange={setMobile}
                            />
                        </div>
                        <div className="lead-passenger-name">
                            <label htmlFor="Lead-Passenger-Email">Email</label>
                            <input type="email" placeholder="EnterEmail.. " required maxLength={40}
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                    </div>
                    <div style={{ display: "flex", gap: "2rem" }}>

                        <div className="lead-passenger-parent-container" style={{ paddingRight: "0" }}>
                            <div className="adults-passenger">
                                <p>Adults &gt; 12 years</p>
                                <div className="passenger-count">
                                    <button id="count-minus"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            if (adultPassenger > 0) {
                                                setAdultPassenger(adultPassenger - 1)
                                            }
                                        }}
                                    >-</button>
                                    <button id="count">{adultPassenger}</button>
                                    <button id="count-plus"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            setAdultPassenger(adultPassenger + 1)
                                        }}
                                    >+</button>
                                </div>
                            </div>
                            <div className="adults-passenger">
                                <p>Children &lt; 12 years</p>
                                <div className="passenger-count">
                                    <button id="count-minus"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            if (childPassenger > 0) {
                                                setChildPassenger(childPassenger - 1)
                                            }
                                        }}
                                    >-</button>
                                    <button id="count">{childPassenger}</button>
                                    <button id="count-plus"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            setChildPassenger(childPassenger + 1)
                                        }}
                                    >+</button>
                                </div>
                            </div>
                        </div>
                        <div className="package-from-date-to-date">
                            <div className="lead-passenger-name">
                                <p style={{ marginBottom: "5px" }}> From date</p>
                                <input type="date" min={getCurrentDate()} style={{ width: "225px" }}
                                    value={fromDate} required
                                    onChange={(e) => setFromDate(e.target.value)}
                                />
                            </div>
                            <div className="lead-passenger-name">
                                <p style={{ marginBottom: "5px" }}> To date</p>
                                <input type="date" style={{ width: "225px" }}
                                    min={fromDate}
                                    value={toDate} required
                                    onChange={(e) => setToDate(e.target.value)}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="booking-package-price">
                        <div className="booking-price-text-value">
                            <p>Total Price: AED&nbsp;
                                <b>
                                    {/* {(price) * (adultPassenger) + (price) * (childPassenger)} */}
                                    {pkgPrice}
                                </b>&nbsp;
                                <sub>
                                    +VAT(5%)
                                </sub>
                            </p>
                        </div>
                        <div className="package-price-btn">
                            <button onClick={() => {
                                addToCart();
                            }}>Add To Cart</button> &nbsp; &nbsp; &nbsp;
                            <button onClick={() => {
                                bookThisPackage();
                            }}>Book Now</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </>
}
export default BookLandCombos;