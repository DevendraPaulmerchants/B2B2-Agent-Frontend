import React, { useState } from "react";
import { APIPath } from "../../Config";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import { IoMdClose } from "react-icons/io";
import './AddHotel.css';
const AddHotel=({countryId,cityId})=>{
    const {token,addNewHotel,setAddNewHotel}=useCart();
    document.body.style.overflow='hidden';
    // console.log("countryId",countryId,"CityId",cityId)
    const [hotelName,setHotelName]=useState('');
    const [hotelAddress,setHotelAddress]=useState('');
    const [hotelZipCode,setHotelZipCode]=useState('');
    const navigate=useNavigate();
    const cancelHotel=()=>{
        setAddNewHotel(false)
        console.log(addNewHotel)
    }
    const hotelObj={
        name:hotelName,
        location:{
            address:hotelAddress,
            cityId:cityId,
            countryId:countryId,
            zipCode:hotelZipCode
        }
    }
    const addNewHotelName=()=>{
        console.log(hotelObj)
      fetch(`${APIPath}/api/v1/agent/hotel`, {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        method: 'POST',
        mode: 'cors',
        body:JSON.stringify(hotelObj)
    })
        .then((res) => res.json())
        .then((data) => {
            if(data.message === 'success'){
                alert("Hotel added successfully");
                setAddNewHotel(false)
            }else{
                alert("Please check all the field")
            }
        })
        .catch((err) => (
            alert(err)
        ))
    }
    return<>
            <div className="add-hotel-container">
               <div className="add-hotel-form">
                <div className="add-hotel-top-header">
                  <h2>Add New Hotel</h2>
                  <h2 id="close" onClick={cancelHotel}><IoMdClose/></h2>
                </div>
                <form>
                    <div className="add-hotel-form-container">
                        <div className="add-hotel-name">
                            <label htmlFor="hotelName">Hotel Name</label>
                            <input type="text" placeholder="Enter Hotel Name.." required
                            value={hotelName}
                            onChange={(e)=>{
                                e.preventDefault();
                                setHotelName(e.target.value);
                            }}
                            />
                        </div>
                        <div className="add-hotel-name">
                            <label htmlFor="hotelName">Hotel Address</label>
                            <textarea type="text" placeholder="Enter Hotel Address.." required
                            value={hotelAddress}
                            onChange={(e)=>{
                                e.preventDefault();
                                setHotelAddress(e.target.value)
                            }}
                            />
                        </div>
                        <div className="add-hotel-name">
                            <label htmlFor="hotelName">Zip Code</label>
                            <input type="text" placeholder="Enter Zip Code.." required 
                             value={hotelZipCode}
                             minLength={6} 
                             maxLength={6}
                            onChange={(e) => {
                                const input = e.target.value;
                                const regex = /^[0-9\b]+$/; 
                                if (input === '' || regex.test(input)) {
                                    setHotelZipCode(input);
                                }
                             }}
                             />
                        </div>
                    </div>
                    <div className="add-hotel-btn">
                        <button id="cancel" onClick={cancelHotel}>Cancel</button>
                        <button id="add-hotel"
                        onClick={(e)=>{
                            e.preventDefault();
                            addNewHotelName()
                        }}
                        >Add Hotel</button>
                    </div>
                    
                </form>
                 
               </div>
      </div>
    </>
}
export default AddHotel;



















// ----------------------------

// import React, { useState, useEffect } from "react";
// import { APIPath } from "../../Config";
// import { useCart } from "../context/CartContext";
// import './AddHotel.css';

// const AddHotel = ({ countryId, cityId }) => {
//     const { token, addNewHotel, setAddNewHotel } = useCart();
//     const [hotelName, setHotelName] = useState('');
//     const [hotelAddress, setHotelAddress] = useState('');
//     const [hotelZipCode, setHotelZipCode] = useState('');

//     useEffect(() => {
//         document.body.style.overflow = addNewHotel ? 'hidden' : 'unset';
//     }, [addNewHotel]);

//     const cancelHotel = () => {
//         setAddNewHotel(false);
//     };

//     const hotelObj = {
//         name: hotelName,
//         location: {
//             address: hotelAddress,
//             cityId: cityId,
//             countryId: countryId,
//             zipCode: hotelZipCode
//         }
//     };

//     const addNewHotelName = () => {
//         fetch(`${APIPath}/api/v1/agent/hotel`, {
//             headers: {
//                 'Authorization': `Bearer ${token}`,
//                 'Content-Type': 'application/json'
//             },
//             method: 'POST',
//             mode: 'cors',
//             body: JSON.stringify(hotelObj)
//         })
//         .then((res) => res.json())
//         .then((data) => {
//             console.log(data);
//         })
//         .catch((err) => (
//             alert(err)
//         ));
//     };

//     return (
//         <div className="add-hotel-container">
//             <div className="add-hotel-form">
//                 <div className="add-hotel-top-header">
//                     <h2>Add New Hotel</h2>
//                     <h4 onClick={cancelHotel}>close</h4>
//                 </div>
//                 <form>
//                     <div className="add-hotel-form-container">
//                         <div className="add-hotel-name">
//                             <label htmlFor="hotelName">Hotel Name</label>
//                             <input
//                                 type="text"
//                                 placeholder="Enter Hotel Name.."
//                                 required
//                                 value={hotelName}
//                                 onChange={(e) => setHotelName(e.target.value)}
//                             />
//                         </div>
//                         <div className="add-hotel-name">
//                             <label htmlFor="hotelName">Hotel Address</label>
//                             <textarea
//                                 type="text"
//                                 placeholder="Enter Hotel Address.."
//                                 required
//                                 value={hotelAddress}
//                                 onChange={(e) => setHotelAddress(e.target.value)}
//                             />
//                         </div>
//                         <div className="add-hotel-name">
//                             <label htmlFor="hotelName">Zip Code</label>
//                             <input
//                                 type="number"
//                                 placeholder="Enter Zip Code.."
//                                 required
//                                 value={hotelZipCode}
//                                 onChange={(e) => setHotelZipCode(e.target.value)}
//                             />
//                         </div>
//                     </div>
//                     <div className="add-hotel-btn">
//                         <button onClick={cancelHotel}>Cancel</button>
//                         <button
//                             onClick={(e) => {
//                                 e.preventDefault();
//                                 addNewHotelName();
//                             }}
//                         >
//                             Add Hotel
//                         </button>
//                     </div>
//                 </form>
//             </div>
//         </div>
//     );
// };

// export default AddHotel;
