import React, { useState, useEffect } from "react";
import { IoMdClose } from "react-icons/io";
import { useCart } from '../context/CartContext';
import { APIPath } from "../../Config";
import './User.css';
const BookingDetails = ({ onClose, bookingId }) => {
    document.body.style.overflow='hidden';
    const { agentName, token } = useCart();
    const [bookingDetail, setBookingDetail] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`${APIPath}/api/v1/agent/booking?id=${bookingId}`, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            method: 'GET',
            mode: 'cors',
        }).then((res) => res.json())
            .then((data) => {
                console.log(data.data);
                // setTimeout(() => {
                setBookingDetail(data.data)
                // setOriginalPackages(data.data)
                setLoading(false)
                // }, 2000)
            })
            .catch((err) => {
                alert(err)
                setLoading(false)
            })
    }, [])

    return <>
        <div className="booking-package-container">
            <div className="booking-package-page">
                <div className="agent-booking-header">
                    <div className="booking-package-header" style={{ marginBottom: "0" }}>
                        <h2 style={{ color: "#456789", fontSize: "20px" }}>Your booking details </h2>
                        <h2 onClick={onClose} style={{ cursor: "pointer" }}><IoMdClose /></h2>
                    </div>
                </div>
                {loading ? (<div className="loader">

                </div>) : (
                    <>
                        <div className="booking-main-container">
                            <h2>Customer Details </h2>
                            <br />
                            <div className="agent-booking-passenger-details">
                                <div >
                                    <h4>Name </h4>
                                    <p>{bookingDetail[0].customerDetails.name}</p>
                                </div>
                                <div>
                                    <h4>Mobile no. </h4>
                                    <p>{bookingDetail[0].customerDetails.phone}</p>
                                </div>
                                <div>
                                    <h4>Email </h4>
                                    <p>{bookingDetail[0].customerDetails.email}</p>
                                </div>
                                <div style={{ textAlign: "center" }}>
                                    <h4>Total passengers </h4>
                                    <p>{(bookingDetail[0].numberOfAdults) + (bookingDetail[0].numberOfChildrens)}</p>
                                </div>
                            </div>
                        </div>
                        <hr />
                        <div className="booking-main-container" style={{ paddingTop: "0" }}>
                            <h2>Booking Details</h2>
                            <br />
                            <div className="agent-booking-passenger-details">
                                <div >
                                    <h4>Booking Type</h4>
                                    <p>{bookingDetail[0].bookingType}</p>
                                </div>
                                <div>
                                    <h4>PaymentStatus</h4>
                                    <p>{bookingDetail[0].paymentStatus}</p>
                                </div>
                                <div>
                                    <h4>Booking Status</h4>
                                    <p>{bookingDetail[0].bookingStatus}</p>
                                </div>
                                <div>
                                    <h4>Total cost </h4>
                                    <p>AED {bookingDetail[0].totalCost}</p>
                                </div>
                            </div>
                        </div>
                        <hr />
                        <div className="agent-booking-reason">
                            <h4>Reason </h4>
                            <p>{bookingDetail[0].reason}</p>
                        </div>
                    </>
                )}

            </div>

        </div>

    </>
}
export default BookingDetails;