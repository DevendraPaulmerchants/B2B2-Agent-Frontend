import React, { useState, useEffect } from "react";
import { IoMdClose } from "react-icons/io";
import { useCart } from '../context/CartContext';
import { APIPath } from "../../Config";
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import './User.css';

const BookingDetails = ({ onClose, bookingId }) => {
    document.body.style.overflow = 'hidden';
    const { token } = useCart();
    const [bookingDetail, setBookingDetail] = useState(null);
    const [loading, setLoading] = useState(true);
    const [packagedata, setPackagedata] = useState(null);
    const [landComboData, setLandComboData] = useState(null);
    const [attractionData, setAttractionData] = useState(null);
    const [transferData, setTransferData] = useState(null);

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
                setBookingDetail(data.data);
                setPackagedata(data.data[0].packages);
                setLandComboData(data.data[0].landCombos);
                setAttractionData(data.data[0].attractions);
                setTransferData(data.data[0].transfers);
                setLoading(false);
            })
            .catch((err) => {
                alert(err);
                setLoading(false);
            })
    }, [bookingId, token]);

    const generatePDF = () => {
        const doc = new jsPDF();
        let y = 10;
        const imageUrl = 'https://res.cloudinary.com/ddxawuqwy/image/upload/v1708420873/packages/mvlogo_mc4ai4.png';
        const imageWidth = 50; 
        const imageHeight = 30; 
        const pdfWidth = doc.internal.pageSize.getWidth();

        const x = (pdfWidth - imageWidth) / 2;

        
        doc.addImage(imageUrl, 'PNG', x, y, imageWidth, imageHeight);
        y += imageHeight + 10; 

        doc.text("Customer Details", 10, y);
        y += 4;
        doc.autoTable({
            startY: y,
            head: [['Name', 'Mobile No.', 'Email', 'Booking Date']],
            body: bookingDetail?.map(val => [
                val.customerDetails.name,
                `+${val.customerDetails.phone}`,
                val.customerDetails.email,
                val.createdAt?.split("T")[0],
            ]),
        });
        y = doc.lastAutoTable.finalY + 10;

        if (packagedata?.length > 0) {
            doc.text("Package Details", 10, y);
            y += 4;
            doc.autoTable({
                startY: y,
                head: [['Title', 'Start Date', 'End Date', 'Number of Adults', 'Number of Children', 'Price']],
                body: packagedata?.map(pkg => [
                    pkg.title,
                    pkg.startDate?.split("T")[0],
                    pkg.endDate?.split("T")[0],
                    pkg.numberOfAdults,
                    pkg.numberOfChildrens,
                    `AED ${pkg.cost}`
                ]),
                styles: { cellPadding: 1.5, fontSize: 10 },
                columnStyles: {
                    0: { cellWidth: 50 }
                },
            });
            y = doc.lastAutoTable.finalY + 10;
        }
        if (landComboData?.length > 0) {
            doc.text("LandCombos Details", 10, y);
            y += 4;
            doc.autoTable({
                startY: y,
                head: [['Title', 'Start Date', 'End Date', 'Number of Adults', 'Number of Children', 'Price']],
                body: landComboData?.map(val => [
                    val.title,
                    val.startDate?.split("T")[0],
                    val.endDate?.split("T")[0],
                    val.numberOfAdults,
                    val.numberOfChildrens,
                    `AED ${val.cost}`
                ]),
                styles: { cellPadding: 1.5, fontSize: 10 },
                columnStyles: {
                    0: { cellWidth: 50 }
                },
            });
            y = doc.lastAutoTable.finalY + 10;
        }
        if (attractionData?.length > 0) {
            doc.text("Attraction Details", 10, y);
            y += 4;
            doc.autoTable({
                startY: y,
                head: [['Title', 'Start Date', 'End Date', 'Number of Adults', 'Number of Children', 'Price']],
                body: attractionData?.map(val => [
                    val.title,
                    val.startDate?.split("T")[0],
                    val.endDate?.split("T")[0],
                    val.numberOfAdults,
                    val.numberOfChildrens,
                    `AED ${val.cost}`
                ]),
                styles: { cellPadding: 1.5, fontSize: 10 },
                columnStyles: {
                    0: { cellWidth: 50 }
                },
            });
            y = doc.lastAutoTable.finalY + 10;
        }
        if (transferData?.length > 0) {
            doc.text("Transfer Details", 10, y);
            y += 4;
            doc.autoTable({
                startY: y,
                head: [['Trip Type', 'Pick Up', 'Drop Off', 'Pickup Date & Time', 'Total passengers', 'Price']],
                body: transferData?.map(val => {
                    const pickupDateTime = `${val.InOut[0].pickupTimeForArrival.split("T")[0]} (${val.InOut[0].arrivalPickupTime.split("T")[0]})`;
                    const returnDateTime = val.selectedTripType === "ROUND_TRIP" ? `${val.InOut[1]?.pickupTimeForDeparture?.split("T")[0]} (${val.InOut[1]?.departurePickupTime.split("T")[0]})` : '';
                    return [
                        val.selectedTripType,
                        val.InOut[0].from,
                        val.InOut[0].to,
                        pickupDateTime + (returnDateTime ? `${returnDateTime}` : ''),
                        val.numberOfAdults + val.numberOfChildrens,
                        `AED ${val.finalCost}`
                    ];
                }),
                styles: { cellPadding: 1.5, fontSize: 10 },
                columnStyles: {
                    1: { cellWidth: 30 },
                    2: { cellWidth: 30 },
                    3: { cellWidth: 40 }
                },
            });
            y = doc.lastAutoTable.finalY + 10;
        }

        doc.text("Booking Summary", 10, y);
        y += 4;
        doc.autoTable({
            startY: y,
            head: [['Booking Status', 'Booking Type', 'Total Cost', 'Payment Status']],
            body: bookingDetail?.map(val => [
                val.bookingStatus,
                val.bookingType,
                `AED ${val.totalCost}`,
                val.paymentStatus,
            ]),
        });

        doc.save(`Booking_Details_${bookingId}.pdf`);
    };

    return <>
        <div className="booking-package-container">
            <div className="booking-package-page" style={{ height: "600px", overflow: "auto", width: "70%" }}>
                <div className="agent-booking-header">
                    <div className="booking-package-header" style={{ marginBottom: "0" }}>
                        <h2 style={{ color: "#456789", fontSize: "20px" }}>Your booking details </h2>
                        <h2 onClick={onClose} style={{ cursor: "pointer" }}><IoMdClose /></h2>
                    </div>
                </div>
                {loading ? (<div className="loader"></div>) : (
                    <>
                        <div className="booking-main-container">
                            <h2>Customer Details </h2>
                            <div className="agent-booking-passenger-details">
                                <div>
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
                                <div>
                                    <h4>Booking Date</h4>
                                    <p>{bookingDetail[0].createdAt.split("T")[0]}</p>
                                </div>
                            </div>
                        </div>
                        <hr /><hr />
                        {packagedata && packagedata.length > 0 && (
                            <>
                                <div className="booking-main-container">
                                    <h2>Package Details </h2>
                                    {packagedata.map((val, id) => {
                                        return <>
                                            <div className="agent-booking-passenger-details">
                                                <div>
                                                    <h4>Title </h4>
                                                    <p>{val?.title}</p>
                                                </div>
                                                <div style={{ textAlign: "center" }}>
                                                    <h4>Adults </h4>
                                                    <p>{val.numberOfAdults}</p>
                                                </div>
                                                <div style={{ textAlign: "center" }}>
                                                    <h4>Children</h4>
                                                    <p>{val.numberOfChildrens}</p>
                                                </div>
                                                <div>
                                                    <h4>Total Cost </h4>
                                                    <p><b>AED {val.cost}</b></p>
                                                </div>
                                            </div>
                                            {id < packagedata.length - 1 && (
                                                <hr style={{ margin: "0" }} />
                                            )}
                                        </>
                                    })}
                                </div>
                            </>
                        )}
                        <hr />
                        {landComboData && landComboData.length > 0 && (
                            <>
                                <div className="booking-main-container">
                                    <h2>LandCombos Details </h2>
                                    {landComboData.map((val, id) => {
                                        return <>
                                            <div className="agent-booking-passenger-details">
                                                <div>
                                                    <h4>Title </h4>
                                                    <p>{val?.title}</p>
                                                </div>
                                                <div style={{ textAlign: "center" }}>
                                                    <h4>Adults </h4>
                                                    <p>{val.numberOfAdults}</p>
                                                </div>
                                                <div style={{ textAlign: "center" }}>
                                                    <h4>Children</h4>
                                                    <p>{val.numberOfChildrens}</p>
                                                </div>
                                                <div>
                                                    <h4>Total Cost </h4>
                                                    <p><b>AED {val.cost}</b></p>
                                                </div>
                                            </div>
                                            {id < landComboData.length - 1 && (
                                                <hr style={{ margin: "0" }} />
                                            )}
                                        </>
                                    })}
                                </div>
                            </>
                        )}
                        <hr />
                        {attractionData && attractionData.length > 0 && (
                            <>
                                <div className="booking-main-container">
                                    <h2>Attraction Details </h2>
                                    {attractionData.map((val, id) => {
                                        return <>
                                            <div className="agent-booking-passenger-details">
                                                <div>
                                                    <h4>Title </h4>
                                                    <p>{val?.title}</p>
                                                    <p><b>({val.subTitle})</b></p>
                                                </div>
                                                <div style={{ textAlign: "center" }}>
                                                    <h4>Adults </h4>
                                                    <p>{val.numberOfAdults}</p>
                                                </div>
                                                <div style={{ textAlign: "center" }}>
                                                    <h4>Children</h4>
                                                    <p>{val.numberOfChildrens}</p>
                                                </div>
                                                <div>
                                                    <h4>Total Cost </h4>
                                                    <p><b>AED {val.cost}</b></p>
                                                </div>
                                            </div>
                                            {id < attractionData.length - 1 && (
                                                <hr style={{ margin: "0" }} />
                                            )}
                                        </>
                                    })}
                                </div>
                            </>
                        )}
                        <hr />
                        {transferData && transferData.length > 0 && (
                            <>
                                <div className="booking-main-container">
                                    <h2>Transfer Details </h2>
                                    {transferData.map((val, id) => {
                                        return <>
                                            <div className="agent-booking-passenger-details">
                                                <div>
                                                    <h4>Trip Type</h4>
                                                    <p>{val.selectedTripType}</p>
                                                </div>
                                                <div style={{ textAlign: "center" }}>
                                                    <h4>Total passengers </h4>
                                                    <p>{(val.numberOfAdults) + (val.numberOfChildrens)}</p>
                                                </div>
                                                <div>
                                                    <h4>Pickup</h4>
                                                    <p>{val.InOut?.[0].from}</p>
                                                </div>
                                                <div>
                                                    <h4>Drop Off</h4>
                                                    <p>{val.InOut?.[0].to}</p>
                                                </div>
                                                <div>
                                                    <h4>Pickup Date & Time</h4>
                                                    <p><b>Arrival: </b>{val?.InOut[0]?.pickupTimeForArrival?.split("T")[0]} &nbsp;
                                                        ({val?.InOut[0]?.arrivalPickupTime?.split("T")[0]})
                                                    </p>
                                                    {val.selectedTripType === "ROUND_TRIP" && (
                                                        <p><b>Departure: </b>{val?.InOut[1]?.pickupTimeForDeparture?.split("T")[0]} &nbsp;
                                                            ({val?.InOut[1]?.departurePickupTime?.split("T")[0]})
                                                        </p>
                                                    )}
                                                </div>
                                                <div>
                                                    <h4>Total Cost </h4>
                                                    <p><b>AED {val.finalCost}</b></p>
                                                </div>
                                            </div>
                                            {id < transferData.length - 1 && (
                                                <hr style={{ margin: "0" }} />
                                            )}
                                        </>
                                    })}
                                </div>
                            </>
                        )}
                        <hr />
                        <div className="booking-main-container" style={{ paddingTop: "10px" }}>
                            <h2>Booking Details</h2>
                            <div className="agent-booking-passenger-details">
                                <div>
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
                                    <p><b>AED {bookingDetail[0].totalCost}</b></p>
                                </div>
                            </div>
                        </div>
                        <hr />
                        {/* {bookingDetail[0].bookingStatus === "complete" && ( */}
                        {/* <div className="download-voucher">
                            <button onClick={generatePDF}>Download voucher</button>
                        </div> */}
                        {/* )}  */}
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
