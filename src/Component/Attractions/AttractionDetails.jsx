import React, { useEffect, useState } from "react";
import { useCart } from "../context/CartContext";
import { APIPath } from "../../Config";
import Rating from '@mui/material/Rating';
import { IoLocationOutline } from "react-icons/io5";
import { MdArrowOutward } from "react-icons/md";
import html2pdf from 'html2pdf.js';
import { Navigate, useNavigate } from "react-router-dom";
import { GoDotFill } from "react-icons/go";
import BookAttraction from "./BookAttraction";
import './Attraction.css';
import { useParams } from "react-router-dom";

const AttractionDetails = () => {
    const { packageId} = useParams();
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    const { token } = useCart();
    const [attractiondata, setAttractiondata] = useState(null);
    const [loading, setLoading] = useState(true);
    const [active, setActive] = useState(1);
    const [booking, setBooking] = useState(false);
    const [bookingAttractionId, setBookingAttractionId] = useState('');
    const [adultPrice, setAdultPrice] = useState();
    const [childPrice,setChildPrice]=useState();

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

    useEffect(() => {
            fetch(`${APIPath}/api/v1/attractions/?id=${packageId}`, {
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

    }, [packageId])

    const handleDownloadPDF = () => {
        const element = document.getElementById('package-details');
        html2pdf().from(element).save();
    }
    const [isScrolled, setIsScrolled] = useState(true);
    useEffect(() => {
        const handleScroll = () => {
          const scrollY = window.scrollY;
          setIsScrolled(scrollY < 120);
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

    return <>
        {loading ? (<div className="loader"></div>) : (
            <>
                {attractiondata.map((val, id) => {
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
                                    <button
                                        onClick={handleDownloadPDF}
                                    ><img src="/download.svg" />&nbsp; Download
                                    </button>
                                    <button
                                        onClick={handleShare}
                                    ><img src="/shareB.svg" />&nbsp; Share
                                    </button>
                                </div>
                            </div>
                            <div className="package-description">
                                <div className={active === 1 ? "package-overview active" : "package-overview"}
                                    onClick={() => handleActiveClass(1)}
                                >
                                    <h4>Overview</h4>
                                </div>
                                <div className={active === 2 ? "package-overview active" : "package-overview"}
                                    onClick={() => handleActiveClass(2)}
                                >
                                    <h4>Inclusions/Exclusion</h4>
                                </div>
                                <div className={active === 5 ? "package-overview active" : "package-overview"}
                                    onClick={() => handleActiveClass(5)}
                                >
                                    <h4>Cancellation Policy</h4>
                                </div>
                            </div>
                            {(active === 1) && (
                                <div className="package-overview-details">
                                    <p>{val.attractionOverview}</p>
                                    <br />
                                    <h4>Travel Places</h4>
                                    <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                                        <div style={{ background: "rgba(229, 228, 240, 1)", borderRadius: "50%", padding: "2px 5px", width: "fit-content" }}>
                                            <IoLocationOutline />
                                        </div>
                                        <div>
                                        </div>
                                        <p>CN Tower, Moraine Lake, Suspension Bridge Park, National Park and 12+ places</p>
                                    </div>

                                    <br /> <br/>
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
                                    <br/> <br/> 
                                </div>
                            )}
                            {(active === 5) && (<div className="attraction-cancellation-policy">
                                <br></br>
                                {val.cancellationRefundPolicy ? val.cancellationRefundPolicy.map((val, id) => {
                                    return <>
                                        <div className="attraction-cancellation" key={id}>
                                            <p className={id===0 ? "green" : "red"}><GoDotFill /></p>
                                            <p>{val}</p>
                                        </div>

                                    </>
                                }) : (<div>
                                    <h2 style={{ fontSize: "16px", color: "#00081d" }}>Please Send Booking Form to Know more about this</h2>
                                </div>)}
                                <br/> <br/>
                            </div>)}
                        </div>
                        <div className={isScrolled ? "footer-none":"package-footer"}>
                            <div className="package-price-text-value">
                                <div className="package-price-text">
                                    <p>Starting from</p>
                                </div>
                                <div className="package-price-value">
                                    <p><b>AED {adultPrice}</b> <sub>/ Per person</sub></p>
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