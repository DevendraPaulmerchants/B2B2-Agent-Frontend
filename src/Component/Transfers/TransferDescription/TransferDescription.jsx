import React, { useState } from "react";
import { IoMdClose } from "react-icons/io";
import { MdInfo } from "react-icons/md";
import { MdOutlineRoomService } from "react-icons/md";
import { SiPrivateinternetaccess } from "react-icons/si";
import { TiTick } from "react-icons/ti";
import SelectTransfer from "../SelectTransfer/SelectTransfer";
import './TransferDescription.css';
import { useNavigate } from "react-router-dom";
import BookTransfer from "../BookTransfer/BookTransfer";
import { useCart } from "../../context/CartContext";

const TransferDescription=({onClose,descriptionPageData,tripType})=>{
  document.body.style.overflow = 'hidden';
  const [transferpage,setTransferPage]=useState(false)
  // const [booktransfer,setBookTransfer]=useState(false)
  const {bookTransfer,setBookTransfer,descriptionPage, setDescriptionPage,transferDetails} =useCart();
  const navigate =useNavigate()
  console.log(transferDetails)
  const selectTransfer=()=>{
    setTransferPage(true)
  }
  const bookThistransfer=()=>{
    setBookTransfer(true)
    setDescriptionPage(false)
  }
    return <>
          <div className={transferpage ?"": "transferdescription"}>
            <div className="transfer-description-container">
                <div className="transfer-description-top">
                  <div className="generale-information-icon">
                    <div style={{paddingTop:"8px"}}><SiPrivateinternetaccess style={{fontSize:"24px"}} /></div>
                    <div><h2>{descriptionPageData.transferType}</h2></div>
                  </div>
                  <p onClick={onClose} className="onclose-function"><IoMdClose/></p>
                </div>
                <hr/>
                {/* <div className="transfer-description-standard">
                     <h3>{descriptionPageData.vehicle.class}</h3>
                     <hr/>
                </div> */}
                
                <div className="transfer-description-services">
                  <div className="generale-information-icon">
                    <div><MdOutlineRoomService style={{fontSize:"24px"}}/></div>
                    <div><h2>Service</h2></div>
                  </div>
                  <hr/>
                  <br/>
                  <div className="transfer-time-minpass-maxpass-allow">
                    {/* <div className="transfer-time">
                      <div className="generale-information-icon">
                        <div><TiTick style={{fontSize:"24px", color:"green"}} /></div>
                        <div><p><b>{descriptionPageData.durationMinutes} </b>Min</p></div>
                      </div>
                    </div> */}
                    {/* <div className="transfer-minpass">
                      <div className="generale-information-icon">
                        <div><TiTick style={{fontSize:"24px", color:"green"}} /></div>
                        <div><p><b>{descriptionPageData.vehicle.minPassenger}</b> min. Passengers</p></div>
                      </div>
                    </div> */}
                    <div className="transfer-maxpass">
                     <div className="generale-information-icon">
                        <div>
                          <img src="/PassengerBookingPage.svg" />
                          {/* <TiTick style={{fontSize:"24px", color:"green"}} /> */}
                          </div>
                        <div><p><b>{descriptionPageData.vehicle.maxPassenger}</b> max. Passengers</p></div>
                      </div>
                    </div>
                    <div className="transfer-suit-allow">
                     <div className="generale-information-icon">
                        <div>
                          <img src="/suitcasebookingpage.svg" />
                          {/* <TiTick style={{fontSize:"24px", color:"green"}} /> */}
                          </div>
                        <div><p><b>{descriptionPageData.vehicle.suitCaseAllowed}</b> max. Suitcase allowed</p></div>
                      </div>   
                    </div>
                    <div className="transfer-suit-allow">
                     <div className="generale-information-icon">
                        <div>
                          <img src="handbagbookingpage.svg" />
                          {/* <TiTick style={{fontSize:"24px", color:"green"}} /> */}
                          </div>
                        <div><p><b>{descriptionPageData.vehicle.handbagAllowed}</b> max. Handbag allowed</p></div>
                      </div>   
                    </div>

                  </div>
                  <hr/>
                </div>
                <div className="general-information">
                    <div className="generale-information-icon">
                       <div><MdInfo style={{fontSize:"24px"}}/></div>
                       <div><h4>General Information</h4></div>
                    </div>
                    <p>Remember to bring a printed copy of this voucher and valid photo ID with You.</p>
                </div>
                <hr/>
                <div className="transfer-description-btn">
                  <div className="trnasfer-description-btn-space">
                    &nbsp;
                  </div>
                  <div className="trnasfer-description-btn-block">
                    <button id="cancel" onClick={onClose}>Cancel</button>
                    {/* <button id="select"
                    onClick={() => { 
                      selectTransfer(); 
                    }}
                    >Select Transfer</button> */}
                    <button id="select" 
                    onClick={()=>{
                      bookThistransfer();
                    }}
                    >
                      Book Transfer
                    </button>
                  </div>
                </div>
            </div>
            {/* {transferpage && <SelectTransfer onClose={onClose} 
            selectTransferPageData={descriptionPageData} 
            tripType={tripType} />} */}

            {bookTransfer && < BookTransfer />}

          </div>
    </>
}
export default TransferDescription;