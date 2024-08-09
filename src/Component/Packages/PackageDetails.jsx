import React, { useEffect, useState } from "react";
import { useCart } from "../context/CartContext";
import { APIPath } from "../../Config";
import Rating from '@mui/material/Rating';
import { MdArrowOutward } from "react-icons/md";
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import BookPackage from "./BookPackage";
import './Packages.css';
import { useParams } from "react-router-dom";

const PacKageDetails = () => {
    const { packageId } = useParams();
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    const { token } = useCart();
    const [packagedata, setPackagedata] = useState(null);
    const [loading, setLoading] = useState(true);
    const [active, setActive] = useState(1);
    const [booking, setBooking] = useState(false);
    const [bookingPackageId, setBookingPackageId] = useState('');

    useEffect(() => {
        if (token) {
            fetch(`${APIPath}/api/v1/agent/package/?id=${packageId}`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                method: 'GET',
                mode: 'cors',
            }).then((res) => res.json())
                .then((data) => {
                    setPackagedata(data.data)
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
            setBookingPackageId(id)
        } else {
            alert("Please Log In to Book This Package");
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

    // const handleDownloadPDF = () => {
    //     const input = document.getElementById('package-details');
    //     html2canvas(input).then((canvas) => {
    //         const imgData = canvas.toDataURL('image/png');
    //         const pdf = new jsPDF();
    //         pdf.addImage(imgData, 'PNG', 0, 0);
    //         pdf.save('package-details.pdf');
    //     });
    // };

    const [isScrolled, setIsScrolled] = useState(true);
    useEffect(() => {
        if (window.innerHeight > 740) {
            console.log("screen height---",window.innerHeight)
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
    return <>
        <div id="package-details">
            {loading ? (<div className="loader"></div>) : (
                <>
                    {packagedata?.map((val, id) => {
                        return <>
                            <div className="package-banner-image" >
                                <img src={val.bannerImage} alt="Banner" />
                            </div>
                            <div className="package-details">
                                <div className="package-title-and-download-button">
                                    <div className="package-title">
                                        <h2>{val.title}</h2>
                                        <p>
                                            <Rating defaultValue={val.ratings} precision={0.5} readOnly
                                                sx={{ fontSize: '18px' }} />
                                            &nbsp;            <span>{val.ratings}</span>
                                        </p>
                                    </div>
                                    <div className="download-button">
                                        {/* <button
                                            onClick={handleDownloadPDF}
                                        > <img src="/download.svg" alt="download" />&nbsp;
                                            Download
                                        </button> */}
                                        <button
                                            onClick={handleShare}
                                        >
                                            {/* <MdShare />  */}
                                            <img src="/shareB.svg" alt="Share" />&nbsp; Share
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
                                    <div className={active === 3 ? "package-overview active" : "package-overview"}
                                        onClick={() => handleActiveClass(3)}
                                    >
                                        <h4>Day Plan</h4>
                                    </div>
                                    <div className={active === 4 ? "package-overview active" : "package-overview"}
                                        onClick={() => handleActiveClass(4)}
                                    >
                                        <h4>Booking Procedure</h4>
                                    </div>
                                    <div className={active === 5 ? "package-overview active" : "package-overview"}
                                        onClick={() => handleActiveClass(5)}
                                    >
                                        <h4>Cancellation Policy</h4>
                                    </div>
                                    <div className={active === 6 ? "package-overview active" : "package-overview"}
                                        onClick={() => handleActiveClass(6)}
                                    >
                                        <h4>Must Carry</h4>
                                    </div>
                                </div>
                                {(active === 1) && (
                                    <div className="package-overview-details">
                                        <p>{val.packageOverview}</p>
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
                                    </div>
                                )}

                                {(active === 3) && (
                                    <div className="package-daywise-plan">
                                        {val.dayWisePlan.map((plan, id) => {
                                            return <>
                                                <div key={id} className="daywise-plan">
                                                    <div className="daywise-image">
                                                        {(id === 0) && <img src="/dayl.png" alt="Day1" />}
                                                        {(id === (val.dayWisePlan.length - 1)) && <img src="/dayS.png" alt="DayM" />}
                                                        {(id !== 0 && id !== (val.dayWisePlan.length - 1)) && <img src="/daym.png" alt="Day Last" />}
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
                                )}
                                {(active === 4) && (<div className="package-overview-details">

                                    {val.bookingProcedure.map((val, id) => {
                                        return <>
                                            <ul>
                                                <li>{val}</li>
                                            </ul>
                                        </>
                                    })}
                                </div>)}

                                {(active === 5) && (<div className="package-overview-details">

                                    {val.cancellationRefundPolicy.map((val, id) => {
                                        return <>
                                            <p>{val}</p>
                                        </>
                                    })}
                                    <div className="note">
                                        <h4>Notes</h4>
                                        {val.policyNote.map((note, id) => {
                                            return <>
                                                <ul key={id}>
                                                    <li>{note}</li>
                                                </ul>
                                            </>
                                        })}
                                    </div>
                                </div>)}
                                {(active === 6) && (
                                    <div className="package-overview-details">
                                        <ol key={id}>
                                            {val.mustCarry.map((carry, id) => {
                                                return <>
                                                    <li>{carry}</li>
                                                </>
                                            })}
                                        </ol>
                                    </div>
                                )}
                            </div>
                            <br />
                            <div className={isScrolled ? "footer-none" : "package-footer"}>
                                <div className="package-price-text-value">
                                    <div className="package-price-text">
                                        <p>Starting from</p>
                                    </div>
                                    <div className="package-price-value">
                                        <p><b>AED {val.price[0].price}</b> <sub>/ Per person</sub></p>
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
        </div>
        {booking && <BookPackage onClose={handleBookingOff}
            bookingPackageId={bookingPackageId}
            packagedata={packagedata} />}
    </>
}
export default PacKageDetails;