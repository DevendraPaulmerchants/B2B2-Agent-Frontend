import React, { useEffect, useState } from "react";
import './LandCombos.css';
import { APIPath } from "../../Config";
import { useCart } from "../context/CartContext";
import { IoLocationOutline } from "react-icons/io5";
import { MdArrowOutward } from "react-icons/md";
import html2pdf from 'html2pdf.js';
import BookLandCombos from "./BookLandCombos";
import { useParams } from "react-router-dom";

const LandCombosDetails = () => {
    const { packageId} = useParams();
    const { token } = useCart()
    const [landCombosDeatils, setLandCombosDetails] = useState(null);
    const [active, setActive] = useState(1);
    const [loading, setLoading] = useState(true);
    const [booking, setBooking] = useState(false);
    const [bookingPackageId, setBookingPackageId] = useState('');
    const [adultPrice,setAdultPrice] = useState();
    const [childPrice,setChildPrice]=useState()

    const handleBookingOn = (id) => {
        document.body.style.overflow = 'hidden';
        if (token) {
            setBooking(true)
            setBookingPackageId(id)
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
            fetch(`${APIPath}/api/v1/land_combos?id=${packageId}`, {
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
                    setLandCombosDetails(data.data);
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
                {landCombosDeatils.map((val, id) => {
                    return <>
                        <div className="package-banner-image">
                            <img src={val.bannerImage} />
                        </div>
                        <div className="package-details">
                        <div className="package-title-and-download-button">
                            <div className="package-title" style={{width:"60%"}}>
                                <h2>{val.title}</h2>
                            </div>
                            <div className="download-button">
                                <button
                                    onClick={handleDownloadPDF}
                                ><img src="/download.svg" />&nbsp; Download
                                </button>
                                <button
                                    onClick={handleShare}
                                ><img src="/shareB.svg"/>&nbsp; Share
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
                            </div>
                            {(active === 1) && (
                                <div className="package-overview-details">
                                    <p>{val.landComboOverview}</p>
                                    <br />
                                    {/* <h4>Travel Places</h4> */}
                                    {/* <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                                        <div style={{ background: "rgba(229, 228, 240, 1)", borderRadius: "50%", padding: "2px 5px", width: "fit-content" }}>
                                            <IoLocationOutline />
                                        </div>
                                        <div>
                                        </div>
                                        <p>CN Tower, Moraine Lake, Suspension Bridge Park, National Park and 12+ places</p>
                                    </div> */}

                                    <br />
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
                                    <br></br>
                                    <br></br>
                                </div>
                                
                            )}
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
        {booking && <BookLandCombos onClose={handleBookingOff}
            bookingPackageId={bookingPackageId}
            packagedata={landCombosDeatils} adultPrice={adultPrice} childPrice={childPrice} />}
    </>
}
export default LandCombosDetails;