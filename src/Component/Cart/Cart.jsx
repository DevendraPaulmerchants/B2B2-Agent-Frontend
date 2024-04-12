import React, { useEffect, useState } from "react";
import { APIPath } from "../../Config";
import { useCart } from "../context/CartContext";
import './Cart.css';
// import Checkout from "../Checkout/Checkout";
import { useNavigate } from "react-router-dom";
import Footer from "../Footer/Footer";

const Cart = () => {
  const navigate = useNavigate();
  const { token, cartItem, setCartItem, cartLength, setCartLength } = useCart();
  const pkgId = "PKG123";
  const transferId = "TRF1234"

  document.body.style.overflow = 'auto';
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // const [cartItem, setCartItem] = useState(null);
  const [customer, setCustomer] = useState(null);
  const [packages, setPackages] = useState(null);
  const [attractions, setAttractions] = useState(null);
  const [landcombos, setLandcombos] = useState(null);
  const [transfers, setTransfer] = useState(null);

  useEffect(() => {
    fetch(`${APIPath}/api/v1/agent/new-cart`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      method: "GET",
      mode: "cors",
    }).then((res) => res.json())
      .then((data) => {
        // console.log(data.data[0].packages);
        // console.log(data.data[0]?.transfers);
        // console.log(customer)
        setPackages(data.data[0]?.packages);
        setAttractions(data.data[0]?.attractions);
        setLandcombos(data.data[0]?.landCombos);
        setTransfer(data.data[0]?.transfers)
        setCustomer(data.data[0]?.customerDetails)
        setCartItem(data.data)
        console.log(cartItem)
        setCartLength(data.data.length)
      })
      .catch((err) => {
        alert(err)
      })
  }, [])

  let packageprice = 0;
  packages?.forEach((val, id) => {
    if (val.totalCost && !isNaN(val.totalCost)) {
      packageprice = packageprice + val.totalCost;
    }
  });

  let attractionprice = 0;
  attractions?.forEach((val, id) => {
    if (val.totalCost && !isNaN(val.totalCost)) {
      attractionprice = attractionprice + val.totalCost;
    }
  })

  let landcombosprice = 0;
  landcombos?.forEach((val, id) => {
    if (val.totalCost && !isNaN(val.totalCost)) {
      landcombosprice = landcombosprice + val.totalCost;
    }
  })
  let transferprice = 0;
  transfers?.forEach((val, id) => {
    if (val.totalCost && !isNaN(val.totalCost)) {
      transferprice += val.totalCost;
    }
  })
  let vat = parseInt((packageprice + attractionprice + landcombosprice + transferprice) * 5 / 100);

  let totalCost = packageprice + attractionprice + landcombosprice + transferprice;

  return <>
    <div className="cart-container-main">
      <div className="cart-container">
        <div className="cart-logo">
          <div>
            <img src='/mycart.svg' alt="cart logo" />
          </div>
          <div>
            <h4>MY CART</h4>
          </div>
        </div>
        { packages?.length > 0 && (
              <>
              <div className="cart1-item-container">
              <div className="card-item-container">
           { packages?.map((val, id) => {
              return <>
                  <div className="card1-item-container-header">
                    <div className="card1-itemid">
                      <h4>#{val.packageId.slice(-4)}</h4>
                    </div>
                    <div className="cart-edit-delete-button">
                      <button>
                        <img src="/editicon.svg" />&nbsp;
                        Edit
                      </button>
                      <button>
                        <img src="/deleteicon.svg" />&nbsp;
                        Delete
                      </button>
                    </div>
                  </div>
                  <div className="card1-item-title-price">
                    <div className="card1-item-title">
                      <img src="packageicon.svg" />
                      <h2>{val?.packageTitle ? val?.packageTitle : "Package Title"}</h2>
                    </div>
                    <div className="card1-item-price">
                      <h2>AED {val.totalCost}</h2>
                    </div>
                  </div>
                </>
            })}
                <div className="card1-item-passenger-details">
                  <div className="card1-item-passenger-name">
                    <h4>Lead passenger name</h4>
                    <h2>{customer?.name}</h2>
                  </div>
                  <div className="card1-item-passenger-name">
                    <h4>Phone Number</h4>
                    <h2>{customer?.phone}</h2>
                  </div>
                  <div className="card1-item-passenger-name">
                    <h4>Email</h4>
                    <h2>{customer?.email}</h2>
                  </div>
                </div>
                <div className="card1-item-passenger-details">
                  <div className="card1-item-passenger-name">
                    <h4>No. of Adults</h4>
                    <h2>{packages?.[0].numberOfAdults}</h2>
                  </div>
                  <div className="card1-item-passenger-name">
                    <h4>No. of children</h4>
                    <h2>{packages?.[0].numberOfChildrens}</h2>
                  </div>
                </div>
                </div>
                </div>
              </>
            )}
        <hr />
        { attractions?.length > 0 && (
              <>
              <div className="cart1-item-container">
              <div className="card-item-container">
           { attractions?.map((val, id) => {
              return <>
                  <div className="card1-item-container-header">
                    <div className="card1-itemid">
                      <h4>#{val.attractionId.slice(-4)}</h4>
                    </div>
                    <div className="cart-edit-delete-button">
                      <button>
                        <img src="/editicon.svg" />&nbsp;
                        Edit
                      </button>
                      <button>
                        <img src="/deleteicon.svg" />&nbsp;
                        Delete
                      </button>
                    </div>
                  </div>
                  <div className="card1-item-title-price">
                    <div className="card1-item-title">
                      <img src="packageicon.svg" />
                      <h2>{val?.packageTitle ? val?.attractionTitel : "Attraction Title"}</h2>
                    </div>
                    <div className="card1-item-price">
                      <h2>AED {val.totalCost}</h2>
                    </div>
                  </div>
                </>
            })}
                <div className="card1-item-passenger-details">
                  <div className="card1-item-passenger-name">
                    <h4>Lead passenger name</h4>
                    <h2>{customer?.name}</h2>
                  </div>
                  <div className="card1-item-passenger-name">
                    <h4>Phone Number</h4>
                    <h2>{customer?.phone}</h2>
                  </div>
                  <div className="card1-item-passenger-name">
                    <h4>Email</h4>
                    <h2>{customer?.email}</h2>
                  </div>
                </div>
                <div className="card1-item-passenger-details">
                  <div className="card1-item-passenger-name">
                    <h4>No. of Adults</h4>
                    <h2>{attractions?.[0].numberOfAdults}</h2>
                  </div>
                  <div className="card1-item-passenger-name">
                    <h4>No. of children</h4>
                    <h2>{attractions?.[0].numberOfChildrens}</h2>
                  </div>
                </div>
                </div>
                </div>
              </>
            )}
        <hr />
        { landcombos?.length > 0 && (
              <>
              <div className="cart1-item-container">
              <div className="card-item-container">
           { landcombos?.map((val, id) => {
              return <>
                  <div className="card1-item-container-header">
                    <div className="card1-itemid">
                      <h4>#{val.landComboId.slice(-4)}</h4>
                    </div>
                    <div className="cart-edit-delete-button">
                      <button>
                        <img src="/editicon.svg" />&nbsp;
                        Edit
                      </button>
                      <button>
                        <img src="/deleteicon.svg" />&nbsp;
                        Delete
                      </button>
                    </div>
                  </div>
                  <div className="card1-item-title-price">
                    <div className="card1-item-title">
                      <img src="packageicon.svg" />
                      <h2>{val?.LandComboTitle ? val?.LandComboTitle : "LandCombo Title"}</h2>
                    </div>
                    <div className="card1-item-price">
                      <h2>AED {val.totalCost}</h2>
                    </div>
                  </div>
                </>
            })}
                <div className="card1-item-passenger-details">
                  <div className="card1-item-passenger-name">
                    <h4>Lead passenger name</h4>
                    <h2>{customer?.name}</h2>
                  </div>
                  <div className="card1-item-passenger-name">
                    <h4>Phone Number</h4>
                    <h2>{customer?.phone}</h2>
                  </div>
                  <div className="card1-item-passenger-name">
                    <h4>Email</h4>
                    <h2>{customer?.email}</h2>
                  </div>
                </div>
                <div className="card1-item-passenger-details">
                  <div className="card1-item-passenger-name">
                    <h4>No. of Adults</h4>
                    <h2>{attractions?.[0].numberOfAdults}</h2>
                  </div>
                  <div className="card1-item-passenger-name">
                    <h4>No. of children</h4>
                    <h2>{attractions?.[0].numberOfChildrens}</h2>
                  </div>
                </div>
                </div>
                </div>
              </>
            )}
        <hr/>
        {transfers?.length >0 && (
          <>
        <div className="cart2-item-container">
          {transfers?.map((val, id) => {
            return <>
              <div className="card1-item-container-header">
                <div className="card1-itemid">
                  <h4>#{val.transferId.slice(-4)}</h4>
                </div>
                <div className="cart-edit-delete-button">
                  <button>
                    <img src="/editicon.svg" />&nbsp;
                    Edit
                  </button>
                  <button>
                    <img src="/deleteicon.svg" />&nbsp;
                    Delete
                  </button>
                </div>
              </div>
              <div className="card1-item-title-price">
                <div className="card1-item-title">
                  <img src="transfericon.svg" />
                  <h2>{val._id.slice(-8)}</h2>
                  <p>{val.selectedTripType}</p>
                  <p>Tata Sumo</p>
                </div>
                <div className="card1-item-price">
                  <h2>AED 220</h2>
                </div>
              </div>
              <div className="card1-item-passenger-details">
                <div className="card1-item-passenger-name" style={{ marginBottom: "1rem" }}>
                  <h4>Pick Up</h4>
                  <h2>Dubai International Airport</h2>
                </div>
                <div className="card1-item-passenger-name" style={{ maxWidth: "140px" }}>
                  <h4>Drop off</h4>
                  <h2>Taj Dubai</h2>
                </div>
                <div className="card1-item-passenger-name">
                  <h4>Pick up dates & time</h4>
                  <div className="cart-item-arrival">
                    <h4>Arrival</h4>
                    <h2>{val.pickupTimeForArrival} ({val.arrivalPickupTime})</h2>
                  </div>
                  {val.selectedTripType !== "ONE_WAY" && (
                    <div className="cart-item-arrival">
                      <h4>Departure</h4>
                      <h2>{val.pickupTimeForDeparture} ({val.departurePickupTime})</h2>
                    </div>
                  )}

                </div>
              </div>
            </>
          })}
          <div className="card1-item-passenger-details">
            <div className="card1-item-passenger-name">
              <h4>Lead passenger name</h4>
              <h2>{customer?.name}</h2>
            </div>
            <div className="card1-item-passenger-name">
              <h4>Phone Number</h4>
              <h2>{customer?.phone}</h2>
            </div>
            <div className="card1-item-passenger-name">
              <h4>Email</h4>
              <h2>{customer?.email}</h2>
            </div>

          </div>
          <div className="card1-item-passenger-details" style={{ paddingBottom: "2rem" }}>
            <div className="card1-item-passenger-name">
              <h4>No. of Adults</h4>
              <h2>{transfers?.[0].numberOfAdults}</h2>
            </div>
            <div className="card1-item-passenger-name">
              <h4>No. of children</h4>
              <h2>{transfers?.[0].numberOfChildrens}</h2>
            </div>
          </div>
        </div>
          </>
        )}    
      </div>
      <div className="cart-price-container-main">
        <div className="cart-price-container">
          <h2>FARE BREAK UP</h2>
          {packageprice > 0 && (
            <div className="cart-price-type">
              <h4>Package cost</h4>
              <h3>AED {packageprice}</h3>
            </div>
          )}
          {attractionprice > 0 && (
            <div className="cart-price-type">
              <h4>Attraction cost</h4>
              <h3>AED {attractionprice}</h3>
            </div>
          )}
          {landcombosprice > 0 && (
            <div className="cart-price-type">
              <h4>Land Combo cost</h4>
              <h3>AED {landcombosprice}</h3>
            </div>
          )}
          {transferprice > 0 && (
            <div className="cart-price-type">
              <h4>Transfer cost</h4>
              <h3>AED {transferprice}</h3>
            </div>
          )}
          <div className="cart-price-type">
            <h4>Vat(5%)</h4>
            <h3>AED {vat}</h3>
          </div>
          <hr />
          <div className="cart-price-type" style={{ paddingBottom: "1rem" }}>
            <h4>Total</h4>
            <h3>AED {totalCost}</h3>
          </div>
        </div>
        <div className="cart-price-button">
          <button>Book Now</button>
        </div>
        <div className="cart-delete-button">
          <button>Delete All</button>
        </div>
      </div>
    </div>
    <Footer />
  </>
}

export default Cart;

