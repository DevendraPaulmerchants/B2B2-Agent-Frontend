import React, { useState, useEffect } from "react";
import { IoMdClose } from "react-icons/io";
import { useCart } from '../context/CartContext';
import { APIPath } from "../../Config";
import './User.css';
const BookingDetails = ({ onClose, bookingId }) => {
    document.body.style.overflow = 'hidden';
    const { token } = useCart();
    const [bookingDetail, setBookingDetail] = useState(null);
    const [loading, setLoading] = useState(true);
    const [packagedata, setPackagedata] = useState(null);
    const [landComboData, setLandComboData] = useState(null);
    const[attractionData,setAttractionData]=useState(null);

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
                console.log(data.data)
                setBookingDetail(data.data);
                setPackagedata(data.data[0].packages);
                setLandComboData(data.data[0].landCombos);
                setAttractionData(data.data[0].attractions);
                setLoading(false)
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
                                    <p>+{bookingDetail[0].customerDetails.phone}</p>
                                </div>
                                <div>
                                    <h4>Email </h4>
                                    <p>{bookingDetail[0].customerDetails.email}</p>
                                </div>
                                {/* <div style={{ textAlign: "center" }}>
                                    <h4>Total passengers </h4>
                                    <p>{(packagedata?.[0]?.numberOfAdults) + (packagedata?.[0]?.numberOfChildrens)}</p>
                                </div> */}
                            </div>
                        </div>
                        <hr />
                        {packagedata && packagedata.length > 0 && (
                            <>
                                <div className="booking-main-container">
                                    <h2>Package Details </h2>
                                    <br />
                                    <div className="agent-booking-passenger-details">
                                        <div >
                                            <h4>Title </h4>
                                            <p>{packagedata?.[0]?.title}</p>
                                        </div>
                                        <div style={{ textAlign: "center" }}>
                                            <h4>Total passengers </h4>
                                            <p>{(packagedata?.[0]?.numberOfAdults) + (packagedata?.[0]?.numberOfChildrens)}</p>
                                        </div>
                                        <div >
                                            <h4>Total Cost </h4>
                                            <p><b>AED {packagedata?.[0]?.cost}</b></p>
                                        </div>
                                    </div>
                                </div>
                            </>
                        )}
                        <hr />
                        {landComboData && landComboData.length > 0 && (
                            <>
                                <div className="booking-main-container">
                                    <h2>Package Details </h2>
                                    <br />
                                    <div className="agent-booking-passenger-details">
                                        <div >
                                            <h4>Title </h4>
                                            <p>{landComboData?.[0]?.title}</p>
                                        </div>
                                        <div style={{ textAlign: "center" }}>
                                            <h4>Total passengers </h4>
                                            <p>{(landComboData?.[0]?.numberOfAdults) + (landComboData?.[0]?.numberOfChildrens)}</p>
                                        </div>
                                        <div >
                                            <h4>Total Cost </h4>
                                            <p><b>AED {landComboData?.[0]?.cost}</b></p>
                                        </div>

                                    </div>
                                </div>
                            </>
                        )}
                        <hr />
                        {attractionData && attractionData.length > 0 && (
                            <>
                                <div className="booking-main-container">
                                    <h2>Package Details </h2>
                                    <br />
                                    <div className="agent-booking-passenger-details">
                                        <div >
                                            <h4>Title </h4>
                                            <p>{attractionData?.[0]?.title}</p>
                                        </div>
                                        <div style={{ textAlign: "center" }}>
                                            <h4>Total passengers </h4>
                                            <p>{(attractionData?.[0]?.numberOfAdults) + (attractionData?.[0]?.numberOfChildrens)}</p>
                                        </div>
                                        <div >
                                            <h4>Total Cost </h4>
                                            <p><b>AED {attractionData?.[0]?.cost}</b></p>
                                        </div>

                                    </div>
                                </div>
                            </>
                        )}
                        <hr/>
                        <div className="booking-main-container" style={{ paddingTop: "10px" }}>
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