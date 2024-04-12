import React, { useEffect, useState } from "react";
import './LandCombos.css';
import Footer from "../Footer/Footer";
import { APIPath } from "../../Config";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import { IoLocationOutline } from "react-icons/io5";
import { MdArrowOutward } from "react-icons/md";
import { MdDownload } from "react-icons/md";
import { MdEmail, MdShare } from "react-icons/md";
import html2pdf from 'html2pdf.js';
import BookPackage from "../Packages/BookPackage";
import BookLandCombos from "./BookLandCombos";
import Rating from '@mui/material/Rating';

const LandCombosDetails = () => {
    // document.body.style.overflow = 'auto';
    const { lancCombosId, setLandCombosId, token } = useCart()
    const [landCombosDeatils, setLandCombosDetails] = useState(null);
    const [active, setActive] = useState(1);
    const [loading, setLoading] = useState(true);
    const [booking, setBooking] = useState(false);
    const [bookingPackageId, setBookingPackageId] = useState('');
    const [lcPrice, setlcPrice] = useState()

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
    const navigate = useNavigate();
    useEffect(() => {
        if (lancCombosId) {
            fetch(`${APIPath}/api/v1/land_combos?id=${lancCombosId}`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                method: 'GET',
                mode: 'cors',
            }).then((res) => res.json())
                .then((data) => {
                    console.log(data.data);
                    setlcPrice(data.data[0].cost.split(" ")[1])
                    // setTimeout(() => {
                    setLandCombosDetails(data.data)
                    setLoading(false)
                    // }, 2000)
                })
                .catch((err) => {
                    alert(err)
                    setLoading(false)
                })
        }
        else {
            navigate('/landcombos')
        }

    }, [lancCombosId])
    
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
                                {/* <p>
                                    <Rating defaultValue={val.ratings} precision={0.5} readOnly
                                        sx={{ fontSize: '18px' }} />
                                    &nbsp;            <span>{val.ratings}</span>
                                </p> */}
                            </div>
                            <div className="download-button">
                                <button
                                    onClick={handleDownloadPDF}
                                ><img src="/download.svg" />&nbsp; Download
                                    {/* <MdDownload /> */}
                                </button>
                                <button
                                    onClick={handleShare}
                                ><img src="/shareB.svg"/>&nbsp; Share
                                    {/* <MdShare /> */}
                                </button>
                                {/* <button onClick={handleShare}><MdEmail /></button> */}

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
                                {/* <div className={active === 3 ? "package-overview active" : "package-overview"}
                                    onClick={() => handleActiveClass(3)}
                                >
                                    <h4>Day Plan</h4>
                                </div> */}
                                {/* <div className={active === 4 ? "package-overview active" : "package-overview"}
                                    onClick={() => handleActiveClass(4)}
                                >
                                    <h4>Booking Procedure</h4>
                                </div> */}
                                {/* <div className={active === 5 ? "package-overview active" : "package-overview"}
                                    onClick={() => handleActiveClass(5)}
                                >
                                    <h4>Cancellation Policy</h4>
                                </div> */}
                                {/* <div className={active === 6 ? "package-overview active" : "package-overview"}
                                    onClick={() => handleActiveClass(6)}
                                >
                                    <h4>Must Carry</h4>
                                </div> */}
                            </div>
                            {(active === 1) && (
                                <div className="package-overview-details">
                                    <p>{val.landComboOverview}</p>
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

                                    <br />
                                    {/* <h4>Contact Info</h4> */}
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
                            {/* {(active === 3) && (
                                <div className="package-daywise-plan">
                                    {val.dayWisePlan.map((plan, id) => {
                                        return <>
                                            <div key={id} className="daywise-plan">
                                                <div className="daywise-image">
                                                    {(id === 0) && <img src="/dayl.png" />}
                                                    {(id === (val.dayWisePlan.length - 1)) && <img src="/dayS.png" />}
                                                    {(id != 0 && id != (val.dayWisePlan.length - 1)) && <img src="/daym.png" />}
                                                </div>
                                                <div>
                                                    <h4>{plan.title}</h4>
                                                    <p>{plan.description}</p>
                                                </div>
                                                {id !== (val.dayWisePlan.length - 1) && <div className="blue-line"></div>}
                                            </div>
                                        </>
                                    })}
                                </div>
                            )} */}
                            {/* {(active === 4) && (<div>
                                <br></br>
                                {val.bookingProcedure ? val.bookingProcedure.map((val, id) => {
                                    return <>
                                        <ul>
                                            <li>{val}</li>
                                        </ul>
                                    </>
                                }) : (<div>
                                    <h2 style={{ fontSize: "20px", color: "#00081d" }}>Please fill and Send The Booking Form</h2>
                                </div>)}
                            </div>)} */}
                            {/* {(active === 5) && (<div>
                                <br></br>
                                {val.cancellationRefundPolicy ? val.cancellationRefundPolicy.map((val, id) => {
                                    return <>
                                        <p>{val}</p>
                                    </>
                                }) : (
                                    <div>
                                        <h2 style={{ fontSize: "20px", color: "#00081d" }}>Please fill and Send The Booking Form</h2>
                                    </div>
                                )}
                                <br />
                                <div className="inclusion">
                                    <h4>Notes</h4>
                                    {val.policyNote ? val.policyNote.map((note, id) => {
                                        return <>
                                            <ul key={id}>
                                                <li>{note}</li>
                                            </ul>
                                        </>
                                    }) : (
                                        <div>
                                            <h2>Please fill and Send The Booking Form</h2>
                                        </div>
                                    )}
                                </div>
                            </div>)} */}
                            {/* {(active === 6) && (
                                <div className="package-overview-details">
                                    <ol key={id}>
                                        {val.mustCarry ? val.mustCarry.map((carry, id) => {
                                            return <>
                                                <li>{carry}</li>
                                            </>
                                        }) : (
                                            <div>
                                                <h2 style={{ fontSize: "20px", color: "#00081d" }}>Please fill and Send The Booking Form</h2>
                                            </div>
                                        )}
                                    </ol>
                                </div>
                            )} */}
                        </div>
                        <div className={isScrolled ? "footer-none":"package-footer"}>
                            <div className="package-price-text-value">
                                <div className="package-price-text">
                                    <p>Starting from</p>
                                </div>
                                <div className="package-price-value">
                                    <p><b>AED {lcPrice}</b> <sub>/ Per person</sub></p>
                                </div>
                            </div>
                            <div className="package-query-text-button">
                                <div className="package-query-text">
                                    {/* <p>To Plan your next tour with US!! click on</p> */}
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
            packagedata={landCombosDeatils} price={lcPrice} />}
    </>
}
export default LandCombosDetails;