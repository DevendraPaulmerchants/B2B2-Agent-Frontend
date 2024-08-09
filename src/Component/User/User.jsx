import React, { useState, useEffect } from "react";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { useCart } from '../context/CartContext';
import { APIPath } from "../../Config";
import BookingDetails from "./BookingDetail";
import './User.css';

const User = () => {
    document.body.style.overflow='auto';
    const { agentName, token } = useCart();
    const [bookingData, setBookingData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [seebookingdetails, setBookingDetails] = useState(false);
    const [bookingdetailId, setBookingdetailId] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 15;

    useEffect(() => {
        if(token){
            fetch(`${APIPath}/api/v1/agent/booking`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                method: 'GET',
                mode: 'cors',
            }).then((res) => res.json())
                .then((data) => {
                    console.log(data.data)
                    setBookingData(data.data);
                    setLoading(false);
                })
                .catch((err) => {
                    alert(err);
                    setLoading(false);
                });
        }
    }, [token]);

    const seeDetails = (id) => {
        setBookingDetails(true);
        setBookingdetailId(id);
    };

    const donotseeDetails = () => {
        setBookingDetails(false);
    };

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = bookingData?.slice(indexOfFirstItem, indexOfLastItem);

    const paginate = pageNumber => setCurrentPage(pageNumber);

    return (
        <>
            <div className="agent-booking-container">
                <h5 style={{ textTransform: "capitalize" }}> welcome {agentName}</h5>

                {loading ? (
                    <div className="loader"></div>
                ) : (
                    <>
                        {currentItems?.length > 0 ? (
                            <>
                                <table>
                                    <thead>
                                        <tr>
                                            <th>ID</th>
                                            <th>Customer Name</th>
                                            <th>Customer Email</th>
                                            <th>Type</th>
                                            <th>Amount</th>
                                            <th>Date of Booking</th>
                                            <th>Booking Status</th>
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
                                                        (val.bookingStatus === "Cancelled" && "rejected") }>
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
                            <div>
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

export default User;
