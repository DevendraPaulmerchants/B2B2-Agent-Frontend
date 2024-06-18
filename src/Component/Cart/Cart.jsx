import React, { useEffect, useState } from "react";
import { APIPath } from "../../Config";
import { useCart } from "../context/CartContext";
import './Cart.css';
import { useNavigate } from "react-router-dom";
import Footer from "../Footer/Footer";
import BookAttraction from "./EditAttraction";
import BookPackage from "./EditPackage";
import BookLandCombos from "./EditLandCombo";
import BookTransfer from "./EditTransfer";

const Cart = () => {
  const navigate = useNavigate();
  const { token, cartItem, setCartItem, cartLength, setCartLength } = useCart();

  document.body.style.overflow = 'auto';
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [cartId, setCartId] = useState('');
  const [customer, setCustomer] = useState(null);
  const [packages, setPackages] = useState(null);
  const [attractions, setAttractions] = useState(null);
  const [landcombos, setLandcombos] = useState(null);
  const [transfers, setTransfer] = useState(null);
  const [type, setType] = useState();
  const [pkgId, setPkgId] = useState('');
  const [editPkg, setEditPkg] = useState(false);
  const [editPkgId, setEditPkgId] = useState(false);
  const [pkgStartDate, setPkgStartDate] = useState();
  const [pkgEndDate, setPkgEndDate] = useState();
  const [editAtt, setEditAtt] = useState(false);
  const [attId, setAttId] = useState('');
  const [attDate, setAttDate] = useState();
  const [editLnC, setEditLnC] = useState(false);
  const [lncId, setLnCId] = useState('');
  const [lncStartDate, setlncStartDate] = useState();
  const [lncEndDate, setlncEndDate] = useState();
  const [editTransfer, setEditTransfer] = useState(false);
  const [trnasferId, setTransferId] = useState('');
  const [tripType, setTripType] = useState('');
  const [selectedTransferType, setselectedTransferType] = useState('');
  const [totalCost1, settotalCost] = useState();
  const [selectedDate, setselectedDate] = useState();
  const [arrivalFlightCode, setarrivalFlightCode] = useState();
  const [arrivalPickupTime, setarrivalPickupTime] = useState();
  const [departureFlightCode, setdepartureFlightCode] = useState();
  const [departurePickupTime, setdeparturePickupTime] = useState();
  const [selectedDateTo, setselectedDateTo] = useState();

  const LoadCartItem = () => {
    fetch(`${APIPath}/api/v1/agent/new-cart`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      method: "GET",
      mode: "cors",
    }).then((res) => res.json())
      .then((data) => {
        setCartId(data.data[0]?._id)
        setPackages(data.data[0]?.packages);
        setAttractions(data.data[0]?.attractions);
        setLandcombos(data.data[0]?.landCombos);
        setTransfer(data.data[0]?.transfers)
        console.log(data.data[0]?.transfers)
        setCustomer(data.data[0]?.customerDetails)
        setCartLength(
          (isNaN(data.data[0]?.attractions?.length) ? 0 : data.data[0].attractions.length) +
          (isNaN(data.data[0]?.landCombos?.length) ? 0 : data.data[0].landCombos.length) +
          (isNaN(data.data[0]?.packages?.length) ? 0 : data.data[0].packages.length) +
          (isNaN(data.data[0]?.transfers?.length) ? 0 : data.data[0].transfers.length)
        )
      })
      .catch((err) => {
        alert(err)
      })
  }

  useEffect(() => {
    LoadCartItem();
  }, []);

  let packageprice = 0;
  packages?.forEach((val, id) => {
    if (val.cost && !isNaN(val.cost)) {
      packageprice = packageprice + val.cost;
    }
  });

  let attractionprice = 0;
  attractions?.forEach((val, id) => {
    if (val.cost && !isNaN(val.cost)) {
      attractionprice = attractionprice + val.cost;
    }
  })

  let landcombosprice = 0;
  landcombos?.forEach((val, id) => {
    if (val.cost && !isNaN(val.cost)) {
      landcombosprice = landcombosprice + val.cost;
    }
  })
  let transferprice = 0;
  transfers?.forEach((val, id) => {
    if (val.finalCost && !isNaN(val.finalCost)) {
      transferprice += val.finalCost;
    }
  })
  let vat = parseInt((packageprice + attractionprice + landcombosprice + transferprice) * 5 / 100);

  let totalCost = packageprice + attractionprice + landcombosprice + transferprice + vat;

  const BookNow = () => {
    console.log("booking clicked")
    fetch(`${APIPath}/api/v1/agent/booking/custom-booking`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      method: "POST",
      mode: "cors",
      body: JSON.stringify({ "cartID": cartId })
    }).then((res) => res.json())
      .then((data) => {
        alert(data.message);
        LoadCartItem();
      })
      .catch((err) => {
        alert(err)
      })
  }

  const DeleteAll = () => {
    if (cartLength == 0) {
      alert("Cart is already empty");
      return;
    }
    fetch(`${APIPath}/api/v1/agent/new-cart`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      method: "DELETE",
      mode: "cors",
      body: JSON.stringify({ "cartId": cartId })
    }).then((res) => res.json())
      .then((data) => {
        alert(data.message);
        LoadCartItem();
      })
      .catch((err) => {
        alert(err)
      })
  }
  const ItemDelete = {
    "cartId": cartId,
    ...(type == 1 && { transferId: pkgId, type: 1 }),
    ...(type == 2 && { packageId: pkgId, type: 2 }),
    ...(type == 3 && { attractionId: pkgId, type: 3 }),
    ...(type == 4 && { landComboId: pkgId, type: 4 })
  }

  const DeleteOneItem = () => {
    fetch(`${APIPath}/api/v1/agent/new-cart/item`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      method: "DELETE",
      mode: "cors",
      body: JSON.stringify(ItemDelete)
    }).then((res) => res.json())
      .then((data) => {
        alert(data.message);
        LoadCartItem();
      })
      .catch((err) => {
        alert(err)
      })
  }

  const EditOneItem = () => {
    console.log("Item should be edited");
  }
  const onClose = () => {
    setEditAtt(false);
    setEditPkg(false);
    setEditLnC(false);
    setEditTransfer(false);
  }
  return <>
    <div className="cart-container-main">
      <div className="cart-container">
        <div className="cart-logo">
          <div>
            <img src='/shoppingcart.svg' alt="cart logo" />
          </div>
          <div>
            <h4>MY CART</h4>
          </div>
        </div>
        {packages?.length > 0 && (
          <>
            <div className="cart1-item-container">
              <div className="card-item-container">
                {packages?.map((val, id) => {
                  return <>
                    <div className="card1-item-container-header">
                      <div className="card1-itemid">
                        <h4>#Id_{val.packageId?.slice(-4)}</h4>
                      </div>
                      <div className="cart-edit-delete-button">
                        <button
                          onClick={() => {
                            setType(2);
                            setPkgId(val._id);
                            setEditPkgId(val.packageId)
                            setPkgStartDate(val.startDate?.split("T")[0]);
                            setPkgEndDate(val.endDate?.split("T")[0])
                            if (type === 2) {
                              setEditPkg(true)
                            }
                          }}
                        >
                          <img src="/editicon.svg" alt="edit" />&nbsp;
                          Edit
                        </button>
                        <button
                          onClick={() => {
                            setType(2);
                            setPkgId(val._id);
                            if (type === 2) {
                              DeleteOneItem();
                            }
                          }}
                        >
                          <img src="/deleteicon.svg" />&nbsp;
                          Delete
                        </button>
                      </div>
                    </div>
                    <div className="card1-item-title-price">
                      <div className="card1-item-title">
                        <img src="packageicon.svg" />
                        <h2>{val?.title ? val?.title : "Package Title"}</h2>
                      </div>
                      <div className="card1-item-price">
                        <h2>AED {val.cost}</h2>
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
                    <h2>+{customer?.phone}</h2>
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
            <hr />
          </>

        )}
        {attractions?.length > 0 && (
          <>
            <div className="cart1-item-container">
              <div className="card-item-container">
                {attractions?.map((val, id) => {
                  return <>
                    <div className="card1-item-container-header">
                      <div className="card1-itemid">
                        <h4>#Id_{val.attractionId.slice(-4)}</h4>
                      </div>
                      <div className="cart-edit-delete-button">
                        <button
                          onClick={() => {
                            setType(3);
                            setPkgId(val._id);
                            setAttId(val.attractionId)
                            setAttDate(val.startDate.split("T")[0])
                            if (type === 3) {
                              setEditAtt(true)
                            }

                          }}
                        >
                          <img src="/editicon.svg" alt="edit"/>&nbsp;
                          Edit
                        </button>
                        <button
                          onClick={() => {
                            setType(3);
                            setPkgId(val._id);
                            if (type === 3) {
                              DeleteOneItem();
                            }
                          }}
                        >
                          <img src="/deleteicon.svg" />&nbsp;
                          Delete
                        </button>
                      </div>
                    </div>
                    <div className="card1-item-title-price">
                      <div className="card1-item-title">
                        <img src="packageicon.svg" />
                        <h2>{val?.title ? val?.title : "Attraction Title"}</h2>
                      </div>
                      <div className="card1-item-price">
                        <h2>AED {val.cost}</h2>
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
                    <h2>+{customer?.phone}</h2>
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
            <hr />
          </>
        )}
        {landcombos?.length > 0 && (
          <>
            <div className="cart1-item-container">
              <div className="card-item-container">
                {landcombos?.map((val, id) => {
                  return <>
                    <div className="card1-item-container-header">
                      <div className="card1-itemid">
                        <h4>#Id_{val.landComboId.slice(-4)}</h4>
                      </div>
                      <div className="cart-edit-delete-button">
                        <button onClick={() => {
                          setType(4);
                          setPkgId(val._id);
                          setLnCId(val.landComboId);
                          setlncStartDate(val.startDate.split("T")[0]);
                          setlncEndDate(val.endDate.split("T")[0])
                          EditOneItem();
                          if (type === 4) {
                            setEditLnC(true)
                          }
                        }}>
                          <img src="/editicon.svg"  alt="edit"/>&nbsp;
                          Edit
                        </button>
                        <button
                          onClick={() => {
                            setType(4);
                            setPkgId(val._id);
                            if (type === 4) {
                              DeleteOneItem();
                            }
                          }}
                        >
                          <img src="/deleteicon.svg" />&nbsp;
                          Delete
                        </button>
                      </div>
                    </div>
                    <div className="card1-item-title-price">
                      <div className="card1-item-title">
                        <img src="packageicon.svg" />
                        <h2>{val?.title ? val?.title : "LandCombo Title"}</h2>
                      </div>
                      <div className="card1-item-price">
                        <h2>AED {val.cost}</h2>
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
                    <h2>+{customer?.phone}</h2>
                  </div>
                  <div className="card1-item-passenger-name">
                    <h4>Email</h4>
                    <h2>{customer?.email}</h2>
                  </div>
                </div>
                <div className="card1-item-passenger-details">
                  <div className="card1-item-passenger-name">
                    <h4>No. of Adults</h4>
                    <h2>{landcombos?.[0].numberOfAdults}</h2>
                  </div>
                  <div className="card1-item-passenger-name">
                    <h4>No. of children</h4>
                    <h2>{landcombos?.[0].numberOfChildrens}</h2>
                  </div>
                </div>
              </div>
            </div>
            <hr />
          </>
        )}
        {transfers?.length > 0 && (
          <>
            <div className="cart2-item-container">
              {transfers?.map((val, id) => {
                return <>
                  <div className="card1-item-container-header">
                    <div className="card1-itemid">
                      {/* <h4>#Id_{val.transferId.slice(-4)}</h4> */}
                    </div>
                    <div className="cart-edit-delete-button">
                      <button onClick={() => {
                        console.log("trnasfer edit click")
                        alert("we are working on it")
                        // setType(1);
                        // setPkgId(val._id);
                        // setTransferId(val?.InOut[0].transferId);
                        // setTripType(val?.selectedTripType);
                        // setselectedTransferType(val?.selectedTransferType)
                        // settotalCost(val?.finalCost);
                        // setselectedDate(val?.InOut[0].pickupTimeForArrival);
                        // setarrivalFlightCode(val?.InOut[0].arrivalFlightCode);
                        // setarrivalPickupTime(val?.InOut[0].arrivalPickupTime);
                        // setselectedDateTo(val?.InOut[1]?.pickupTimeForDeparture);
                        // setdepartureFlightCode(val?.InOut[1]?.departureFlightCode);
                        // setdeparturePickupTime(val?.InOut[1]?.departurePickupTime);
                        // if (type === 1) {
                        //   setEditTransfer(true)
                        // }
                      }}>
                        <img src="/editicon.svg" alt="edit" />&nbsp;
                        Edit
                      </button>
                      <button
                        onMouseEnter={() => {
                          setType(1);
                          setPkgId(val._id);
                        }}
                        onClick={() => {
                          DeleteOneItem();
                        }}
                      >
                        <img src="/deleteicon.svg" />&nbsp;
                        Delete
                      </button>
                    </div>
                  </div>
                  <div className="card1-item-title-price">
                    <div className="card1-item-title">
                      <img src="transfericon.svg" />
                      <h2>{val._id.slice(-8)}</h2>
                      <p>{val?.selectedTripType}</p>
                      <p>{val?.InOut[0].vehicle?.name}</p>
                    </div>
                    <div className="card1-item-price">
                      <h2>AED {val.finalCost}</h2>
                    </div>
                  </div>
                  <div className="card1-item-passenger-details">
                    <div className="card1-item-passenger-name" style={{ marginBottom: "1rem" }}>
                      <h4>Pick Up</h4>
                      <h2>{val?.InOut[0].from}</h2>
                    </div>
                    <div className="card1-item-passenger-name" style={{ maxWidth: "140px" }}>
                      <h4>Drop off</h4>
                      <h2>{val?.InOut[0].to}</h2>
                    </div>
                    <div className="card1-item-passenger-name">
                      <h4>Pick up dates & time</h4>
                      {/* {transfers?.[0]?.selectedTripType !== "ROUND_TRIP" && (
                        <div className="cart-item-arrival">
                          <h2>{val.pickupTimeForDeparture} ({val.departurePickupTime})</h2>
                        </div>
                      )} */}
                      {/* {transfers?.[0]?.selectedTripType === "ROUND_TRIP" && ( */}
                        <div className="cart-item-arrival">
                          <h2><b>Arrival: </b>{val?.InOut[0].pickupTimeForArrival} ({val?.InOut[0].arrivalPickupTime})</h2>
                          {transfers?.[0]?.selectedTripType === "ROUND_TRIP" && (
                          <h2><b>Departure: </b>{val?.InOut[1].pickupTimeForDeparture} ({val?.InOut[1].departurePickupTime})</h2>
                          )}
                        </div>
                      {/* )} */}
                     

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
                  <h2>+{customer?.phone}</h2>
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
            <hr />
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
          <button onClick={BookNow} >Book Now</button>
        </div>
        <div className="cart-delete-button">
          <img src="/deleteicon1.svg" />
          <button onClick={DeleteAll}>Delete All</button>
        </div>
      </div>
    </div>
    <Footer />
    {editAtt && <BookAttraction
      type={type}
      cartId={cartId}
      attractionId={attId}
      pkgId={pkgId}
      packagedata={attractions}
      onClose={onClose}
      price={attractionprice}
      Pname={customer?.name}
      Pmobile={customer?.phone}
      Pemail={customer?.email}
      adults={attractions?.[0].numberOfAdults}
      child={attractions?.[0].numberOfChildrens}
      attDate={attDate}
      LoadCartItem={LoadCartItem}
    />}
    {editLnC && <BookLandCombos onClose={onClose}
      type={type}
      cartId={cartId}
      pkgId={pkgId}
      landComboId={lncId}
      landCombosData={landcombos}
      price={landcombosprice}
      Pname={customer?.name}
      Pmobile={customer?.phone}
      Pemail={customer?.email}
      adults={landcombos?.[0].numberOfAdults}
      lncStartDate={lncStartDate}
      lncEndDate={lncEndDate}
      child={landcombos?.[0].numberOfChildrens}
      LoadCartItem={LoadCartItem}
    />}
    {editPkg && <BookPackage onClose={onClose}
      type={type}
      cartId={cartId}
      pkgId={pkgId}
      packageId={editPkgId}
      packagedata={packages}
      price={packageprice}
      Pname={customer?.name}
      Pmobile={customer?.phone}
      Pemail={customer?.email}
      adults={packages?.[0].numberOfAdults}
      pkgStartDate={pkgStartDate}
      pkgEndDate={pkgEndDate}
      child={packages?.[0].numberOfChildrens}
      LoadCartItem={LoadCartItem}
    />
    }
    {editTransfer && <BookTransfer onClose={onClose}
      tripType={tripType}
      selectedTransferType={selectedTransferType}
      cartId={cartId}
      pkgId={pkgId}
      price={totalCost1}
      transferId={trnasferId}
      adultsPassengers={transfers?.[0].numberOfAdults}
      childPassengers={transfers?.[0].numberOfChildrens}
      selectedDate={selectedDate}
      selectedDateTo={selectedDateTo}
      Pname={customer?.name}
      Pmobile={customer?.phone}
      Pemail={customer?.email}
      arrivalPickupTime1={arrivalPickupTime}
      arrivalFlightCode={arrivalFlightCode}
      departureFlightCode={departureFlightCode}
      departurePickupTime1={departurePickupTime}
      LoadCartItem={LoadCartItem}
    />}
  </>
}

export default Cart;

