import React, { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { APIPath } from "../../Config";
import Footer from '../Footer/Footer';

function UserDetails() {
    document.body.style.overflow = 'auto';
    const { token, userId } = useCart();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (token) {
            fetch(`${APIPath}/api/v1/agent/account`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                method: 'GET',
                mode: 'cors',
            }).then((res) => res.json())
                .then((data) => {
                    setUser(data.data);
                    console.log(data.data)
                    setLoading(false);
                })
                .catch((err) => {
                    alert(err);
                    setLoading(false);
                });
        }
    }, [token]);

    return <>
        {loading ? <div className='loader'></div> :
            <div className='user-details-container'>
                <div className='user-details-header'>
                    <img src='userIcon.svg' alt='User Icon' />
                    <h2>{user?.[0].agentName}</h2>
                </div>
                <div className='user-details'>
                    <table>
                        <tr>
                            <td>
                                <div className='user-name'>
                                    <h3>Name</h3>
                                    <p>{user?.[0].agentName}</p>
                                </div>
                            </td>
                            <td>
                                <div className='user-name'>
                                    <h3>Mobile</h3>
                                    <p>+{user?.[0].agentPhoneNumber}</p>
                                </div>
                            </td>
                            <td>
                                <div className='user-name'>
                                    <h3>Email</h3>
                                    <p>{user?.[0].email}</p>
                                </div>
                            </td>
                            <td>
                                <div className='user-name'>
                                    <h3>UserId</h3>
                                    <p>{user?.[0].userId}</p>
                                </div>
                            </td>
                        </tr>
                        <br />
                        <tr>
                            <td>
                                <div className='user-name'>
                                    <h3>Address</h3>
                                    <p>{user?.[0].address}</p>
                                </div>
                            </td>
                            <td>
                                <div className='user-name'>
                                    <h3>Owner Name</h3>
                                    <p>{user?.[0].ownerName}</p>
                                </div>
                            </td>
                            <td>
                                <div className='user-name'>
                                    <h3>Total Bookings</h3>
                                    <p>{user?.[0].totalBookings ? user?.[0].totalBookings : 0}</p>
                                </div>
                            </td>
                            <td>
                                <div className='user-name'>
                                    <h3>Total Revenue</h3>
                                    <p>AED {user?.[0].totalRevenue ? user?.[0].totalRevenue : 0}</p>
                                </div>
                            </td>
                        </tr>
                    </table>
                </div>
            </div>
        }
        <Footer />
    </>
}

export default UserDetails;