import React, { useEffect, useState } from "react";
import { APIPath } from "../../Config";
import { useCart } from "../context/CartContext";
import './Cart.css';
import Footer from "../Footer/Footer";
import BookAttraction from "./EditAttraction";
import BookPackage from "./EditPackage";
import BookLandCombos from "./EditLandCombo";
import BookTransfer from "./EditTransfer";

const Cart = ({ tokenH, setCart, cart }) => {
  const { cartLength, setCartLength, token } = useCart();
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
  const [packageData, setPackageData] = useState(null);
  const [editPkg, setEditPkg] = useState(false);
  const [editPkgId, setEditPkgId] = useState(false);
  const [pkgStartDate, setPkgStartDate] = useState();
  const [pkgEndDate, setPkgEndDate] = useState();
  const [pricePackage, setPricePackage] = useState();
  const [editAtt, setEditAtt] = useState(false);
  const [attId, setAttId] = useState('');
  const [attractionData, setAttractionData] = useState(null)
  const [subAttractionId, setSubAttractionId] = useState('')
  const [attDate, setAttDate] = useState();
  const [priceAtt, setPriceAtt] = useState();
  const [editLnC, setEditLnC] = useState(false);
  const [lncId, setLnCId] = useState('');
  const [landcombosData, setLandcombosData] = useState(null);
  const [lncStartDate, setlncStartDate] = useState();
  const [lncEndDate, setlncEndDate] = useState();
  const [priceLnc, setPriceLnc] = useState();
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
  const [maxPassengers, setMaxPassengers] = useState();
  const [vehicle, setVehicle] = useState(null);
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [loading, setLoading] = useState(false);

  const ftoken = tokenH || token;
  // console.log(tokenH ? `"home", ${ftoken}` : `"context",${ftoken}`);

  const LoadCartItem = () => {
    fetch(`${APIPath}/api/v1/agent/new-cart`, {
      headers: {
        'Authorization': `Bearer ${ftoken}`,
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
        setCustomer(data.data[0]?.customerDetails)
        // setCartLength(
        //   (isNaN(data.data[0]?.attractions?.length) ? 0 : data.data[0]?.attractions.length) +
        //   (isNaN(data.data[0]?.landCombos?.length) ? 0 : data.data[0]?.landCombos.length) +
        //   (isNaN(data.data[0]?.packages?.length) ? 0 : data.data[0]?.packages.length) +
        //   (isNaN(data.data[0]?.transfers?.length) ? 0 : data.data[0]?.transfers.length)
        // )
        setCart(
          (isNaN(data.data[0]?.attractions?.length) ? 0 : data.data[0]?.attractions.length) +
          (isNaN(data.data[0]?.landCombos?.length) ? 0 : data.data[0]?.landCombos.length) +
          (isNaN(data.data[0]?.packages?.length) ? 0 : data.data[0]?.packages.length) +
          (isNaN(data.data[0]?.transfers?.length) ? 0 : data.data[0]?.transfers.length)
        )
        const newcart = (isNaN(data.data[0]?.attractions?.length) ? 0 : data.data[0]?.attractions.length) +
          (isNaN(data.data[0]?.landCombos?.length) ? 0 : data.data[0]?.landCombos.length) +
          (isNaN(data.data[0]?.packages?.length) ? 0 : data.data[0]?.packages.length) +
          (isNaN(data.data[0]?.transfers?.length) ? 0 : data.data[0]?.transfers.length)
        localStorage.setItem('cart', newcart);
      })
      .catch((err) => {
        alert(err)
      })
  }

  useEffect(() => {
    LoadCartItem();
  }, [ftoken]);

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

  const [custom, setCustom] = useState(false);
  const [customMsg, setCustomMsg] = useState("");
  const [customAction, setCustomAction] = useState(false);
  const [customT, setCustomT] = useState('')

  const CustomPopUp = ({ customMsg }) => {
    document.body.style.overflow = "hidden";
    return <div className="custom-popup-container">
      <div className="custom-popup">
        <h4>{customMsg}</h4>
        {loading ? <div className="loader"></div> :
          <div className="custom-button">
            <button onMouseEnter={() => {
              setCustomAction(true);
            }}
              onClick={() => {
                setLoading(true);
                setCustomAction(true);
                setCustom(false);
                if (customT === "Delete") {
                  DeleteAll();
                }
                if (customT === "Book") {
                  BookNow();
                }
              }}>Yes</button>
            <button onClick={() => {
              setCustomAction(false);
              setCustom(false);
            }}>No</button>
          </div>
        }
      </div>
    </div>
  }

  const BookNow = () => {
    setLoading(true);
    setCustom(true);
    setCustomT("Book")
    setCustomMsg("Are you sure you want to book this cart`s item?");
    if (customAction === true) {
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
          alert("Your booking request has been successfully submitted. Our admin team will review and respond shortly.");
          setLoading(false);
          setCustom(false);
          LoadCartItem();
        })
        .catch((err) => {
          alert(err)
          setLoading(false);
        })
    }
    else {
      setLoading(false);
      return;
    }
  }

  const DeleteAll = () => {
    setLoading(true);
    setCustom(true);
    setCustomT("Delete");
    setCustomMsg("Are you sure you want to remove cart`s item from your cart?");
    // const confirm=window.confirm("Are you sure you want to remove cart`s item from your cart?");
    // if(confirm){
    if (customAction === true) {
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
          setLoading(false)
          setCustom(false);
          LoadCartItem();
        })
        .catch((err) => {
          alert(err)
          setLoading(false)
        })
    }
    else {
      setLoading(false);
      return;
    }
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

  const onClose = () => {
    setEditAtt(false);
    setEditPkg(false);
    setEditLnC(false);
    setEditTransfer(false);
  }
  return <>
    {cart > 0 ?
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
                          {/* <h4>#Id_{val.packageId?.slice(-4)}</h4> */}
                        </div>
                        <div className="cart-edit-delete-button">
                          <button
                            onClick={() => {
                              setType(2);
                              setPkgId(val._id);
                              setEditPkgId(val.packageId);
                              setPackageData(val)
                              setPkgStartDate(val.startDate.split("T")[0]);
                              setPkgEndDate(val.endDate);
                              setPricePackage(val.cost)
                              if (type === 2) {
                                setEditPkg(true);
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
                          <div className="cart-item-title-date">
                            <h2>{val?.title ? val?.title : "Package Title"}</h2>
                            <h4>({val.startDate?.split("T")[0]} || {val.endDate?.split("T")[0]})</h4>
                          </div>
                        </div>
                        <div className="card1-item-price">
                          <h2>AED {val.cost}</h2>
                        </div>
                      </div>
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
                          <h2>{val.numberOfAdults}</h2>
                        </div>
                        <div className="card1-item-passenger-name">
                          <h4>No. of children</h4>
                          <h2>{val.numberOfChildrens}</h2>
                        </div>
                        <div className="card1-item-passenger-name">
                          <h4>No. of Infants</h4>
                          <h2>{val.numberOfInfants}</h2>
                        </div>
                      </div>
                    </>
                  })}

                  {/* <div className="card1-item-passenger-details">
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
                </div> */}
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
                          {/* <h4>#Id_{val.attractionId.slice(-4)}</h4> */}
                        </div>
                        <div className="cart-edit-delete-button">
                          <button
                            onClick={() => {
                              setType(3);
                              setPkgId(val._id);
                              setAttId(val.attractionId);
                              setAttractionData(val);
                              setAttDate(val.startDate.split("T")[0])
                              setPriceAtt(val.cost);
                              setSubAttractionId(val.subAttractionId)
                              if (type === 3) {
                                setEditAtt(true)
                              }

                            }}
                          >
                            <img src="/editicon.svg" alt="edit" />&nbsp;
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
                      <div className="card1-item-title-price" style={{ marginBottom: "0" }}>
                        <div className="card1-item-title">
                          <img src="packageicon.svg" />
                          <div className="cart-item-title-date">
                            <h2>{val?.title ? val?.title : "Attraction Title"}</h2>
                            <h4>( {val.startDate?.split("T")[0]} )</h4>
                          </div>
                        </div>
                        <div className="card1-item-price">
                          <h2>AED {val.cost}</h2>
                        </div>
                      </div>
                      <div style={{ paddingLeft: "3rem" }}>
                        <p style={{ color: "#A3A8B8" }}>({val?.subTitle ? val?.subTitle : "Attraction Sub title"})</p>
                      </div>
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
                          <h2>{val.numberOfAdults}</h2>
                        </div>
                        <div className="card1-item-passenger-name">
                          <h4>No. of children</h4>
                          <h2>{val.numberOfChildrens}</h2>
                        </div>
                        <div className="card1-item-passenger-name">
                          <h4>No. of Infants</h4>
                          <h2>{val.numberOfInfants}</h2>
                        </div>
                      </div>
                    </>
                  })}
                  {/* <div className="card1-item-passenger-details">
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
                </div> */}
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
                          {/* <h4>#Id_{val.landComboId.slice(-4)}</h4> */}
                        </div>
                        <div className="cart-edit-delete-button">
                          <button onClick={() => {
                            setType(4);
                            setPkgId(val._id);
                            setLnCId(val.landComboId);
                            setLandcombosData(val);
                            setlncStartDate(val.startDate.split("T")[0]);
                            setlncEndDate(val.endDate.split("T")[0]);
                            setPriceLnc(val.cost)
                            if (type === 4) {
                              setEditLnC(true)
                            }
                          }}>
                            <img src="/editicon.svg" alt="edit" />&nbsp;
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
                          <div className="cart-item-title-date">
                            <h2>{val?.title ? val?.title : "LandCombo Title"}</h2>
                            <h4>( {val.startDate?.split("T")[0]} || {val.endDate?.split("T")[0]} )</h4>
                          </div>
                        </div>
                        <div className="card1-item-price">
                          <h2>AED {val.cost}</h2>
                        </div>
                      </div>
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
                          <h2>{val.numberOfAdults}</h2>
                        </div>
                        <div className="card1-item-passenger-name">
                          <h4>No. of children</h4>
                          <h2>{val.numberOfChildrens}</h2>
                        </div>
                        <div className="card1-item-passenger-name">
                          <h4>No. of Infants</h4>
                          <h2>{val.numberOfInfants}</h2>
                        </div>
                      </div>
                    </>
                  })}
                  {/* <div className="card1-item-passenger-details">
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
                </div> */}
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
                          // console.log("trnasfer edit click")
                          // alert("we are working on it")
                          //  return;
                          setType(1);
                          setPkgId(val._id);
                          setTransferId(val?.InOut[0].transferId);
                          setTripType(val?.selectedTripType);
                          setselectedTransferType(val?.selectedTransferType)
                          settotalCost(val?.finalCost);
                          setselectedDate(val?.InOut[0].pickupTimeForArrival);
                          setarrivalFlightCode(val?.InOut[0].arrivalFlightCode);
                          setarrivalPickupTime(val?.InOut[0].arrivalPickupTime);
                          setselectedDateTo(val?.InOut[1]?.pickupTimeForDeparture);
                          setdepartureFlightCode(val?.InOut[1]?.departureFlightCode);
                          setdeparturePickupTime(val?.InOut[1]?.departurePickupTime);
                          setMaxPassengers(val.InOut[0].vehicle?.maxPassenger);
                          setVehicle(val?.InOut[0].vehicle);
                          setFrom(val.InOut[0].from);
                          setTo(val.InOut[0].to)
                          if (type === 1) {
                            setEditTransfer(true)
                          }
                        }}>
                          <img src="/editicon.svg" alt="edit" />&nbsp;
                          Edit
                        </button>
                        <button
                          onClick={() => {
                            setType(1);
                            setPkgId(val._id)
                            if (type === 1) {
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
                        <img src="transfericon.svg" />
                        {/* <h2>{val._id.slice(-8)}</h2> */}
                        <p>{val?.selectedTripType}</p>
                        <p>{val?.InOut[0]?.vehicle?.name}</p>
                      </div>
                      <div className="card1-item-price">
                        <h2>AED {val.finalCost}</h2>
                      </div>
                    </div>
                    <div className="card1-item-passenger-details">
                      <div className="card1-item-passenger-name" style={{ marginBottom: "1rem" }}>
                        <h4>Pick Up</h4>
                        <h2>{val?.InOut[0]?.from}</h2>
                      </div>
                      <div className="card1-item-passenger-name" style={{ maxWidth: "140px" }}>
                        <h4>Drop off</h4>
                        <h2>{val?.InOut[0]?.to}</h2>
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
                          <h2><b>Arrival: </b>{val?.InOut[0]?.pickupTimeForArrival} ({val?.InOut[0]?.arrivalPickupTime})</h2>
                          {val?.selectedTripType === "ROUND_TRIP" && (
                            <h2><b>Departure: </b>{val?.InOut[1]?.pickupTimeForDeparture} ({val?.InOut[1]?.departurePickupTime})</h2>
                          )}
                        </div>
                        {/* )} */}

                      </div>
                    </div>
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
                        <h2>{val.numberOfAdults}</h2>
                      </div>
                      <div className="card1-item-passenger-name">
                        <h4>No. of children</h4>
                        <h2>{val.numberOfChildrens}</h2>
                      </div>
                      <div className="card1-item-passenger-name">
                        <h4>No. of children</h4>
                        <h2>{val.numberOfInfants}</h2>
                      </div>
                    </div>
                  </>
                })}
                {/* <div className="card1-item-passenger-details">
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
              </div> */}
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
          {loading ? <div className="loader"></div> :
            <div className="cart-price-button">
              <button onClick={BookNow} >Book Now</button>
            </div>
          }
          {/* {loading ? <div className="loader"></div>: */}
          <div className="cart-delete-button">
            <img src="/deleteicon1.svg" />
            <button onClick={DeleteAll}>Delete All</button>
          </div>
          {/* } */}
        </div>
      </div> :
      <div className="cart-has-no-iteam">
        <h2>Oops! Your cart seems to be empty!</h2>
      </div>
    }
    {custom && <CustomPopUp customMsg={customMsg} />}
    <Footer />
    {editAtt && <BookAttraction
      type={type}
      cartId={cartId}
      attractionId={attId}
      subAttractionId={subAttractionId}
      // attractionTitle={attractionTitle}
      pkgId={pkgId}
      packagedata={attractionData}
      onClose={onClose}
      price={priceAtt}
      Pname={customer?.name}
      Pmobile={customer?.phone}
      Pemail={customer?.email}
      adults={attractionData.numberOfAdults}
      child={attractionData.numberOfChildrens}
      infants={attractionData.numberOfInfants}
      attDate={attDate}
      LoadCartItem={LoadCartItem}
    />}
    {editLnC && <BookLandCombos onClose={onClose}
      type={type}
      cartId={cartId}
      pkgId={pkgId}
      landComboId={lncId}
      // landcombosTitle={landcombosTitle}
      landCombosData={landcombosData}
      price={priceLnc}
      Pname={customer?.name}
      Pmobile={customer?.phone}
      Pemail={customer?.email}
      adults={landcombosData.numberOfAdults}
      child={landcombosData.numberOfChildrens}
      infants={landcombosData.numberOfInfants}
      lncStartDate={lncStartDate}
      lncEndDate={lncEndDate}
      LoadCartItem={LoadCartItem}
    />}
    {editPkg && <BookPackage onClose={onClose}
      type={type}
      cartId={cartId}
      pkgId={pkgId}
      packageId={editPkgId}
      // packageTitle={packageTitle}
      packagedata={packageData}
      // price={packageprice}
      price={pricePackage}
      Pname={customer?.name}
      Pmobile={customer?.phone}
      Pemail={customer?.email}
      adults={packageData.numberOfAdults}
      child={packageData.numberOfChildrens}
      infants={packageData.numberOfInfants}
      pkgStartDate={pkgStartDate}
      pkgEndDate={pkgEndDate}
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
      infants={transfers?.[0].numberOfInfants}
      maxPassengers={maxPassengers}
      vehicle={vehicle}
      from={from}
      to={to}
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

