import React, { useEffect, useState } from "react";
import { APIPath } from "../../Config";
import Rating from '@mui/material/Rating';
import { BsClock } from "react-icons/bs";
import { IoLocationOutline } from "react-icons/io5";
import { IoIosArrowForward } from "react-icons/io";
import { IoIosArrowBack } from "react-icons/io";
import { IoSearchSharp } from "react-icons/io5";
import { MdArrowOutward } from "react-icons/md";
import { useCart } from "../context/CartContext";
import { Navigate, useNavigate } from "react-router-dom";
import Footer from "../Footer/Footer";
import './Home.css';
import '../LandCombos/LandCombos.css';

const Home = () => {

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    document.body.style.overflow = "auto";
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    // -----------------------------------Package List------------------------------------------------
    const [packageData, setPackageData] = useState(null);
    const [originalPackages, setOriginalPackages] = useState(null);
    const [startIndexP, setStartIndexP] = useState(0);
    const [landCombosData, setLandCombosData] = useState(null);
    const [originalLnC, setOriginalLnC] = useState(null);
    const [startIndexLnC, setStartIndexLnC] = useState(0)
    const [attractionData, setAttractionData] = useState(null);
    const [originalAtt, setOriginalAtt] = useState(null);
    const [startIndexAtt, setStartIndexAtt] = useState(0);
    const [pkgstate, setPkgState] = useState(false);
    const [LnCstate, setLnCState] = useState(false);
    const [attstate, setAttState] = useState(false);

    useEffect(() => {
        fetch(`${APIPath}/api/v1/packages`, {
            headers: {
                // 'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            method: 'GET',
            mode: 'cors',
        }).then((res) => res.json())
            .then((data) => {
                // console.log(data.data);
                // setTimeout(() => {
                setPackageData(data.data)
                setOriginalPackages(data.data)
                setLoading(false)
                // }, 2000)
            })
            .catch((err) => {
                alert(err)
                setLoading(false)
            })
    }, [])
    const navigate = useNavigate();
    const clickedPackage = (packageId) => {
        navigate(`/packageDetails/${packageId}`);
    }
    const topThreePackages = packageData?.slice(startIndexP, startIndexP + 3);
    const handleNextPkg = () => {
        if (startIndexP + 3 < packageData.length) {
            setStartIndexP(prevIndex => prevIndex + 1);
        } else {
            setStartIndexP(0);
        }
    };
    const handlePrevPkg = () => {
        if (startIndexP > 0) {
            setStartIndexP(prevIndex => prevIndex - 1);
        } else {
            const lastIndex = packageData.length - 3;
            setStartIndexP(lastIndex > 0 ? lastIndex : 0);
        }
    };
    // --------------------------------------Search function---------------------------------------------
    let filteredPackages;
    let filteredLnC;
    let filteredAtt;
    const handleSearch = () => {
        const searchTermLower = searchTerm.toLowerCase();
        if (searchTermLower == "") {
            setPackageData(originalPackages);
            setLandCombosData(originalLnC);
            setAttractionData(originalAtt)
            setAttState(false)
            setPkgState(false)
            setLnCState(false)
        }
        else {
            filteredPackages = originalPackages.filter((packages) =>
                packages.title.toLowerCase().includes(searchTermLower)
            );
            // filteredPackages = originalPackages.filter((packages) => {
            //     const searchWords = searchTermLower.trim().split(" ");
            //     return searchWords.some(word => packages.title.toLowerCase().includes(word));
            // });

            filteredLnC = originalLnC.filter((packages) =>
                packages.title.toLowerCase().includes(searchTermLower)
            );
            filteredAtt = originalAtt.filter((packages) =>
                packages.title.toLowerCase().includes(searchTermLower)
            );

            if (filteredPackages?.length > 0) {
                setPackageData(filteredPackages);
                setPkgState(true);
                setLnCState(false);
                setAttState(false)
            }
            if (filteredLnC?.length > 0) {
                setLandCombosData(filteredLnC)
                setLnCState(true);
                setAttState(false)
                setPkgState(false);
            }
            if (filteredAtt?.length > 0) {
                setAttractionData(filteredAtt)
                setAttState(true)
                setLnCState(false);
                setPkgState(false);
            }
            else {

            }
        }
    }

    // -------------------------------------Attraction List------------------------------

    useEffect(() => {
        fetch(`${APIPath}/api/v1/attractions`, {
            headers: {
                // 'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            method: 'GET',
            mode: 'cors',
        }).then((res) => res.json())
            .then((data) => {
                // console.log(data.data);
                // setTimeout(() => {
                setAttractionData(data.data)
                setOriginalAtt(data.data)
                setLoading(false)
                // }, 2000)
            })
            .catch((err) => {
                alert(err)
                setLoading(false)
            })
    }, [])
    const clickedAttraction = (packageId) => {
        navigate(`/attractiondetails/${packageId}`);
    }
    const topThreeAttraction = attractionData?.slice(startIndexAtt, startIndexAtt + 3);
    const handleNextAtt = () => {
        if (startIndexAtt + 3 < attractionData.length) {
            setStartIndexAtt(prevIndex => prevIndex + 1);
        } else {
            setStartIndexAtt(0);
        }
    };

    const handlePrevAtt = () => {
        if (startIndexAtt > 0) {
            setStartIndexAtt(prevIndex => prevIndex - 1);
        } else {
            const lastIndex = attractionData.length - 3;
            setStartIndexAtt(lastIndex > 0 ? lastIndex : 0);
        }
    };

    // --------------------------------LandCombos List--------------------------------------
    useEffect(() => {
        fetch(`${APIPath}/api/v1/land_combos`, {
            headers: {
                // 'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            method: 'GET',
            mode: 'cors',
        }).then((res) => res.json())
            .then((data) => {
                // console.log(data.data);
                // setTimeout(() => {
                setLandCombosData(data.data)
                setOriginalLnC(data.data)
                setLoading(false)
                // }, 2000)
            })
            .catch((err) => {
                alert(err)
                setLoading(false)
            })
    }, [])
    const topThreeLandCombos = landCombosData?.slice(startIndexLnC, startIndexLnC + 3);
    const clickedLandCombos = (packageId) => {
        navigate(`/landcombosDetails/${packageId}`);
    }
    const handleNextLnC = () => {
        if (startIndexLnC + 3 < landCombosData.length) {
            setStartIndexLnC(prevIndex => prevIndex + 1);
        } else {
            setStartIndexLnC(0);
        }
    };

    const handlePrevLnC = () => {
        if (startIndexLnC > 0) {
            setStartIndexLnC(prevIndex => prevIndex - 1);
        } else {
            const lastIndex = landCombosData.length - 3;
            setStartIndexLnC(lastIndex > 0 ? lastIndex : 0);
        }
    };
    // ---------------------------------------------Transfers list-----------------------------
    const getTransferPage = () => {
        navigate('/transfers')
    }
    return <>
        <div className="video-container">
            <video autoPlay muted loop className="myvideo">
                <source src="https://res.cloudinary.com/ddxawuqwy/video/upload/v1705380585/ocvjdle2ubiq9f8pxif9.mp4" type="video/mp4" />
            </video>
            <div className="home-search-text-input">
                <div className="banner-title">
                    <h2>Dubai</h2>
                    <p>Your Adventure Awaits in the Desert Oasis</p>
                    <div className="input-and-search-icon">
                        <input type="text" placeholder="Search..."
                            value={searchTerm}
                            onChange={(e) => {
                                setSearchTerm(e.target.value);
                                handleSearch();
                            }}
                        />
                        <IoSearchSharp style={{ fontSize: "20px", cursor: "pointer" }} onClick={handleSearch} />
                    </div>
                </div>
            </div>
        </div>
        <div className="filter-data-container">
            {pkgstate && (
                <>
                    <div className="package-topbar">
                        <h2>Top Packages for Dubai</h2>
                    </div>
                    <div className="package-card-container" style={{ paddingTop: "1rem" }}>
                        {topThreePackages?.map((val, id) => {
                            return <>
                                <div className="package-card" style={{ width: "32.4%" }}
                                    onClick={(e) => { clickedPackage(val._id) }}
                                >
                                    <div className="package-card-image">
                                        <img src={val.thumbnailImage} />
                                    </div>
                                    <div className="package-card-details">
                                        <div className="package-card-rating">
                                            <div className="package-rating">
                                                <p><Rating defaultValue={val.ratings} precision={0.5} readOnly
                                                    sx={{ fontSize: '18px' }} /></p>
                                            </div>
                                            <div className="package-review">
                                                <p>78 Reviews</p>
                                            </div>
                                        </div>
                                        <div className="package-card-title">
                                            <h2>{val.title}</h2>
                                        </div>
                                        <div className="package-card-description">
                                            <h5 style={{ height: "1.8rem", overflow: "hidden" }}>{val.packageOverview}</h5>
                                        </div>
                                        <div className="package-card-trip-location">
                                            <div className="package-card-trip">
                                                <h5><BsClock /></h5>
                                                <h5>{val.duration}</h5>
                                            </div>
                                            <div className="package-card-location">
                                                <h5><IoLocationOutline /></h5>
                                                <h5>Dubai</h5>
                                            </div>
                                        </div>
                                    </div>
                                    <hr />
                                    <div className="package-card-price">
                                        <div className="card-price-text">
                                            <h4>Price Starting From</h4>
                                        </div>
                                        <div className="card-price">
                                            <h4><b>AED {val.price[0].price}</b> <span style={{ color: "#312D65", fontSize: "14px" }}>/person</span></h4>
                                        </div>
                                    </div>
                                </div>
                            </>
                        })}
                    </div>
                </>
            )}
            {LnCstate && (
                <>
                    <div className="package-topbar">
                        <h2>Top Land Combos in Dubai</h2>
                    </div>
                    <div className="land-combos-container" style={{ paddingTop: "1rem" }}>
                        {topThreeLandCombos?.map((val, id) => {
                            return <>
                                <div className="landcombos-card" key={id} onClick={(e) => {
                                    clickedLandCombos(val._id)
                                }}>
                                    <div className="landcombos-card-image">
                                        <img src={val.thumbnailImage} />
                                    </div>
                                    <div className="landcombos-card-details">
                                        <h2>{val.title}</h2>
                                        <hr style={{ marginTop: "10px" }} />
                                        <div className="package-card-price">
                                            <div className="card-price-text">
                                                <h4>Price Starting From</h4>
                                            </div>
                                            <div className="card-price">
                                                <h4>AED <b>{val.cost.split(" ")[1]}</b> <span style={{ color: "#312D65", fontSize: "14px" }}>/person</span></h4>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </>
                        })}
                    </div>
                </>
            )}
            {attstate && (
                <>
                    <div className="package-topbar">
                        <h2>Top Attractions in Dubai</h2>
                    </div>
                    <div className="land-combos-container" style={{ paddingTop: "1rem" }}>
                        {topThreeAttraction?.map((val, id) => {
                            return <>
                                <div className="landcombos-card" key={id} onClick={(e) => {
                                    clickedAttraction(val._id)
                                }}>
                                    <div className="landcombos-card-image">
                                        <img src={val.thumbnailImage} />
                                    </div>
                                    <div className="attraction-card-details">
                                        <h2>{val.title}</h2>
                                        <div className="view-details-rating">
                                            <div className="view-details">
                                                <p>View Details <MdArrowOutward /></p>
                                            </div>
                                            <div className="attraction-rating">
                                                <p>Rating:&nbsp;</p>
                                                <Rating defaultValue={4.5} precision={0.5} readOnly
                                                    sx={{ fontSize: '18px' }} />
                                            </div>
                                        </div>
                                        <hr />
                                        <div className="package-card-price">
                                            <div className="card-price-text">
                                                <h4>Price Starting From</h4>
                                            </div>
                                            <div className="card-price">
                                                <h4>AED <b>{val.cost[0].cost1.split(" ")[1]}</b> <span style={{ color: "#312D65", fontSize: "14px" }}>/person</span></h4>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </>
                        })}
                    </div>
                </>
            )}
        </div>
        {loading ? (<div className="loader"></div>) : (
            <>
                {!pkgstate && (
                    <>
                        <div className="package-topbar">
                            <h2>Top Packages for Dubai</h2>
                            <h2>
                                <button onClick={handlePrevPkg} className="supersell-btn"> <IoIosArrowBack /> </button>
                                <button onClick={handleNextPkg} className="supersell-btn"> <IoIosArrowForward /> </button>
                            </h2>
                        </div>
                        <div className="package-card-container" style={{ paddingTop: "1rem" }}>
                            {topThreePackages?.map((val, id) => {
                                return <>
                                    <div className="package-card" style={{ width: "32.4%" }}
                                        onClick={(e) => { e.preventDefault(); clickedPackage(val._id) }}
                                    >
                                        <div className="package-card-image">
                                            <img src={val.thumbnailImage} />
                                        </div>
                                        <div className="package-card-details">
                                            <div className="package-card-rating">
                                                <div className="package-rating">
                                                    <p><Rating defaultValue={val.ratings} precision={0.5} readOnly
                                                        sx={{ fontSize: '18px' }} /></p>
                                                </div>
                                                <div className="package-review">
                                                    <p>78 Reviews</p>
                                                </div>
                                            </div>
                                            <div className="package-card-title">
                                                <h2>{val.title}</h2>
                                            </div>
                                            <div className="package-card-description">
                                                <h5 style={{ height: "1.8rem", overflow: "hidden" }}>{val.packageOverview}</h5>
                                            </div>
                                            <div className="package-card-trip-location">
                                                <div className="package-card-trip">
                                                    <h5><BsClock /></h5>
                                                    <h5>{val.duration}</h5>
                                                </div>
                                                <div className="package-card-location">
                                                    <h5><IoLocationOutline /></h5>
                                                    <h5>Dubai</h5>
                                                </div>
                                            </div>
                                        </div>
                                        <hr />
                                        <div className="package-card-price">
                                            <div className="card-price-text">
                                                <h4>Price Starting From</h4>
                                            </div>
                                            <div className="card-price">
                                                <h4><b>AED {val.price[0].price}</b> <span style={{ color: "#312D65", fontSize: "14px" }}>/person</span></h4>
                                            </div>
                                        </div>
                                    </div>
                                </>
                            })}
                        </div>
                    </>
                )}

            </>
        )}
        {loading ? (<div className="loader"></div>) : (
            <> {!LnCstate && (
                <>
                    <div className="package-topbar">
                        <h2>Top Land Combos in Dubai</h2>
                        <h2>
                            <button onClick={handlePrevLnC} className="supersell-btn"> <IoIosArrowBack /> </button>
                            <button onClick={handleNextLnC} className="supersell-btn"> <IoIosArrowForward /> </button>
                        </h2>
                    </div>
                    <div className="land-combos-container" style={{ paddingTop: "1rem" }}>
                        {topThreeLandCombos?.map((val, id) => {
                            return <>
                                <div className="landcombos-card" style={{ width: "32.4%" }}
                                    key={id} onClick={(e) => {
                                        clickedLandCombos(val._id)
                                    }}>
                                    <div className="landcombos-card-image">
                                        <img src={val.thumbnailImage} />
                                    </div>
                                    <div className="landcombos-card-details">
                                        <h2>{val.title}</h2>
                                        <hr style={{ marginTop: "10px" }} />
                                        <div className="package-card-price">
                                            <div className="card-price-text">
                                                <h4>Price Starting From</h4>
                                            </div>
                                            <div className="card-price">
                                                <h4>AED <b>{val.cost.split(" ")[1]}</b> <span style={{ color: "#312D65", fontSize: "14px" }}>/person</span></h4>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </>
                        })}
                    </div>
                </>
            )}
            </>
        )}
        {loading ? (<div className="loader"></div>) : (
            <> {!attstate && (
                <>
                    <div className="package-topbar">
                        <h2>Top Attractions in Dubai</h2>
                        <h2>
                            <button onClick={handlePrevAtt} className="supersell-btn"> <IoIosArrowBack /> </button>
                            <button onClick={handleNextAtt} className="supersell-btn"> <IoIosArrowForward /> </button>
                        </h2>
                    </div>
                    <div className="land-combos-container" style={{ paddingTop: "1rem" }}>
                        {topThreeAttraction?.map((val, id) => {
                            return <>
                                <div className="landcombos-card" style={{ width: "32.4%" }}
                                    key={id} onClick={(e) => {
                                        clickedAttraction(val._id)
                                    }}>
                                    <div className="landcombos-card-image">
                                        <img src={val.thumbnailImage} />
                                    </div>
                                    <div className="attraction-card-details">
                                        <h2>{val.title}</h2>
                                        <div className="view-details-rating">
                                            <div className="view-details">
                                                <p>View Details <MdArrowOutward /></p>
                                            </div>
                                            <div className="attraction-rating">
                                                <p>Rating:&nbsp;</p>
                                                <Rating defaultValue={4.5} precision={0.5} readOnly
                                                    sx={{ fontSize: '18px' }} />
                                            </div>
                                        </div>
                                        <hr />
                                        <div className="package-card-price">
                                            <div className="card-price-text">
                                                <h4>Price Starting From</h4>
                                            </div>
                                            <div className="card-price">
                                                <h4>AED <b>{val.cost[0].cost1.split(" ")[1]}</b> <span style={{ color: "#312D65", fontSize: "14px" }}>/person</span></h4>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </>
                        })}
                    </div>
                </>
            )}
            </>
        )}
        <div className="home-page-transfer">
            <div className="home-page-transfer-card">
                <h4>Transfer Bookings at your finger tips </h4>
                <p>Now you can book transfer from airport to hotel or within city at best prices</p>
                <button onClick={() => getTransferPage()}>Book Now</button>
            </div>
        </div>
        <Footer />
    </>
}
export default Home