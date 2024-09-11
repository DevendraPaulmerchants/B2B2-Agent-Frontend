import React from "react";
import { IoMdClose } from "react-icons/io";
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { APIPath } from "../../Config";
import { useCart } from "../context/CartContext";

const BookAttraction = ({ onClose, packagedata, subAttractionId, price, Pname, Pmobile, Pemail,
    adults, child,infants, type, cartId, attractionId, pkgId, attDate, LoadCartItem }) => {

    const { token } = useCart();
    document.body.style.overflow = 'hidden';
    console.log("attraction data", packagedata)
    const [name, setName] = useState(Pname);
    const [adultPassenger, setAdultPassenger] = useState(adults);
    const [childPassenger, setChildPassenger] = useState(child);
    const [infentPassenger, setInfentPassenger] = useState(infants);
    const [email, setEmail] = useState(Pemail);
    const [mobile, setMobile] = useState(Pmobile);
    const [fromDate, setFromDate] = useState(attDate);

    // const priceperPerson = price / (adults + child);
    const priceDescription = packagedata.price.filter((val, id) => val._id === subAttractionId);
    console.log("price description---", priceDescription);
    // const priceIndex = priceDescription[0].adultPrice;
    // console.log(priceIndex);

    const pkgPrice = price + (priceDescription[0].adultPrice * (adultPassenger - adults) +
        priceDescription[0].childPrice * (childPassenger - child))

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

    const addToCartAttraction = {
        type: type,
        cartId: cartId,
        attractionId: pkgId,
        attractions: [
            {
                attractionId: attractionId,
                subAttractionId: packagedata.subAttractionId,
                subTitle: packagedata.subTitle,
                numberOfAdults: adultPassenger,
                numberOfChildrens: childPassenger,
                numberOfInfants:infentPassenger,
                price: pkgPrice,
                startDate: fromDate,
                // endDate: toDate
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
    const EditAttraction = () => {
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
        if (adultPassenger <= 0) {
            alert("please Add at least 1 Adult")
            return
        }
        if(adultPassenger > 50){
            alert("Maximum limit exceeded: Only 50 adult passengers are allowed.");
            return;
        }
        if(childPassenger > 50){
            alert("Maximum limit exceeded: Only 50 child passengers are allowed.");
            return;
        }
        if(infentPassenger > 50){
            alert("Maximum limit exceeded: Only 50 infant passengers are allowed.");
            return;
        }
        if (fromDate.length < 2) {
            alert("please select date : ")
            return;
        }
        else {
            fetch(`${APIPath}/api/v1/agent/new-cart/item`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                method: 'PATCH',
                mode: 'cors',
                body: JSON.stringify(addToCartAttraction)
            }).then((res) => res.json())
                .then((data) => {
                    console.log(data)
                    alert("Attraction Edited successfully...")
                    onClose();
                    LoadCartItem()
                    // navigate('/cart')
                })
                .catch((err) => {
                    alert(err)
                    return
                })
        }
    }


    return <div className="booking-package-container">
        <div className="booking-package-page">
            <div className="booking-package-header">
                <h2 style={{ fontSize: "14px", color: "#25867D" }}>You are booking:
                    <p style={{ fontSize: "20px", color: "#25867D" }}>{packagedata.title}
                        <p style={{ fontSize: "16px", color: "#25867D" }}>({packagedata.subTitle})</p>
                    </p>
                </h2>
                <h2 onClick={onClose} style={{ cursor: "pointer" }}><IoMdClose /></h2>
            </div>
            <form onSubmit={(e) => {
                e.preventDefault();
            }}>
                <div className="lead-passenger-parent-container">
                    <div className="lead-passenger-name">
                        <label htmlFor="Lead-Passenger-Name">Lead Passenger Name</label>
                        <input type="text" placeholder="Enter Name.. " required
                            minLength={3} maxLength={30}
                            value={name}
                            onChange={(e) => { handleNameChange(e) }}
                        />
                    </div>
                    <div className="lead-passenger-name" style={{ width: "100%" }}>
                        <label htmlFor="Lead-Passenger-Mobile">Mobile No.</label>
                        <PhoneInput
                            international
                            country={'in'}
                            value={mobile}
                            className="PhoneInput--readOnly"
                        />

                    </div>
                    <div className="lead-passenger-name">
                        <label htmlFor="Lead-Passenger-Email">Email</label>
                        <input type="email" placeholder="EnterEmail.. " required maxLength={40}
                            value={email}
                            contentEditable={false}
                            className="PhoneInput--readOnly"
                        />
                    </div>
                </div>
                {/* <div style={{ display: "flex", gap: "2rem" }}> */}
                <div className="lead-passenger-parent-container passengers">
                    <div className="adults-passenger">
                        <p><span style={{ fontSize: "16px" }}>Adults (Age 13 & above)</span></p>
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
                        <p><span style={{ fontSize: "16px" }}>Children (Age 3 to 12)</span></p>
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
                    <div className="adults-passenger">
                        <p><span style={{ fontSize: "16px" }}>Infants (Age 0 to 3 )</span></p>
                        <div className="passenger-count">
                            <button id="count-minus"
                                onClick={(e) => {
                                    e.preventDefault();
                                    if (infentPassenger > 0) {
                                        setInfentPassenger(infentPassenger - 1)
                                    }
                                }}
                            >-</button>
                            <button id="count">{infentPassenger}</button>
                            <button id="count-plus"
                                onClick={(e) => {
                                    e.preventDefault();
                                    setInfentPassenger(infentPassenger + 1)
                                }}
                            >+</button>
                        </div>
                    </div>
                </div>
                <div className="package-from-date-to-date">
                    <div className="lead-passenger-name">
                        <p style={{ marginBottom: "5px" }}> Select date</p>
                        <input type="date" min={getCurrentDate()} style={{ width: "225px" }}
                            value={fromDate}
                            required
                            onChange={(e) => setFromDate(e.target.value)}
                        />
                    </div>
                </div>
                {/* </div> */}
                <div className="booking-package-price">
                    <div className="booking-price-text-value">
                        <p>Total Price: AED&nbsp;<b>{pkgPrice}</b>&nbsp;<sub>+VAT(5%)</sub></p>
                    </div>
                    <div className="package-price-btn">
                        <button onClick={() => {
                            EditAttraction();
                        }}>Submit</button>
                    </div>
                </div>
            </form>
        </div>
    </div>
}
export default BookAttraction;