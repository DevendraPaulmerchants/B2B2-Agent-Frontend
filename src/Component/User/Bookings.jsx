import React, { useState, useEffect } from "react";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { TbSearch } from "react-icons/tb";
import { useCart } from '../context/CartContext';
import { APIPath } from "../../Config";
import BookingDetails from "./BookingDetail";
import './User.css';

const Bookings = () => {
    document.body.style.overflow = 'auto';
    const { agentName, token } = useCart();
    const [bookingData, setBookingData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [seebookingdetails, setBookingDetails] = useState(false);
    const [bookingdetailId, setBookingdetailId] = useState('');
    const [bookingStatus, setBookingStatus] = useState('');
    const [bookingId, setBookingId] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 15;

    useEffect(() => {
        if (token) {
            fetch(`${APIPath}/api/v1/agent/booking`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                method: 'GET',
                mode: 'cors',
            }).then((res) => res.json())
                .then((data) => {
                    // console.log(data.data);
                    if (bookingStatus === "Pending") {
                        const pendingdata = data.data.filter((data) => data.bookingStatus === "Pending")
                        setBookingData(pendingdata);
                    }
                    else if (bookingStatus === "Awaiting Payment") {
                        const waitingData = data.data.filter(item => item.bookingStatus === "Awaiting Payment");
                        setBookingData(waitingData);
                    }
                    else if (bookingStatus === "On Hold") {
                        const holdData = data.data.filter(item => item.bookingStatus === "On Hold");
                        setBookingData(holdData);
                    }
                    else if (bookingStatus === "Confirmed") {
                        const confirmData = data.data.filter(item => item.bookingStatus === "Confirmed");
                        setBookingData(confirmData);
                    }
                    else if (bookingStatus === "Rejected") {
                        const rejectedData = data.data.filter(item => item.bookingStatus === "Rejected");
                        setBookingData(rejectedData);
                    }
                    else {
                        setBookingData(data.data);
                    }
                    setLoading(false);
                })
                .catch((err) => {
                    alert(err);
                    setLoading(false);
                });
        }
    }, [token, bookingStatus]);

    const seeDetails = (id) => {
        setBookingDetails(true);
        setBookingdetailId(id);
    };

    const donotseeDetails = () => {
        setBookingDetails(false);
    };

    const filterdata = bookingData?.filter(item =>
        item.bookingID?.toLowerCase().includes(bookingId.toLowerCase())
    );

    // Apply pagination after filtering
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filterdata && filterdata?.slice(indexOfFirstItem, indexOfLastItem);

    // const indexOfLastItem = currentPage * itemsPerPage;
    // const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    // const currentItems = bookingData && bookingData?.slice(indexOfFirstItem, indexOfLastItem);

    // const filterdata = currentItems?.filter(item =>
    //     item.bookingID?.toLowerCase().includes(bookingId.toLowerCase())
    // );


    const paginate = pageNumber => setCurrentPage(pageNumber);
    const revenue = bookingData?.filter((val, id) => val.bookingStatus === "Confirmed");

    let revenueByAgent = 0;
    for (let i = 0; i < revenue?.length; i++) {
        revenueByAgent += revenue[i].totalCost;
    }

    return (
        <>
            <div className="agent-booking-container">
                <div className="agent-booking-search-revenue">
                    <div className="booking-search-and-status">
                        <div className="agent-search">
                            <input type="text" value={bookingId} placeholder="Search by bookingId"
                                onChange={(e) => {
                                    setBookingId(e.target.value)
                                }}
                            />
                            <TbSearch style={{ color: "skyblue" }} />
                        </div>
                        <div className="booking-status">
                            <select value={bookingStatus} id="booking-status"
                                onChange={(e) => {
                                    setBookingStatus(e.target.value);
                                }}
                            >
                                <option value="" disabled>Booking Status</option>
                                <option value="All">All</option>
                                <option value="Pending">Pending</option>
                                <option value="Awaiting Payment">Awaiting Payment</option>
                                <option value="On Hold">On Hold</option>
                                <option value="Rejected">Rejected</option>
                                <option value="Confirmed">Confirmed</option>
                            </select>
                        </div>
                    </div>
                    <div className="agent-booking-revenue">
                        <h2>Total Bookings: <span>{bookingData?.length}</span></h2>
                        <h2>Total Revenue: <span>AED {revenueByAgent}</span></h2>
                    </div>
                </div>

                {loading ? (
                    <div className="loader"></div>
                ) : (
                    <>
                        {currentItems?.length > 0 ? (
                            <>
                                <table>
                                    <thead>
                                        <tr>
                                            <th>BookingId</th>
                                            <th>Customer Name</th>
                                            <th>Customer Email</th>
                                            <th>Type</th>
                                            <th>Amount</th>
                                            <th>Date of Booking</th>
                                            <th>Booking Status
                                                {/* <select value={bookingStatus} id="booking-status"
                                                    onChange={(e) => {
                                                        setBookingStatus(e.target.value);
                                                    }}
                                                >
                                                    <option value="" disabled>Booking Status</option>
                                                    <option value="All">All</option>
                                                    <option value="Pending">Pending</option>
                                                    <option value="Awaiting Payment">Awaiting Payment</option>
                                                    <option value="On Hold">On Hold</option>
                                                    <option value="Rejected">Rejected</option>
                                                    <option value="Confirmed">Confirmed</option>
                                                </select> */}
                                            </th>
                                            <th>Details</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {currentItems?.map((val, id) => (
                                            <tr key={id}>
                                                <td>{val.bookingID}</td>
                                                <td>{val.customerDetails.name}</td>
                                                <td>{val.customerDetails.email}</td>
                                                <td>{val.bookingType}</td>
                                                <td>{val.totalCost}</td>
                                                <td>{val.createdAt.split("T")[0]}</td>
                                                <td>
                                                    <p id={(val.bookingStatus === "Pending" && "pending") ||
                                                        (val.bookingStatus === "On Hold" && "on-hold") ||
                                                        (val.bookingStatus === "Awaiting Payment" && "Awaiting_Payment") ||
                                                        (val.bookingStatus === "Confirmed" && "confirm") ||
                                                        (val.bookingStatus === "Rejected" && "rejected") ||
                                                        (val.bookingStatus === "Cancelled" && "rejected")}>
                                                        {val.bookingStatus}
                                                    </p>
                                                </td>
                                                <td className="agent-view-booking">
                                                    <button onClick={() => seeDetails(val._id)}>
                                                        <MdOutlineRemoveRedEye />
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                                <div className="pagination">
                                    {[...Array(Math.ceil(bookingData.length / itemsPerPage)).keys()].map(number => (
                                        <button className={currentPage === number + 1 ? "clicked" : ""}
                                            key={number + 1} onClick={() => paginate(number + 1)}>
                                            {number + 1}
                                        </button>
                                    ))}
                                </div>
                            </>
                        ) : (
                            <div style={{paddingTop:'1rem'}}>
                                <h2>No Data Found</h2>
                            </div>
                        )}
                    </>
                )}
            </div>
            {seebookingdetails && <BookingDetails onClose={donotseeDetails} bookingId={bookingdetailId} />}
        </>
    );
};

export default Bookings;
