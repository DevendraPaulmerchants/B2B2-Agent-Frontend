import React, { useEffect, useState } from "react";
import './LandCombos.css';
import Footer from "../Footer/Footer";
import { APIPath } from "../../Config";
import { useNavigate } from "react-router-dom";
import { IoSearchSharp } from "react-icons/io5";
import { useCart } from "../context/CartContext";

const LandCombos = () => {
    document.body.style.overflow = 'auto';
    const { token } = useCart();
    const [landCombosData, setLandCombosData] = useState(null);
    const [originalLnC, setOriginalLnC] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (token) {
            fetch(`${APIPath}/api/v1/agent/landCombo/`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                method: 'GET',
                mode: 'cors',
            }).then((res) => res.json())
                .then((data) => {
                    console.log(data.data);
                    setLandCombosData(data.data)
                    setOriginalLnC(data.data)
                    setLoading(false)
                })
                .catch((err) => {
                    alert(err)
                    setLoading(false)
                })
        }
    }, [token])
    const navigate = useNavigate()
    const clickedLandCombos = (packageId) => {
        navigate(`/landcombosDetails/${packageId}`);
    }

    const handleSearch = () => {
        const searchTermLower = searchTerm.toLowerCase();
        if (searchTermLower === "") {
            setLandCombosData(originalLnC);
        }
        else {
            const filteredPackages = originalLnC.filter((packages) =>
                packages.title.toLowerCase().includes(searchTermLower)
            );
            setLandCombosData(filteredPackages);
        }
    }
    return <>
        <div className='package-banner'>
            <div className="main-container">
                <h2> Land Combos created for you </h2>
                <div id="search-container">
                    <form className='search-form' onSubmit={(e) => { e.preventDefault(); handleSearch(); }}>
                        <input
                            type="text"
                            placeholder="Search..."
                            value={searchTerm}
                            onChange={(e) => {
                                setSearchTerm(e.target.value);
                                handleSearch()
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
                    <h2 style={{ fontSize: "24px" }}>Best Land Combos in Dubai</h2>
                </div>
                <div className="land-combos-container">
                    {landCombosData?.map((val, id) => {
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
                                            <h4>AED <b>{val.price?.[0].adultPrice}</b> <span style={{ color: "#312D65", fontSize: "14px" }}>/person</span></h4>
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
export default LandCombos;