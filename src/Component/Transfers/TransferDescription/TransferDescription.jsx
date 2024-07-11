import React, { useState } from "react";
import { IoMdClose } from "react-icons/io";
import { MdInfo } from "react-icons/md";
import { MdOutlineRoomService } from "react-icons/md";
import { SiPrivateinternetaccess } from "react-icons/si";
import './TransferDescription.css';
import BookTransfer from "../BookTransfer/BookTransfer";
import { useCart } from "../../context/CartContext";

const TransferDescription=({onClose,descriptionPageData})=>{
  document.body.style.overflow = 'hidden';
  const {bookTransfer,setBookTransfer, setDescriptionPage} =useCart();
  const bookThistransfer=()=>{
    setBookTransfer(true)
    setDescriptionPage(false)
  }
    return <>
          <div className="transferdescription">
            <div className="transfer-description-container">
                <div className="transfer-description-top">
                  <div className="generale-information-icon">
                    <div style={{paddingTop:"8px"}}><SiPrivateinternetaccess style={{fontSize:"24px"}} /></div>
                    <div><h2>{descriptionPageData.transferType}</h2></div>
                  </div>
                  <p onClick={onClose} className="onclose-function"><IoMdClose/></p>
                </div>
                <hr/> 
                <div className="transfer-description-services">
                  <div className="generale-information-icon">
                    <div><MdOutlineRoomService style={{fontSize:"24px"}}/></div>
                    <div><h2>Service</h2></div>
                  </div>
                  <hr/>
                  <br/>
                  <div className="transfer-time-minpass-maxpass-allow">
                    <div className="transfer-maxpass">
                     <div className="generale-information-icon">
                        <div>
                          <img src="/PassengerBookingPage.svg" />
                          </div>
                        <div><p><b>{descriptionPageData.vehicle.maxPassenger}</b> max. Passengers</p></div>
                      </div>
                    </div>
                    <div className="transfer-suit-allow">
                     <div className="generale-information-icon">
                        <div>
                          <img src="/suitcasebookingpage.svg" />
                          </div>
                        <div><p><b>{descriptionPageData.vehicle.suitCaseAllowed}</b> max. Suitcase allowed</p></div>
                      </div>   
                    </div>
                    <div className="transfer-suit-allow">
                     <div className="generale-information-icon">
                        <div>
                          <img src="handbagbookingpage.svg" />
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
                    <p>Remember to bring a printed copy of the voucher and valid photo 
                      ID with You after booking completion.</p>
                </div>
                <hr/>
                <div className="transfer-description-btn">
                  <div className="trnasfer-description-btn-space">
                    &nbsp;
                  </div>
                  <div className="trnasfer-description-btn-block">
                    <button id="cancel" onClick={onClose}>Cancel</button>
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
            {bookTransfer && < BookTransfer />}

          </div>
    </>
}
export default TransferDescription;