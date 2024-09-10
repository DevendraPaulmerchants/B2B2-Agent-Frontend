import React, { useEffect, useState } from "react";
import { useCart } from "../context/CartContext";
import { APIPath } from "../../Config";
import Rating from '@mui/material/Rating';
import { MdArrowOutward } from "react-icons/md";
import jsPDF from 'jspdf';
import 'jspdf-autotable';
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

    const sharePdf = () => {
        const doc = new jsPDF();
        const pdfWidth = doc.internal.pageSize.getWidth();
        const pdfHeight = doc.internal.pageSize.getHeight();

        const imageWidth = pdfWidth;
        const imageHeight = 100;

        let y = 10;
        const x = 0;
        const maxWidth = pdfWidth - 20; // Maximum width for text

        // Function to check if a new page is needed
        const checkPageOverflow = (additionalHeight = 0) => {
            if (y + additionalHeight > pdfHeight - 10) { // 10 for bottom margin
                doc.addPage();
                y = 10; // Reset y for the new page
            }
        };

        // Banner Image
        doc.addImage(packagedata[0].bannerImage, 'PNG', x, y, imageWidth, imageHeight);
        y += imageHeight + 10;

        // Title
        doc.setFontSize(16);
        doc.setTextColor(0, 0, 0);
        doc.text(packagedata[0].title, 10, y);
        y += 7;

        // Package Overview ------------------------------------------------------
        doc.setFontSize(12);
        doc.setTextColor(71, 92, 108);
        const overviewLines = doc.splitTextToSize(packagedata[0].packageOverview, maxWidth);

        overviewLines.forEach(line => {
            checkPageOverflow(5); // Check if the next line would cause an overflow
            doc.text(line, 10, y);
            y += 5;
        });
        y += 10;

        // Package Routing ------------------------------------------------------
        doc.setFontSize(16);
        doc.setTextColor(0, 0, 0);
        checkPageOverflow(7);
        doc.text('Routing', 10, y);
        y += 7;

        // Trip Duration --------------------------------------------------------
        doc.setFontSize(12);
        doc.setTextColor(71, 92, 108);
        checkPageOverflow(10);
        doc.text(`Trip Duration: ${packagedata[0].duration}`, 10, y);
        y += 10;

        // Package Inclusion --------------------------------------------------
        doc.setFontSize(16);
        doc.setTextColor(0, 0, 0);
        checkPageOverflow(7);
        doc.text("Inclusion", 10, y);
        y += 7;

        doc.setFontSize(12);
        doc.setTextColor(71, 92, 108);
        packagedata[0].includedServices.forEach((service, index) => {
            const inclusionLines = doc.splitTextToSize(`${index + 1}. ${service}`, maxWidth);
            inclusionLines.forEach(line => {
                checkPageOverflow(8);
                doc.text(line, 10, y);
                y += 7;
            });
            // y += 5;
        });
        y += 10
        // Package Exclusion ---------------------------------------------------------
        doc.setFontSize(16);
        doc.setTextColor(0, 0, 0);
        checkPageOverflow(7);
        doc.text("Exclusion", 10, y);
        y += 7;

        doc.setFontSize(12);
        doc.setTextColor(71, 92, 108);
        packagedata[0].excludedServices.forEach((val, id) => {
            const exclusionLines = doc.splitTextToSize(`${id + 1}. ${val}`, maxWidth);
            exclusionLines.forEach(line => {
                checkPageOverflow(8);
                doc.text(line, 10, y);
                y += 7;
            });
            // y += 5;
        });
        y += 10;
        // Package Day Wise Itinerary ---------------------------------------------------
        doc.setFontSize(16);
        doc.setTextColor(0, 0, 0);
        checkPageOverflow(7);
        doc.text("Day Wise Itinerary", 10, y);
        y += 7;

        // doc.setFontSize(12);
        // doc.setTextColor(71, 92, 108);
        packagedata[0].dayWisePlan.forEach((val, id) => {
            const dayTitleLines = doc.splitTextToSize(`${val.title}`, maxWidth);
            const dayDescLines = doc.splitTextToSize(`${val.description}`, maxWidth);

            dayTitleLines.forEach(line => {
                checkPageOverflow(5);
                doc.setFontSize(14);
                doc.setTextColor(53, 56, 57)
                doc.text(line, 10, y);
                y += 5;
            });

            dayDescLines.forEach(line => {
                checkPageOverflow(8);
                doc.setFontSize(12);
                doc.setTextColor(71, 92, 108)
                doc.text(line, 10, y);
                y += 5;
            });
            y += 5;
        });
        y += 10;
        // Package Booking procedure   -----------------------------------------
        doc.setFontSize(16);
        doc.setTextColor(0, 0, 0);
        checkPageOverflow(7);
        doc.text("Booking Procedure", 10, y);
        y += 7;
        doc.setFontSize(12);
        doc.setTextColor(71, 92, 108);
        packagedata[0].bookingProcedure.forEach((val, id) => {
            const bookingLines = doc.splitTextToSize(`${id + 1}. ${val}`, maxWidth);
            bookingLines.forEach((line, id) => {
                doc.text(line, 10, y);
                y += 5;
            })
        })
        y += 10;
        // Package Must Carry   -------------------------------------------------
        doc.setFontSize(16);
        doc.setTextColor(0, 0, 0);
        doc.text("Must Carry", 10, y);
        y += 7;
        packagedata[0].mustCarry.forEach((val, id) => {
            doc.setFontSize(12);
            doc.setTextColor(71, 92, 108);
            doc.text(`${id + 1}. ${val}`, 10, y);
            y += 5;
        })
        y += 10;
        // Package Price table  ------------------------------------------------
        doc.setFontSize(16);
        doc.setTextColor(0, 0, 0);
        doc.text("Price Table", 10, y);
        y += 7;
        const tableBody = [
            `AED ${packagedata[0].price.find(priceObj => priceObj.travelerType === 'adult')?.price}` || '',
            `AED ${packagedata[0].price.find(priceObj => priceObj.travelerType === 'child')?.price}` || ''
        ];
    
        doc.autoTable({
            startY: y,
            head: [['Adults', 'Child']],
            body: [tableBody],
        });
    
        // Save the PDF
        doc.save(`Booking_Details_of_${packagedata[0].title}.pdf`);
    };





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
                                            // onClick={handleShare}
                                            onClick={sharePdf}
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

                                {(active === 5) && (<div className="note">

                                    {val.cancellationRefundPolicy.map((val, id) => {
                                        return <>
                                            {/* <p>{val}</p> */}
                                            <ul key={id}>
                                                <li>{val}</li>
                                            </ul>
                                        </>
                                    })}
                                    {/* <div className="note">
                                        <h4>Notes</h4>
                                        {val.policyNote.map((note, id) => {
                                            return <>
                                                <ul key={id}>
                                                    <li>{note}</li>
                                                </ul>
                                            </>
                                        })}
                                    </div> */}
                                </div>)}
                                <br />
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