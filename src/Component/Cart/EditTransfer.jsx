import React, { useState } from "react";
import { useCart } from "../context/CartContext";
import { IoMdClose } from "react-icons/io";
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { APIPath } from "../../Config";
import { useNavigate } from "react-router-dom";

const BookTransfer = ({ onClose, tripType,selectedTransferType, adultsPassengers, childPassengers, selectedDate, 
    selectedDateTo,arrivalFlightCode ,arrivalPickupTime1,departureFlightCode,departurePickupTime1,
    cartId,transferId,pkgId,Pname,Pmobile,Pemail,price,LoadCartItem}) => {
    document.body.style.overflow = 'hidden';
    const { token } = useCart();
    const [name, setName] = useState(Pname);
    const [adultPassenger, setAdultPassenger] = useState(adultsPassengers);
    const [childPassenger, setChildPassenger] = useState(childPassengers);
    const [email, setEmail] = useState(Pemail);
    const [mobile, setMobile] = useState(Pmobile);
    const [flightArrivalCode, setFlightArrivalCode] = useState(arrivalFlightCode);
    const [flightArrivalTime, setFLightArrivalTime] = useState(selectedDate);
    const [flightDepartureCode, setFlightDepartureCode] = useState(departureFlightCode);
    const [flightDepartureTime, setFlightDepartureTime] = useState(selectedDateTo)
    const [arrivalPickupTime, setArrivalPickupTime] = useState(arrivalPickupTime1);
    const [departurePickupTime, setDeparturePickupTime] = useState(departurePickupTime1);

    const navigate = useNavigate();
    const handleNameChange = (e) => {
        const name = e.target.value;
        const isAlphabetic = /^[a-zA-Z\s]*$/.test(name);
        if (isAlphabetic || name === "") {
            const sanitizedValue = name.replace(/^\s+|\s+(?=\s)/g, '');
            setName(sanitizedValue)
        }
    };
    const getCurrentDateTime = () => {
        const now = new Date();
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const day = String(now.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }
   
    const addtransfertoCart =
        {
            type:1,
            cartId:cartId,
            transferId:transferId,
            transfers: [
                {
                    selectedTripType:tripType ,
                    selectedTransferType: selectedTransferType,
                    transferId: pkgId,
                    pickupTimeForArrival: flightArrivalTime,
                    arrivalPickupTime: arrivalPickupTime,
                    arrivalFlightCode: flightArrivalCode,
                    numberOfAdults: adultPassenger,
                    numberOfChildrens: childPassenger,
                    pickupTimeForDeparture: flightDepartureTime,
                    departurePickupTime: departurePickupTime,
                    departureFlightCode: flightDepartureCode,
                    vehicle: "Car",
                    remarks: "FINDING YOUR DRIVER."
                }
            ],
            customerDetails: {
                name: name,
                email: email,
                phone: mobile,
                address: {
                    city: "Chandigarh",
                }
            }
        }
    
    const bookThisPackage = () => {
        if (name.length <= 0) {
            alert("please fill lead passenger details")
            return
        }
        if (adultPassenger <= 0) {
            alert("please Add at least 1 Adult")
            return
        }
        else {
            fetch(`${APIPath}/api/v1/agent/new-cart/item`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                method: 'PATCH',
                mode: 'cors',
                body: JSON.stringify(addtransfertoCart)
            }).then((res) => res.json())
                .then((data) => {
                    alert(data.message)
                    LoadCartItem();
                    navigate('/cart')
                })
                .catch((err) => {
                    alert(err)
                    return
                })
        }
    }

    return <>
        <div className="booktransfer-container">
            <div className="book-transfer-details-page">
                <div className="book-transfer-top-header">
                    <h2>Transfer Details</h2>
                    <h2 onClick={onClose} className="close"><IoMdClose
                        style={{ fontSize: "1.5rem" }}
                    /></h2>
                </div>
                <div className="booking-passenger-details">
                    <form onSubmit={(e) => { 
                        e.preventDefault(); 
                        }}>
                        <br />
                        {/* -------------------------------Passenger Deatils------------------------- */}
                        <div className="lead-passenger-parent-container">
                            <div className="lead-passenger-name">
                                <label htmlFor="Lead-Passenger-Name">Lead Passenger Name</label>
                                <input type="text" placeholder="Enter Name.. " required
                                    minLength={3} maxLength={35}
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
                                    className="PhoneInput--readOnly"
                                />
                            </div>
                            <div className="lead-passenger-name">
                                <label htmlFor="Lead-Passenger-Email">Email</label>
                                <input type="email" placeholder="EnterEmail.. " required
                                maxLength={40}
                                    value={email}
                                    className="PhoneInput--readOnly"
                                />
                            </div>
                        </div>
                        <div className="lead-passenger-parent-container">
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
                        {/* ----------------------------Flight Details------------ */}
                        {selectedTransferType === 'AirportToHotel' &&
                            <div className="booking-flight-arrival-departure-container">
                                <div className="booking-flight-arrival-container">
                                    <div className="flight-arrival-heading">
                                        <h2>Arrival Info.</h2>
                                        <div className="flight-arrival-code-time">
                                            <div className="booking-flight-code">
                                                <label htmlFor="Flight-Code">Flight No.</label>
                                                <input type="text" placeholder="Eg-4567" required
                                                    minLength={7} maxLength={7}
                                                    value={flightArrivalCode}
                                                    onChange={(e) => setFlightArrivalCode(e.target.value)}
                                                />
                                            </div>
                                            <div className="booking-flight-code"
                                                style={{ width: "50%" }}
                                            >
                                                <label htmlFor="Flight-Code">ETA</label>
                                                <input type="date" required
                                                    min={getCurrentDateTime()}
                                                    value={flightArrivalTime}
                                                    onChange={(e) => setFLightArrivalTime(e.target.value)}
                                                />
                                            </div>
                                        </div>
                                        <div className="pickup-time">
                                            <label>Pickup Time</label>
                                            <input type="time" placeholder="10:30" value={arrivalPickupTime} required
                                                onChange={(e) => {
                                                    e.preventDefault();
                                                    setArrivalPickupTime(e.target.value)
                                                }}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="booking-flight-departure-container">
                                    <div className="flight-departure-heading">
                                        <div className="flight-departure-code-time">
                                            <div id={tripType === 'ROUND_TRIP' ? '' : 'opacity'}>
                                                <h2>Departure Info.</h2>
                                                <div className="booking-flight-arrival-input">
                                                    <div className="booking-flight-code">
                                                        <label htmlFor="Flight-Code">Flight No.</label>
                                                        <input type="text" placeholder="Eg-4567" required
                                                            minLength={7} maxLength={7}
                                                            value={flightDepartureCode}
                                                            onChange={(e) => setFlightDepartureCode(e.target.value)}
                                                            disabled={tripType === 'ROUND_TRIP' ? false : true}
                                                        />
                                                    </div>
                                                    <div className="booking-flight-code" style={{ width: "50%" }}>
                                                        <label htmlFor="Flight-Code">ETD</label>
                                                        <input type="date" required
                                                            min={getCurrentDateTime()}
                                                            value={flightDepartureTime}
                                                            onChange={(e) => setFlightDepartureTime(e.target.value)}
                                                            disabled={tripType === 'ROUND_TRIP' ? false : true}
                                                        />
                                                    </div>

                                                </div>
                                                <div className="pickup-time">
                                                    <label>Pickup Time</label>
                                                    <input type="time" placeholder="10:30" value={departurePickupTime} required
                                                        onChange={(e) => {
                                                            e.preventDefault();
                                                            setDeparturePickupTime(e.target.value)
                                                        }}
                                                        disabled={tripType === 'ROUND_TRIP' ? false : true}
                                                    />
                                                </div>
                                            </div>
                                            {/* )} */}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        }
                        {selectedTransferType === 'HotelToAirport' &&
                            <div className="booking-flight-arrival-departure-container">
                                <div className="booking-flight-arrival-container">
                                    <div className="flight-arrival-heading">
                                        <h2>Arrival Info.</h2>
                                        <div className="flight-arrival-code-time">
                                            <div className="booking-flight-code">
                                                <label htmlFor="Flight-Code">Flight No.</label>
                                                <input type="text" placeholder="Eg-4567" required
                                                    minLength={7} maxLength={7}
                                                    value={flightArrivalCode}
                                                    onChange={(e) => setFlightArrivalCode(e.target.value)}
                                                />
                                            </div>
                                            <div className="booking-flight-code"
                                                style={{ width: "50%" }}
                                            >
                                                <label htmlFor="Flight-Code">ETA</label>
                                                <input type="date" required
                                                    min={getCurrentDateTime()}
                                                    value={flightArrivalTime}
                                                    onChange={(e) => setFLightArrivalTime(e.target.value)}
                                                />
                                            </div>
                                        </div>
                                        <div className="pickup-time">
                                            <label>Pickup Time</label>
                                            <input type="time" placeholder="10:30" value={arrivalPickupTime} required
                                                onChange={(e) => {
                                                    e.preventDefault();
                                                    setArrivalPickupTime(e.target.value)
                                                }}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="booking-flight-departure-container">
                                    <div className="flight-departure-heading">
                                        <div className="flight-departure-code-time">
                                            <div id={tripType === 'ROUND_TRIP' ? '' : 'opacity'}>
                                                <h2>Departure Info.</h2>
                                                <div className="booking-flight-arrival-input">
                                                    <div className="booking-flight-code">
                                                        <label htmlFor="Flight-Code">Flight No.</label>
                                                        <input type="text" placeholder="Eg-4567" required
                                                            minLength={7} maxLength={7}
                                                            value={flightDepartureCode}
                                                            onChange={(e) => setFlightDepartureCode(e.target.value)}
                                                            disabled={tripType === 'ROUND_TRIP' ? false : true}
                                                        />
                                                    </div>
                                                    <div className="booking-flight-code" style={{ width: "50%" }}>
                                                        <label htmlFor="Flight-Code">ETD</label>
                                                        <input type="date" required
                                                            min={getCurrentDateTime()}
                                                            value={flightDepartureTime}
                                                            onChange={(e) => setFlightDepartureTime(e.target.value)}
                                                            disabled={tripType === 'ROUND_TRIP' ? false : true}
                                                        />
                                                    </div>

                                                </div>
                                                <div className="pickup-time">
                                                    <label>Pickup Time</label>
                                                    <input type="time" placeholder="10:30" value={departurePickupTime} required
                                                        onChange={(e) => {
                                                            e.preventDefault();
                                                            setDeparturePickupTime(e.target.value)
                                                        }}
                                                        disabled={tripType === 'ROUND_TRIP' ? false : true}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        }
                        {selectedTransferType === 'AirportToAirport' &&
                            <div className="booking-flight-arrival-departure-container">
                                <div className="booking-flight-arrival-container">
                                    <div className="flight-arrival-heading">
                                        <h2>Arrival Info.</h2>
                                        <div className="flight-arrival-code-time">
                                            <div className="booking-flight-code">
                                                <label htmlFor="Flight-Code">Flight No.</label>
                                                <input type="text" placeholder="Eg-4567" required
                                                    minLength={7} maxLength={7}
                                                    value={flightArrivalCode}
                                                    onChange={(e) => setFlightArrivalCode(e.target.value)}
                                                />
                                            </div>
                                            <div className="booking-flight-code"
                                                style={{ width: "50%" }}
                                            >
                                                <label htmlFor="Flight-Code">ETA</label>
                                                <input type="date" required
                                                    min={getCurrentDateTime()}
                                                    value={flightArrivalTime}
                                                    onChange={(e) => setFLightArrivalTime(e.target.value)}
                                                />
                                            </div>
                                        </div>
                                        <div className="pickup-time">
                                            <label>Pickup Time</label>
                                            <input type="time" placeholder="10:30" value={arrivalPickupTime} required
                                                onChange={(e) => {
                                                    e.preventDefault();
                                                    setArrivalPickupTime(e.target.value)
                                                }}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="booking-flight-departure-container">
                                    <div className="flight-departure-heading">
                                        <div className="flight-departure-code-time">
                                            <div id={tripType === 'ROUND_TRIP' ? '' : 'opacity'}>
                                                <h2>Departure Info.</h2>
                                                <div className="booking-flight-arrival-input">
                                                    <div className="booking-flight-code">
                                                        <label htmlFor="Flight-Code">Flight No.</label>
                                                        <input type="text" placeholder="Eg-4567" required
                                                            minLength={7} maxLength={7}
                                                            value={flightDepartureCode}
                                                            onChange={(e) => setFlightDepartureCode(e.target.value)}
                                                            disabled={tripType === 'ROUND_TRIP' ? false : true}
                                                        />
                                                    </div>
                                                    <div className="booking-flight-code" style={{ width: "50%" }}>
                                                        <label htmlFor="Flight-Code">ETD</label>
                                                        <input type="date" required
                                                            min={getCurrentDateTime()}
                                                            value={flightDepartureTime}
                                                            onChange={(e) => setFlightDepartureTime(e.target.value)}
                                                            disabled={tripType === 'ROUND_TRIP' ? false : true}
                                                        />
                                                    </div>

                                                </div>
                                                <div className="pickup-time">
                                                    <label>Pickup Time</label>
                                                    <input type="time" placeholder="10:30" value={departurePickupTime} required
                                                        onChange={(e) => {
                                                            e.preventDefault();
                                                            setDeparturePickupTime(e.target.value)
                                                        }}
                                                        disabled={tripType === 'ROUND_TRIP' ? false : true}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        }
                        {/* --------------------------------Cost Of FLight------------ */}
                        <div className="booking-transfer-cost-and-btn-container">
                            <div className="booking-transfer-cost">
                                <h4><b>Total Amount:</b></h4>
                                <h4><b>&nbsp;AED {price}</b><sub>+Taxes</sub></h4>
                            </div>
                            <div className="booking-transfer-btn">
                                <button onClick={()=>{bookThisPackage()}}>Submit</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>

        </div>
    </>
}
export default BookTransfer;