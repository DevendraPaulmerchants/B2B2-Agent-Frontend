import React, { useEffect, useState } from "react";
import { APIPath } from "../../Config";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import Rating from '@mui/material/Rating';
import { MdArrowOutward } from "react-icons/md";
import { IoSearchSharp } from "react-icons/io5";
import './Attraction.css';
import Footer from "../Footer/Footer";

const Attractions = () => {
    document.body.style.overflow = 'auto';
    // const { attractionId, setAttractionId } = useCart();
    const [attraction, setAttraction] = useState(null);
    const [originalAtt, setOriginalAtt] = useState(null);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

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
                console.log(data.data);
                // setTimeout(() => {
                setAttraction(data.data)
                setOriginalAtt(data.data)
                setLoading(false)
                // }, 2000)
            })
            .catch((err) => {
                alert(err)
                setLoading(false)
            })
    }, [])
    const navigate = useNavigate()
    const clickedAttraction = (packageId) => {
        // setAttractionId(packageId)
        // navigate('/attractiondetails');
        navigate(`/attractiondetails/${packageId}`);
    }
    const handleSearch = () => {
        const searchTermLower = searchTerm.toLowerCase();
        if (searchTermLower === "") {
            setAttraction(originalAtt);
        }
        else {
            const filteredPackages = originalAtt.filter((packages) =>
                packages.title.toLowerCase().includes(searchTermLower)
            );
            setAttraction(filteredPackages);
        }
    }

    return <>
        <div className='package-banner'>
            <div className="main-container">
                <h2> Packages created for you </h2>
                <div id="search-container">
                    <form className='search-form' onSubmit={(e) => { e.preventDefault(); handleSearch(); }}>
                        <input
                            type="text"
                            placeholder="Search..."
                            value={searchTerm}
                            onChange={(e) => {
                                setSearchTerm(e.target.value);
                                handleSearch();
                            }}
                        />
                        <button className="search-button"> <IoSearchSharp /> </button>
                    </form>
                </div>
            </div>
        </div>
        {loading ? (<div className="loader"></div>) : (
            <>
                <div style={{ padding: "1rem 4rem 0 4rem" }}>
                    <h2 style={{ fontSize: "24px" }}>Best Attractions in Dubai</h2>
                </div>
                <div className="land-combos-container">
                    {attraction.map((val, id) => {
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
                                    <hr/>
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
        <Footer />
    </>
}
export default Attractions;