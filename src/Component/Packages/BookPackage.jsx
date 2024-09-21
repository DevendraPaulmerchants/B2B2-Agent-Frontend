import React from "react";
import { IoMdClose } from "react-icons/io";
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import './Packages.css';
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { APIPath } from "../../Config";

const BookPackage = ({ onClose, packagedata }) => {
    const { token } = useCart()
    document.body.style.overflow = 'hidden';
    const DayOrNight = parseInt(packagedata[0].duration.split("/")[1].split(" ")[1]) - 1;
    const pkgId = packagedata[0]._id;
    const [name, setName] = useState('');
    const [adultPassenger, setAdultPassenger] = useState(0);
    const [childPassenger, setChildPassenger] = useState(0);
    const [infentPassenger, setInfentPassenger] = useState(0);
    const [email, setEmail] = useState('');
    const [mobile, setMobile] = useState('');
    const [isPhoneValid, setPhoneValid] = useState(false);
    const [fromDate, setFromDate] = useState('');
    const [toDate, setToDate] = useState('');
    const [loading, setLoading] = useState(false);

    const pkgPrice = ((packagedata[0].price[0].price) * (adultPassenger) + (packagedata[0].price[1].price) * (childPassenger));

    useEffect(() => {
        if (fromDate) {
            const resultDate = new Date(fromDate);
            resultDate.setDate(resultDate.getDate() + DayOrNight);
            const formattedResult = formatDate(resultDate);
            setToDate(formattedResult);
        }
    }, [fromDate, DayOrNight]);

    const formatDate = (date) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };
    const capitalize = (str) => {
        if (typeof str !== 'string') return '';
        return str?.charAt(0).toUpperCase() + str?.slice(1).toLowerCase();
    };
    const handleNameChange = (e) => {
        const name = e.target.value;
        const isAlphabetic = /^[a-zA-Z\s]*$/.test(name);
        if (isAlphabetic || name === "") {
            const sanitizedValue = name.replace(/^\s+|\s+(?=\s)/g, '');
            setName(capitalize(sanitizedValue))
        }
    };
    const handleEmailChange = (e) => {
        const email = e.target.value.trim();
        setEmail(email);
        if (email === "" || /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) {
            setEmail(email);
        }
    }
    // const handleMobileChange = (value) => {
    //     setMobile(value)
    // }
    const getCurrentDate = () => {
        const now = new Date();
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const day = String(now.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }
    const BookingPackageData = {
        packageId: pkgId,
        numberOfAdults: adultPassenger,
        numberOfChildrens: childPassenger,
        numberOfInfants: infentPassenger,
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
        if (adultPassenger > 50) {
            alert("Maximum limit exceeded: Only 50 adult passengers are allowed.");
            return;
        }
        if (childPassenger > 50) {
            alert("Maximum limit exceeded: Only 50 child passengers are allowed.");
            return;
        }
        if (infentPassenger > 50) {
            alert("Maximum limit exceeded: Only 50 infant passengers are allowed.");
            return;
        }
        // if(infentPassenger > 2){
        //     alert("More than 2 infants are not allowed... ");
        //     return;
        // }
        if (fromDate.length < 2) {
            alert("please select package start date...")
            return;
        }
        else {
            setLoading(true);
            fetch(`${APIPath}/api/v1/agent/package/book-package`, {
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
                    setLoading(false);
                    navigate('/packages')
                })
                .catch((err) => {
                    alert(err)
                    setLoading(false);
                    return
                })
        }
    }
    const addToCartPackage = {
        type: 2,
        packages: [
            {
                packageId: pkgId,
                numberOfAdults: adultPassenger,
                numberOfChildrens: childPassenger,
                numberOfInfants: infentPassenger,
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
            alert("please fill passenger email...");
            return;
        }
        if (adultPassenger <= 0) {
            alert("please Add at least 1 Adult...")
            return
        }
        if (adultPassenger > 50) {
            alert("Maximum limit exceeded: Only 50 adult passengers are allowed.");
            return;
        }
        if (childPassenger > 50) {
            alert("Maximum limit exceeded: Only 50 child passengers are allowed.");
            return;
        }
        if (infentPassenger > 50) {
            alert("Maximum limit exceeded: Only 50 infant passengers are allowed.");
            return;
        }
        // if(infentPassenger > 2){
        //     alert("More than 2 infants are not allowed... ");
        //     return;
        // }
        if (fromDate.length < 2) {
            alert("please select package start date...")
            return;
        }
        else {
            setLoading(true)
            fetch(`${APIPath}/api/v1/agent/new-cart`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                method: 'POST',
                mode: 'cors',
                body: JSON.stringify(addToCartPackage)
            }).then((res) => res.json())
                .then((data) => {
                    if (data.description === "PAX_CONFLICT") {
                        const cartId = data.cartId;
                        const confirmPAX = window.confirm("Passengers count mismatch with previous added item! \n Do you want to continue?");
                        if (confirmPAX) {
                            fetch(`${APIPath}/api/v1/agent/new-cart/pax-confirmation`, {
                                headers: {
                                    'Authorization': `Bearer ${token}`,
                                    'Content-Type': 'application/json'
                                },
                                method: 'POST',
                                mode: 'cors',
                                body: JSON.stringify(
                                    {
                                        cartId: cartId,
                                        paxConfirmation: "YES"
                                    })
                            })
                                .then((res) => res.json())
                                .then((data) => {
                                    if (data.message === "success") {
                                        fetch(`${APIPath}/api/v1/agent/new-cart`, {
                                            headers: {
                                                'Authorization': `Bearer ${token}`,
                                                'Content-Type': 'application/json'
                                            },
                                            method: 'POST',
                                            mode: 'cors',
                                            body: JSON.stringify(addToCartPackage)
                                        }).then((res) => res.json())
                                            .then((data) => {
                                                console.log(data);
                                                setLoading(false);
                                                navigate("/cart");
                                                return;
                                            })
                                    }
                                    else {
                                        setLoading(false);
                                        return;
                                    }
                                })
                                .catch((err) => {
                                    alert(err);
                                    setLoading(false);
                                })
                        }
                        else {
                            setLoading(false);
                            return;
                        }
                    }
                    else if (data.description === "DATE_CONFLICT") {
                        const cartId = data.cartId;
                        const confirmPAX = window.confirm("Date clash with previous added item! \n Do you want to continue?");
                        if (confirmPAX) {
                            fetch(`${APIPath}/api/v1/agent/new-cart/date-confirmation`, {
                                headers: {
                                    'Authorization': `Bearer ${token}`,
                                    'Content-Type': 'application/json'
                                },
                                method: 'POST',
                                mode: 'cors',
                                body: JSON.stringify(
                                    {
                                        cartId: cartId,
                                        dateConfirmation: "YES"
                                    })
                            })
                                .then((res) => res.json())
                                .then((data) => {
                                    if (data.message === "success") {
                                        fetch(`${APIPath}/api/v1/agent/new-cart`, {
                                            headers: {
                                                'Authorization': `Bearer ${token}`,
                                                'Content-Type': 'application/json'
                                            },
                                            method: 'POST',
                                            mode: 'cors',
                                            body: JSON.stringify(addToCartPackage)
                                        }).then((res) => res.json())
                                            .then((data) => {
                                                console.log(data);
                                                setLoading(false);
                                                navigate("/cart");
                                                return;
                                            })
                                    }
                                    else {
                                        setLoading(false);
                                        return;
                                    }
                                })
                                .catch((err) => {
                                    alert(err);
                                    setLoading(false);
                                })
                        }
                        else {
                            setLoading(false);
                            return;
                        }
                    }
                    else if (data.description === "DATE_PAX_CONFLICT") {
                        const cartId = data.cartId;
                        const confirmPAX = window.confirm("Date and Passengers are different with previous added item! \n Do you want to continue?");
                        if (confirmPAX) {
                            fetch(`${APIPath}/api/v1/agent/new-cart/date-pax-confirmation`, {
                                headers: {
                                    'Authorization': `Bearer ${token}`,
                                    'Content-Type': 'application/json'
                                },
                                method: 'POST',
                                mode: 'cors',
                                body: JSON.stringify(
                                    {
                                        cartId: cartId,
                                        dateConfirmation:"YES",
                                        paxConfirmation:"YES"
                                    })
                            })
                                .then((res) => res.json())
                                .then((data) => {
                                    if (data.message === "success") {
                                        fetch(`${APIPath}/api/v1/agent/new-cart`, {
                                            headers: {
                                                'Authorization': `Bearer ${token}`,
                                                'Content-Type': 'application/json'
                                            },
                                            method: 'POST',
                                            mode: 'cors',
                                            body: JSON.stringify(addToCartPackage)
                                        }).then((res) => res.json())
                                            .then((data) => {
                                                console.log(data);
                                                setLoading(false);
                                                navigate("/cart");
                                                return;
                                            })
                                    }
                                    else {
                                        setLoading(false);
                                        return;
                                    }
                                })
                                .catch((err) => {
                                    alert(err);
                                    setLoading(false);
                                })
                        }
                        else {
                            setLoading(false);
                            return;
                        }
                    }
                    else if (data.statusCode === 400){
                        alert(data.message);
                        setLoading(false);
                        return;
                    }
                    else {
                        setLoading(false);
                        navigate('/cart');
                    }
                    return;
                })
                .catch((err) => {
                    alert(err);
                    setLoading(false);
                });
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
                            <label htmlFor="Lead-Passenger-Name">Lead Passenger Name</label>
                            <input type="text" placeholder="Enter Name.. " required
                                minLength={3} maxLength={30}
                                value={name}
                                onChange={(e) => { handleNameChange(e) }}
                            />
                        </div>
                        <div className="lead-passenger-name" style={{ width: "100%" }}>
                            <label htmlFor="Lead-Passenger-Mobile">Mobile No.</label>
                            {/* <PhoneInput id="form-control"
                                country={'in'}
                                value={mobile}
                                onChange={(value) => handleMobileChange(value)}
                                inputProps={{
                                    name: 'mobile',
                                    required: true,
                                }}
                            /> */}
                            <PhoneInput inputClass="ant-input phoneInput" id="form-control"
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
                            <input type="email" placeholder="Enter Email.. " required
                                maxLength={30}
                                value={email}
                                onChange={(e) => { handleEmailChange(e) }}
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
                                readOnly={true}
                            />
                        </div>
                    </div>
                    {/* </div> */}
                    <div className="booking-package-price">
                        <div className="booking-price-text-value">
                            <p>Total Price: AED &nbsp;
                                <b>
                                    {/* {(packagedata[0].price[0].price) * (adultPassenger) + (packagedata[0].price[1].price) * (childPassenger)} */}
                                    {pkgPrice}
                                </b>&nbsp;
                                <sub>
                                    +VAT(5%)
                                </sub>
                            </p>
                        </div>
                        <div className="package-price-btn">
                            {loading ? (
                                <div className="loader"></div>
                            ) : (
                                <>
                                    <button onClick={() => {
                                        addToCart();
                                    }}>Add To Cart</button> &nbsp; &nbsp; &nbsp;
                                    <button onClick={() => {
                                        bookThisPackage();
                                    }}>Book Now</button>
                                </>
                            )}
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </>
}
export default BookPackage;