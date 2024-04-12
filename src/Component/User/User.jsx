import React, { useState, useEffect } from "react";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { useCart } from '../context/CartContext';
import { APIPath } from "../../Config";
import BookingDetails from "./BookingDetail";
// import { writeFile } from 'xlsx';
// import { saveAs } from 'file-saver';
import './User.css';

const User = () => {
    document.body.style.overflow='auto';
    const { agentName, token } = useCart();
    const [bookingData, setBookingData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [seebookingdetails,setBookingDetails]=useState(false)
    const [bookingdetailId,setBookingdetailId]=useState('');
    useEffect(() => {
        fetch(`${APIPath}/api/v1/agent/booking`, {
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
                setBookingData(data.data)
                // setOriginalPackages(data.data)
                setLoading(false)
                // }, 2000)
            })
            .catch((err) => {
                alert(err)
                setLoading(false)
            })
    }, [])
    const seeDetails=(id)=>{
        setBookingDetails(true)
        setBookingdetailId(id)
    }
    const donotseeDetails=()=>{
        setBookingDetails(false)
    }

    // const exportToExcel = () => {
    //     const header = ['ID', 'Customer Name', 'Customer Email', 'Type', 'Amount', 'Date of Booking', 'Booking Status'];
    //     const data = bookingData?.map(val => [val.bookingID, val.customerDetails.name, val.customerDetails.email, val.bookingType, val.totalCost, val.createdAt.split("T")[0], val.bookingStatus]);
    //     const ws = { SheetNames: ['Sheet1'], Sheets: { 'Sheet1': [...[header], ...data] } };
    //     const wb = { Sheets: ws, SheetNames: ['Sheet1'] };
    //     const excelBuffer = writeFile(wb, { bookType: 'xlsx', type: 'buffer' });
    //     saveAs(new Blob([excelBuffer], { type: 'application/octet-stream' }), 'booking_data.xlsx');
    // };
    
    return <>
        <div className="agent-booking-container">
            <h5 style={{ textTransform: "capitalize" }}> welcome {agentName}</h5>
            {/* <button onClick={exportToExcel}>Download as Excel</button> */}

            {loading ? (<div className="loader">

            </div>) : (
                <>
                {bookingData?.length > 0 ? (
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
                                {/* <th>Date of Journey</th> */}
                                <th>Booking Status</th>
                                {/* <th>Actions</th> */}
                                <th>Details</th>
                            </tr>
                            </thead>
                            <tbody>
                                    {bookingData?.map((val, id) => {
                                        return <>
                                            <tr key={id}>
                                                <td>{val.bookingID}</td>
                                                {/* <td>{val._id.slice(-4)}</td> */}
                                                {/* <td>{`PKG_${val._id.slice(-4)}`}</td> */}
                                                <td>{val.customerDetails.name}</td>
                                                <td>{val.customerDetails.email}</td>
                                                <td>{val.bookingType}</td>
                                                {/* <td>{val.createdAt.split("T")[0]}</td> */}
                                                <td>{val.totalCost}</td>
                                                <td>{val.createdAt.split("T")[0]}</td>
                                                <td>{val.bookingStatus}</td>
                                                <td className="agent-view-booking">
                                                   <button onClick={()=>{
                                                    seeDetails(val._id)
                                                   }}>
                                                     <MdOutlineRemoveRedEye/>
                                                   </button>
                                                </td>
                                            </tr>
                                        </>
                                    })}
                            </tbody>
                        </table>
                    </>
                ):(
                    <div>
                        <h2>No Data Found</h2>
                    </div>
                )}
                    
                </>
            )}
        </div>
      {seebookingdetails && <BookingDetails  onClose={donotseeDetails} bookingId={bookingdetailId} />}
    </>
}
export default User;