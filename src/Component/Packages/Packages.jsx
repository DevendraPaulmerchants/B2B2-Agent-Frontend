import React, { useEffect, useState } from "react";
import Rating from '@mui/material/Rating';
import { BsClock } from "react-icons/bs";
import { IoLocationOutline } from "react-icons/io5";
import { IoSearchSharp } from "react-icons/io5";
import { APIPath } from "../../Config";
import { useCart } from "../context/CartContext";
import { Navigate, useNavigate } from "react-router-dom";
import Footer from "../Footer/Footer";
import './Packages.css';

const Packages = () => {
    document.body.style.overflow = 'auto';
    // const { packageId, setPackageId } = useCart();
    const [packages, setPackages] = useState(null);
    const [originalPackages, setOriginalPackages] = useState(null);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
   
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
                console.log(data.data);
                setPackages(data.data)
                setOriginalPackages(data.data)
                setLoading(false)
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
    const handleSearch = () => {
        const searchTermLower = searchTerm.toLowerCase();
        if (searchTermLower === "") {
            setPackages(originalPackages);
        }
        else {
            const filteredPackages = originalPackages.filter((packages) =>
                packages.title.toLowerCase().includes(searchTermLower)
            );
            setPackages(filteredPackages);
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
                            onChange={(e) =>{
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
            <> <div style={{ padding: "1rem 4rem 0 4rem" }}>
                <h2 style={{ fontSize: "24px" }}>Best Packages for Dubai</h2>
            </div>
                <div className="package-card-container">
                    {packages?.map((val, id) => {
                        return <>
                            <div className="package-card"
                                onClick={() => {clickedPackage(val._id) }}
                            >
                                <div className="package-card-image">
                                    {/* <img src="/package1.png" /> */}
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
                                        <h4>AED <b>{val.price[0].price}</b> <span style={{ color: "#312D65", fontSize: "14px" }}>/person</span></h4>
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
export default Packages;