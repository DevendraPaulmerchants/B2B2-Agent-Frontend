import React, { useState } from "react";
import './BookTransfer.css';
import { useCart } from "../../context/CartContext";
import { IoMdClose } from "react-icons/io";
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { APIPath } from "../../../Config";
import { useNavigate } from "react-router-dom";

const BookTransfer = ({ tripType, adultsPassengers, childPassengers, selectedDate, selectedDateTo }) => {
    document.body.style.overflow = 'hidden';
    const { token, setBookTransfer, transferDetails, setDescriptionPage } = useCart()
    const [name, setName] = useState('');
    const [adultPassenger, setAdultPassenger] = useState(adultsPassengers);
    const [childPassenger, setChildPassenger] = useState(childPassengers);
    const [infentPassenger, setInfentPassenger] = useState(0);
    const [email, setEmail] = useState('');
    const [mobile, setMobile] = useState();
    const [isPhoneValid, setPhoneValid] = useState(false);
    const [flightArrivalCode, setFlightArrivalCode] = useState('');
    const [flightArrivalTime, setFLightArrivalTime] = useState(selectedDate);
    const [flightDepartureCode, setFlightDepartureCode] = useState('');
    const [flightDepartureTime, setFlightDepartureTime] = useState(selectedDateTo)
    const [arrivalPickupTime, setArrivalPickupTime] = useState('');
    const [departurePickupTime, setDeparturePickupTime] = useState('');
    const [loading, setLoading] = useState(false);

    const capitalize = (str) => {
        if (typeof str !== 'string') return '';
        return str?.charAt(0).toUpperCase() + str?.slice(1).toLowerCase();
    };

    const navigate = useNavigate();
    const bookingCloseBtn = () => {
        setBookTransfer(false)
        setDescriptionPage(false)
    }
    const handleNameChange = (e) => {
        const name = e.target.value;
        const isAlphabetic = /^[a-zA-Z\s]*$/.test(name);
        if (isAlphabetic || name === "") {
            const sanitizedValue = name.replace(/^\s+|\s+(?=\s)/g, '');
            setName(capitalize(sanitizedValue))
        }
    };
    const getCurrentDateTime = () => {
        const now = new Date();
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const day = String(now.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }
    const [fromRemarks, setfromRemarks] = useState("");
    const [toRemarks, settoRemarks] = useState("");
    const bookingTransferDetails = {
        transfers: [
            {
                selectedTripType: tripType,
                selectedTransferType: transferDetails.type,
                transferId: transferDetails._id,
                arrivalPickupTime: flightArrivalTime,
                arrivalFlightCode: flightArrivalCode,
                departurePickupTime: flightDepartureTime,
                departureFlightCode: flightDepartureCode,
                numberOfAdults: parseInt(adultPassenger),
                numberOfChildrens: parseInt(childPassenger),
                numberOfInfants: parseInt(infentPassenger),
                vehicle: transferDetails.vehicle.type,
                remarks: transferDetails.additionalDetails,
                pickupTimeForArrival: arrivalPickupTime,
                pickupTimeForDeparture: departurePickupTime,
                fromRemarks: fromRemarks,
                toRemarks: toRemarks
            }
        ],
        customerDetails: {
            name: name,
            email: email,
            phone: mobile,
            address: {
                // city:city,
            }
        }
    }
    const validTypes = ["AirportToHotel", "AirportToAirport", "HotelToAirport"];
    const bookThisTransfer = () => {
        setLoading(true)
        if (name.length < 3) {
            alert("Please fill lead passenger details")
            setLoading(false)
            return
        }
        if (!isPhoneValid) {
            alert("Please check Mobile Number");
            setLoading(false)
            return;
        }
        if (email.length <= 10) {
            alert("please fill passenger email:");
            setLoading(false)
            return;
        }
        if (adultPassenger <= 0) {
            alert("please Add at least 1 Adult");
            setLoading(false);
            return
        }
        // if (infentPassenger > 2) {
        //     alert("More than 2 infants are not allowed... ");
        //     return;
        // }
        if ((adultPassenger + childPassenger) > transferDetails.vehicle.maxPassenger) {
            alert(`This Vehicle can not allow more than ${transferDetails.vehicle.maxPassenger} passengers`);
            setLoading(false);
            return;
        }
        if (validTypes.includes(transferDetails.type) && flightArrivalCode.length < 4) {
            alert("please fill arrival flight code...");
            setLoading(false);
            return;
        }

        if (validTypes.includes(transferDetails.type) && arrivalPickupTime.length < 5) {
            alert("please fill pickup time from airport...");
            setLoading(false);
            return
        }
        if (tripType === 'ROUND_TRIP') {
            if(flightArrivalTime > flightDepartureTime){
                alert(`Arrival Date must not be exceed ${flightDepartureTime}`);
                setLoading(false)
                return;
            }
            if (validTypes.includes(transferDetails.type) && flightDepartureCode.length < 4) {
                alert("please fill departure flight Code...");
                setLoading(false);
                return
            }
            if (validTypes.includes(transferDetails.type) && departurePickupTime.length < 5) {
                alert("please fill departure time to airport...");
                setLoading(false);
                return
            }
        }
        fetch(`${APIPath}/api/v1/agent/transfer/book-transfer`, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            method: 'POST',
            mode: 'cors',
            body: JSON.stringify(bookingTransferDetails)
        })
            .then((res) => res.json())
            .then((data) => {
                setBookTransfer(false)
                setDescriptionPage(false)
                setLoading(false)
                alert("your transfer booking request is sent to admin, waiting for approval")
                navigate('/transfers')
            })
            .catch((err) => (
                alert(err),
                setLoading(false)
            ))
    }

    const addtransfertoCart =
    {
        type: 1,
        transfers: [
            {
                selectedTripType: tripType,
                selectedTransferType: transferDetails.type,
                transferId: transferDetails._id,
                pickupTimeForArrival: flightArrivalTime,
                arrivalPickupTime: arrivalPickupTime,
                arrivalFlightCode: flightArrivalCode,
                numberOfAdults: adultPassenger,
                numberOfChildrens: childPassenger,
                numberOfInfants: infentPassenger,
                pickupTimeForDeparture: flightDepartureTime,
                departurePickupTime: departurePickupTime,
                departureFlightCode: flightDepartureCode,
                vehicle: transferDetails.vehicle.type,
                fromRemarks: fromRemarks,
                toRemarks: toRemarks,
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

    const addToCart = () => {
        if (name.length < 3) {
            alert("Please fill lead passenger details")
            return
        }
        if (!isPhoneValid) {
            alert("Please check Mobile Number");
            return;
        }
        if (email.length <= 10) {
            alert("please fill passenge email...");
            return;
        }
        if (adultPassenger <= 0) {
            alert("please Add at least 1 Adult...")
            return
        }
        // if (infentPassenger > 2) {
        //     alert("More than 2 infants are not allowed... ");
        //     return;
        // }
        if ((adultPassenger + childPassenger) > transferDetails.vehicle.maxPassenger) {
            alert(`This Vehicle can not allow more than ${transferDetails.vehicle.maxPassenger} passengers`)
            return;
        }
        if (validTypes.includes(transferDetails.type) && flightArrivalCode.length < 4) {
            alert("please fill arrival flight code...")
            return
        }
        if (validTypes.includes(transferDetails.type) && arrivalPickupTime.length < 5) {
            alert("please fill pickup time from airport...")
            return
        }
        if (tripType === 'ROUND_TRIP') {
            if(flightArrivalTime > flightDepartureTime){
                alert(`Arrival Date must not be exceed ${flightDepartureTime}`);
                return;
            }
            if (validTypes.includes(transferDetails.type) && flightDepartureCode.length < 4) {
                alert("please fill departure flight Code...");
                return
            }
            if (validTypes.includes(transferDetails.type) && departurePickupTime.length < 5) {
                alert("please fill departure time to airport...");
                return
            }
        }
        setLoading(true);
        fetch(`${APIPath}/api/v1/agent/new-cart`, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            method: 'POST',
            mode: 'cors',
            body: JSON.stringify(addtransfertoCart)
        }).then((res) => res.json())
            .then((data) => {
                alert(data.message);
                setBookTransfer(false)
                setDescriptionPage(false)
                navigate('/cart')
            })
            .catch((err) => {
                alert(err)
                return
            })
    }

    return <>
        <div className="booktransfer-container">
            <div className="book-transfer-details-page">
                <div className="book-transfer-top-header">
                    <h2>Transfer Details</h2>
                    <h2 onClick={() => bookingCloseBtn()} className="close"><IoMdClose
                        style={{ fontSize: "1.5rem" }}
                    /></h2>
                </div>
                <div className="booking-passenger-details">
                    <form onSubmit={(e) => { e.preventDefault(); }}>
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
                                {/* <PhoneInput
                                    placeholder="Enter phone number"
                                    international
                                    country={'in'}
                                    value={mobile}
                                    onChange={setMobile}
                                /> */}
                                <PhoneInput inputClass="ant-input phoneInput"
                                    country={'in'} enableSearch value={mobile}
                                    onChange={(value, country, e, formattedValue) => {
                                        const { format, dialCode } = country;
                                        if (format?.length === formattedValue?.length &&
                                            (value.startsWith(dialCode) || dialCode.startsWith(value))) {
                                            setPhoneValid(true);
                                            setMobile(value);
                                        }
                                        else {
                                            setPhoneValid(false)
                                        }
                                    }} />
                            </div>
                            <div className="lead-passenger-name">
                                <label htmlFor="Lead-Passenger-Email">Email</label>
                                <input type="email" placeholder="EnterEmail.. " required
                                    maxLength={40}
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="lead-passenger-parent-container">
                            <div className="adults-passenger">
                                <p style={{ fontSize: "16px" }}>Adults (Age 13 & above)</p>
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
                                <p style={{ fontSize: "16px" }}>Children (Age 3 to 12)</p>
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
                        {/* ----------------------------Flight Details------------ */}
                        {transferDetails.type === 'AirportToHotel' &&
                            <div className="booking-flight-arrival-departure-container">
                                <div className="booking-flight-arrival-container">
                                    <div className="flight-arrival-heading">
                                        <h2>Arrival Info.</h2>
                                        <div className="flight-arrival-code-time">
                                            <div className="booking-flight-code">
                                                <label htmlFor="Flight-Code">Flight No.</label>
                                                <input type="text" placeholder="Eg-4567" required
                                                    minLength={4} maxLength={7}
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
                                    <div style={{ width: '85%' }} id="remarks">
                                        <h2 style={{ marginBottom: "5px", fontSize: '18px', color: '#1D3071' }}>Pickup Remarks</h2>
                                        <input style={{
                                            outline: "none",
                                            border: "1px solid skyblue",
                                            width: "100%",
                                            padding: "2px 15px",
                                            borderRadius: "20px"
                                        }}
                                            onChange={(e) => {
                                                setfromRemarks(e.target.value);
                                            }}
                                            type="textarea" placeholder="Enter your pickUp location" />
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
                                                            minLength={4} maxLength={7}
                                                            value={flightDepartureCode}
                                                            onChange={(e) => setFlightDepartureCode(e.target.value)}
                                                            disabled={tripType === 'ROUND_TRIP' ? false : true}
                                                        />
                                                    </div>
                                                    <div className="booking-flight-code" style={{ width: "50%" }}>
                                                        <label htmlFor="Flight-Code">ETD</label>
                                                        <input type="date" required
                                                            min={flightArrivalTime}
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
                                            <div id="remarks">
                                                <h2 style={{ marginBottom: "5px" }}>Dropoff Remarks</h2>
                                                <input style={{
                                                    outline: "none",
                                                    border: "1px solid skyblue",
                                                    width: "100%",
                                                    padding: "2px 15px",
                                                    borderRadius: "20px"
                                                }}
                                                    onChange={(e) => {
                                                        settoRemarks(e.target.value);
                                                    }}
                                                    type="textarea" placeholder="Enter your drop off location" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        }
                        {transferDetails.type === 'HotelToAirport' &&
                            <div className="booking-flight-arrival-departure-container">
                                <div className="booking-flight-arrival-container">
                                    <div className="flight-arrival-heading">
                                        <h2>Departure Info.</h2>
                                        <div className="flight-arrival-code-time">
                                            <div className="booking-flight-code">
                                                <label htmlFor="Flight-Code">Flight No.</label>
                                                <input type="text" placeholder="Eg-4567" required
                                                    minLength={4} maxLength={7}
                                                    value={flightArrivalCode}
                                                    onChange={(e) => setFlightArrivalCode(e.target.value)}
                                                />
                                            </div>
                                            <div className="booking-flight-code"
                                                style={{ width: "50%" }}
                                            >
                                                <label htmlFor="Flight-Code">ETD</label>
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
                                    <div style={{ width: '85%' }} id="remarks">
                                        <h2 style={{ marginBottom: "5px", fontSize: '18px', color: '#1D3071' }}>Pickup Remarks</h2>
                                        <input style={{
                                            outline: "none",
                                            border: "1px solid skyblue",
                                            width: "100%",
                                            padding: "2px 15px",
                                            borderRadius: "20px"
                                        }}
                                            onChange={(e) => {
                                                setfromRemarks(e.target.value);
                                            }}
                                            type="textarea" placeholder="Enter your pickUp location" />
                                    </div>
                                </div>
                                <div className="booking-flight-departure-container">
                                    <div className="flight-departure-heading">
                                        <div className="flight-departure-code-time">
                                            <div id={tripType === 'ROUND_TRIP' ? '' : 'opacity'}>
                                                <h2>Arrival Info.</h2>
                                                <div className="booking-flight-arrival-input">
                                                    <div className="booking-flight-code">
                                                        <label htmlFor="Flight-Code">Flight No.</label>
                                                        <input type="text" placeholder="Eg-4567" required
                                                            minLength={4} maxLength={7}
                                                            value={flightDepartureCode}
                                                            onChange={(e) => setFlightDepartureCode(e.target.value)}
                                                            disabled={tripType === 'ROUND_TRIP' ? false : true}
                                                        />
                                                    </div>
                                                    <div className="booking-flight-code" style={{ width: "50%" }}>
                                                        <label htmlFor="Flight-Code">ETA</label>
                                                        <input type="date" required
                                                            min={flightArrivalTime}
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
                                            <div id="remarks">
                                                <h2 style={{ marginBottom: "5px" }}>Dropoff Remarks</h2>
                                                <input style={{
                                                    outline: "none",
                                                    border: "1px solid skyblue",
                                                    width: "100%",
                                                    padding: "2px 15px",
                                                    borderRadius: "20px"
                                                }}
                                                    onChange={(e) => {
                                                        settoRemarks(e.target.value);
                                                    }}
                                                    type="textarea" placeholder="Enter your drop off location" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        }
                        {transferDetails.type === 'AirportToAirport' &&
                            <div className="booking-flight-arrival-departure-container">
                                <div className="booking-flight-arrival-container">
                                    <div className="flight-arrival-heading">
                                        <h2>Arrival Info.</h2>
                                        <div className="flight-arrival-code-time">
                                            <div className="booking-flight-code">
                                                <label htmlFor="Flight-Code">Flight No.</label>
                                                <input type="text" placeholder="Eg-4567" required
                                                    minLength={4} maxLength={7}
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
                                    <div style={{ width: '85%' }} id="remarks">
                                        <h2 style={{ marginBottom: "5px", fontSize: '18px', color: '#1D3071' }}>Pickup Remarks</h2>
                                        <input style={{
                                            outline: "none",
                                            border: "1px solid skyblue",
                                            width: "100%",
                                            padding: "2px 15px",
                                            borderRadius: "20px"
                                        }}
                                            onChange={(e) => {
                                                setfromRemarks(e.target.value);
                                            }}
                                            type="textarea" placeholder="Enter your pickUp location" />
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
                                                            minLength={4} maxLength={7}
                                                            value={flightDepartureCode}
                                                            onChange={(e) => setFlightDepartureCode(e.target.value)}
                                                            disabled={tripType === 'ROUND_TRIP' ? false : true}
                                                        />
                                                    </div>
                                                    <div className="booking-flight-code" style={{ width: "50%" }}>
                                                        <label htmlFor="Flight-Code">ETD</label>
                                                        <input type="date" required
                                                            min={flightArrivalTime}
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
                                            <div style={{ width: '85%' }} id="remarks">
                                                <h2 style={{ marginBottom: "5px", fontSize: '18px', color: '#1D3071' }}>Dropoff Remarks</h2>
                                                <input style={{
                                                    outline: "none",
                                                    border: "1px solid skyblue",
                                                    width: "100%",
                                                    padding: "2px 15px",
                                                    borderRadius: "20px"
                                                }}
                                                    onChange={(e) => {
                                                        settoRemarks(e.target.value);
                                                    }}
                                                    type="textarea" placeholder="Enter your dropoff location" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        }
                        {transferDetails.type === 'HotelToHotel' &&
                            <div className="booking-flight-arrival-departure-container">
                                <div style={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
                                    <div id="remarks">
                                        <h2 style={{ marginBottom: "5px", fontSize: "16px", color: "00081d" }}>Pickup Remarks</h2>
                                        <input style={{
                                            outline: "none",
                                            border: "1px solid skyblue",
                                            width: "100%",
                                            padding: "2px 15px",
                                            borderRadius: "20px"
                                        }}
                                            onChange={(e) => {
                                                setfromRemarks(e.target.value);
                                            }}
                                            type="textarea" placeholder="Enter your pickUp off location" />
                                    </div>
                                    <div id="remarks">
                                        <h2 style={{ marginBottom: "5px", fontSize: "16px", color: "00081d" }}> Dropoff Remarks</h2>
                                        <input style={{
                                            outline: "none",
                                            border: "1px solid skyblue",
                                            width: "100%",
                                            padding: "2px 15px",
                                            borderRadius: "20px"
                                        }}
                                            onChange={(e) => {
                                                settoRemarks(e.target.value);
                                            }}
                                            type="textarea" placeholder="Enter your drop off location" />
                                    </div>
                                </div>
                            </div>
                        }
                        {/* --------------------------------Cost Of FLight------------ */}
                        <div className="booking-transfer-cost-and-btn-container">
                            <div className="booking-transfer-cost">
                                <h4><b>Total Amount:</b></h4>
                                <h4><b>&nbsp;AED {transferDetails.cost}</b><sub>+Taxes</sub></h4>
                            </div>
                            {/* -------------------------Close and Book Transfer button------------------ */}
                            <div className="booking-transfer-btn">
                                {loading ? <div className="loader">
                                </div> : <>
                                    <button onClick={() => addToCart()}>Add To cart</button>
                                    <button onClick={() => { bookThisTransfer() }}>Book Now</button>
                                </>}
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </>
}
export default BookTransfer;