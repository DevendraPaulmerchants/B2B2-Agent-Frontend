import React, { useEffect, useState } from "react";
import { useCart } from "../context/CartContext";
import { APIPath } from "../../Config";
import Rating from '@mui/material/Rating';
import { MdArrowOutward } from "react-icons/md";
import { GoDotFill } from "react-icons/go";
import { IoEyeOffSharp, IoEye } from "react-icons/io5";
import { FaArrowDown } from "react-icons/fa6";
import { IoMdClose } from "react-icons/io";
import BookAttraction from "./BookAttraction";
import './Attraction.css';
import { useParams } from "react-router-dom";

const AttractionDetails = () => {
    const { token } = useCart();
    const { packageId } = useParams();
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    const [attractiondata, setAttractiondata] = useState(null);
    const [loading, setLoading] = useState(true);
    const [active, setActive] = useState(1);
    const [booking, setBooking] = useState(false);
    const [bookingAttractionId, setBookingAttractionId] = useState('');
    const [adultPrice, setAdultPrice] = useState();
    const [childPrice, setChildPrice] = useState();
    const [morePrice, setMorePrice] = useState(false);

    useEffect(() => {
        if (token) {
            fetch(`${APIPath}/api/v1/agent/attraction?id=${packageId}`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                method: 'GET',
                mode: 'cors',
            }).then((res) => res.json())
                .then((data) => {
                    setAdultPrice(data.data[0].price[0].adultPrice);
                    setChildPrice(data.data[0].price[0].childPrice)
                    setAttractiondata(data.data)
                    setLoading(false)
                })
                .catch((err) => {
                    alert(err)
                    setLoading(false)
                })
        }

    }, [token])

    const handleBookingOn = (id) => {
        document.body.style.overflow = 'hidden';
        if (token) {
            setBooking(true)
            setBookingAttractionId(id)
        } else {
            alert("Please Log In to Book This Package")
            document.body.style.overflow = 'auto';
            return
        }

    }
    const handleBookingOff = () => {
        document.body.style.overflow = 'auto';
        setBooking(false)
    }
    const handleActiveClass = (index) => {
        setActive(index)
    }

    const [isScrolled, setIsScrolled] = useState(true);

    useEffect(() => {
        if (window.innerHeight > 740) {
            console.log("screen height---", window.innerHeight)
            setIsScrolled(false);
            return;
        }
        const handleScroll = () => {
            const scrollY = window.scrollY;
            setIsScrolled(scrollY < 100);
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const handleShare = () => {
        if (navigator.share) {
            const url = window.location.href;
            const message = `Check out this amazing package: ${url}`;

            navigator.share({
                title: document.title,
                text: message,
                url: url,
            })
                .then(() => console.log("Share successful"))
                .catch((error) => console.error("Share failed:", error));
        } else {
            console.log("Web Share API not supported");
        }
    }

    const AttractionTable = () => {
        // console.log(attractiondata[0].price);
        if (!attractiondata) {
            return <div>
                loading...
            </div>
        }
        return <div className="attraction-details-price">
            <div className="attraction-details-price-header">
                <h2>{attractiondata?.[0].title}</h2>
                <h2 style={{fontSize:'28px',cursor:'pointer'}} 
                onClick={() => {
                    setMorePrice(!morePrice)
                }}><IoMdClose /></h2>
            </div>
            <table style={{ textAlign: "center" }}>
                <thead style={{ background: "#CEEEFF"}}>
                    <tr>
                        <th className="att-price-table">Description</th>
                        <th className="att-price-table">Adult Price</th>
                        <th className="att-price-table">Child Price</th>
                    </tr>
                </thead>
                <tbody>
                    {attractiondata[0]?.price?.map((val, id) => (
                        <tr key={id} style={{ background: "#fff" }}>
                            <td 
                            // style={{ color: "#00081d", borderRight: "1.5px solid #26DB26", padding: " 5px 0.5rem", maxWidth: "80%" }}
                            >{val.description}</td>
                            <td 
                            // style={{ color: "#00081d", borderRight: "1.5px solid #26DB26", padding: " 5px 0.5rem" }}
                            >AED <b style={{ color: "#5d626f" }}>{val.adultPrice}</b></td>
                            <td 
                            // style={{ color: "#00081d", padding: " 5px 0.5rem" }}
                            >AED <b style={{ color: "#5d626f" }}>{val.childPrice}</b></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    }

    return <>
        {loading ? (<div className="loader"></div>) : (
            <>
                {attractiondata?.map((val, id) => {
                    return <>
                        <div className="package-banner-image">
                            <img src={val.bannerImage} />
                        </div>
                        <div className="package-details">
                            <div className="package-title-and-download-button">
                                <div className="package-title">
                                    <h2>{val.title}</h2>
                                    <p>
                                        <Rating defaultValue={4.5} precision={0.5} readOnly
                                            sx={{ fontSize: '18px' }} />
                                        &nbsp;            <span>{4.5}</span>
                                    </p>
                                </div>
                                <div className="download-button">
                                    {/* <button
                                        onClick={handleDownloadPDF}
                                    ><img src="/download.svg" />&nbsp; Download
                                    </button> */}
                                    <button
                                        onClick={handleShare}
                                    ><img src="/shareB.svg" />&nbsp; Share
                                    </button>
                                </div>
                            </div>
                            <div className="package-description">
                                <div className={active === 1 ? "package-overview on" : "package-overview"}
                                    onClick={() => handleActiveClass(1)}
                                >
                                    <h4>Overview</h4>
                                </div>
                                <div className={active === 2 ? "package-overview on" : "package-overview"}
                                    onClick={() => handleActiveClass(2)}
                                >
                                    <h4>Inclusions/Exclusion</h4>
                                </div>
                                {val.expectations?.length > 0 && (
                                    <div className={active === 3 ? "package-overview on" : "package-overview"}
                                        onClick={() => handleActiveClass(3)}
                                    >
                                        <h4>Meeting Points</h4>
                                    </div>
                                )}
                                {val.cancellationRefundPolicy?.length > 0 && (
                                    <div className={active === 5 ? "package-overview on" : "package-overview"}
                                        onClick={() => handleActiveClass(5)}
                                    >
                                        <h4>Cancellation Policy</h4>
                                    </div>
                                )}
                            </div>
                            {(active === 1) && (
                                <div className="package-overview-details">
                                    <p>{val.attractionOverview}</p>
                                    <br />
                                    {/* <h4>Travel Places</h4> */}
                                    {/* <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                                        <div style={{ background: "rgba(229, 228, 240, 1)", borderRadius: "50%", padding: "2px 5px", width: "fit-content" }}>
                                            <IoLocationOutline />
                                        </div>
                                        <p>CN Tower, Moraine Lake, Suspension Bridge Park, National Park and 12+ places</p>
                                    </div> */}

                                    <br /> <br />
                                </div>
                            )}
                            {(active === 2) && (
                                <div className="package-overview-details">
                                    <div className="inclusion">
                                        <h4>Inclusions</h4>
                                        {val.includedServices.map((inc, id) => {
                                            return <>
                                                <ul key={id}>
                                                    <li>{inc}</li>
                                                </ul>
                                            </>
                                        })}
                                    </div>
                                    <br></br>
                                    <div className="exclusion">
                                        <h4>Exclusions</h4>
                                        {val.excludedServices.map((exc, id) => {
                                            return <>
                                                <ul key={id}>
                                                    <li>{exc}</li>
                                                </ul>
                                            </>
                                        })}
                                    </div>
                                    <br /> <br />
                                </div>
                            )}
                            {(active === 3) && (<div className="package-overview-details">
                                <br />
                                {val.expectations?.map((val, id) => {
                                    return <>
                                        <p><b>Location:</b> {val.location}</p>
                                        <p><b>Description:</b> {val.description}</p>
                                        {/* <p><b>Time:</b> {val.time}</p> */}
                                    </>
                                })}
                            </div>)}
                            <br />
                            {(active === 5) && (<div className="note">
                                {val.cancellationRefundPolicy.map((val, id) => {
                                    return <>
                                        {/* <p>{val}</p> */}
                                        <ul key={id}>
                                            <li>{val}</li>
                                        </ul>
                                    </>
                                })}
                            </div>)}
                            <br /><br />
                        </div>
                        <div className={isScrolled ? "footer-none" : "package-footer"}>
                            <div className="package-price-text-value">
                                <div className="package-price-text">
                                    <p>Starting from</p>
                                </div>
                                <div className="package-price-value">
                                    <p><b>AED {adultPrice}</b> <sub>/ Per person</sub></p>
                                </div>
                                <div>
                                    <button className="more-price-btn"
                                        onClick={() => {
                                            setMorePrice(!morePrice)
                                        }} >
                                        {morePrice ? <IoEye /> : <IoEyeOffSharp />}
                                    </button>
                                </div>
                                <div className={morePrice ? "price-table" : "none"}>
                                    <AttractionTable />
                                </div>
                            </div>
                            <div className="package-query-text-button">
                                <div className="package-query-text">
                                </div>
                                <div className="package-query-button">
                                    <button onClick={() => {
                                        handleBookingOn(val._id)
                                    }}>Book Now <MdArrowOutward style={{ fontSize: "16px" }} /></button>
                                </div>
                            </div>
                        </div>
                    </>
                })}
            </>
        )}
        {booking && <BookAttraction onClose={handleBookingOff}
            bookingPackageId={bookingAttractionId}
            packagedata={attractiondata} adultPrice={adultPrice} childPrice={childPrice} />}
    </>
}
export default AttractionDetails;