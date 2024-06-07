import React, { useState } from "react";
import './SelectTransfer.css';
import { IoMdClose } from "react-icons/io";
import { SiPrivateinternetaccess } from "react-icons/si";
import { TiShoppingCart } from "react-icons/ti";
import {APIPath} from "../../../Config";
import { useNavigate } from "react-router-dom";
import {useCart} from "../../context/CartContext"
const SelectTransfer=({onClose,selectTransferPageData,tripType})=>{
    document.body.style.overflow = 'hidden';
    const {token,adult,child,}=useCart();
    const navigate =useNavigate();
    const [flightCodeArrival,setFlightCodeArrival]=useState('');
    const [flightTimeArrival,setFlightTimeArrival]=useState('');
    const [flightCodeDeparture,setFlightCodeDeparture]=useState('');
    const [flightTimeDeparture,setFlightTimeDeparture]=useState('');
    
  function getCurrentDateTime() {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hour = String(now.getHours()).padStart(2, '0');
    const minute = String(now.getMinutes()).padStart(2, '0');
    return `${year}-${month}-${day}T${hour}:${minute}`;
  }


    const Obj = {
        transfers:[
           {
               selectedTripType:tripType,
               selectedTransferType:selectTransferPageData.type,
               arrivalPickupTime:flightTimeArrival,
               arrivalFlightCode:flightCodeArrival,
               departurePickupTime:flightTimeDeparture,
               departureFlightCode:flightCodeDeparture,
               vehicle:selectTransferPageData.vehicle.type,
               remarks:"FINDING some more Details",
               transferId:selectTransferPageData._id,
               numberOfAdults:adult,
               numberOfChildrens:child
           }
       ]
    }

    const addToCart=(e)=>{
        e.preventDefault();
        if((flightCodeArrival && flightTimeArrival) === ""){
            alert("Must fill Flight Code and Arrival Time")
        }
        else{
            fetch(`${APIPath}/api/v1/agent/cart`, {
                headers: {
                    'Authorization':  `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                method: 'POST',
                mode: 'cors',
                body: JSON.stringify(Obj)
            }).then((res) => res.json())
                .then((data) => {
                    alert(data.message)
                    navigate('/cart')
                })
                .catch((err) => {
                    alert(err)
                })
         }
    }
    return <>
     <div className="transferdescription">
            <div className="transfer-description-container1">
                <div className="transfer-description-top">
                  <div className="generale-information-icon">
                    <div><SiPrivateinternetaccess style={{fontSize:"24px"}} /></div>
                    <div>
                        <h2>{selectTransferPageData?.transferType}</h2>
                    </div>
                  </div>
                  <p onClick={onClose} className="onclose-function"><IoMdClose style={{color:"#2d7372",fontWeight:"700"}}/></p>
                </div>
                <hr/>
                <div className="transfer-details-scrollable">
                <div className="transfer-description-pick-up-details">
                     <h3>Pick-Up Time details</h3>
                     <ul>
                        <li>Please provide the following information, it is vital in order to confirm your transfer reservation. If it is not accurate, the supplier is not responsible for incorrect service provision and you may be subject to cancellation/no show fees</li>
                        <li>Please note that the desired pick-up time doesn't apply for shared transfers INVOLVING A PORT.</li>
                        <li>Customers must confirm the pick-up time by calling the supplier.</li>
                        <li>Contact details can be found on the voucher</li>
                     </ul>
                     <hr/>
                </div>
                <div className="select-transfer-input">
                       <div className="select-transfer-from-to">
                          <h2>Transfer</h2>
                        </div>
                       <div className="flight-code-time">
                        <div className="flight-code">
                            <p>Flight Code Arrival</p>
                          <input type="text" required
                          minLength={7}
                          maxLength={7}
                          value={flightCodeArrival}
                          onChange={(e)=>{
                            e.preventDefault();
                            setFlightCodeArrival(e.target.value)
                          }}
                          placeholder="E.g: VY-4562"/>
                           <p>This field is limited to 7 Characters</p>
                        </div>
                        <div className="flight-time">
                            <p>Flight Arrival Time</p>
                           <input 
                             type="datetime-local"
                             required
                             min={getCurrentDateTime()}
                             value={flightTimeArrival}
                             onChange={(e)=>{
                              e.preventDefault();
                              setFlightTimeArrival(e.target.value)
                           }}
                           
                           />
                        </div> 
                       </div>
                </div>
                <hr/>
                {tripType === 'ROUND_TRIP' && (
                    <div className="select-transfer-input">
                    <div className="select-transfer-from-to">
                       <h2>Transfer</h2>
                     </div>
                    <div className="flight-code-time">
                     <div className="flight-code">
                         <p>Flight Code Departure</p>
                       <input type="text" required
                       minLength={7}
                       maxLength={7}
                       value={flightCodeDeparture}
                       onChange={(e)=>{
                        setFlightCodeDeparture(e.target.value)
                       }}
                       placeholder="E.g: VY-4562"/>
                        <p>This field is limited to 7 Characters</p>
                     </div>
                     <div className="flight-time">
                         <p>Flight Departure Time</p>
                        <input type="datetime-local" required
                        min={getCurrentDateTime()}
                        value={flightTimeDeparture}
                        onChange={(e)=>{
                         setFlightTimeDeparture(e.target.value)
                        }}
                        />
                     </div> 
                    </div>
                </div>
                )}
                <div className="transfer-price-container">
                    <div>
                        &nbsp;
                    </div>
                    <div>
                        <p>FInal Price: <strong>{selectTransferPageData?.cost}</strong></p>
                    </div>
                </div>
                </div>
                <hr/>
                
                <div className="transfer-description-btn" id="transfer-description-btn">
                  <div className="trnasfer-description-btn-space">
                    &nbsp;
                  </div>
                  <div className="trnasfer-description-btn-block">
                    <button id="cancel" onClick={onClose}>Cancel</button>
                    <button id="select" type="submit"
                    onClick={addToCart}
                    ><TiShoppingCart style={{fontSize:"1.5rem"}} /> Add To Cart</button>
                  </div>
                </div>
            </div>
     </div>
    </>
}
export default SelectTransfer;