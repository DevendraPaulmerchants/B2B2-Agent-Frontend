import React, { useEffect, useState } from "react";
import './LandCombos.css';
import Footer from "../Footer/Footer";
import { APIPath } from "../../Config";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import { IoSearchSharp } from "react-icons/io5";

const LandCombos = () => {
    document.body.style.overflow = 'auto';
    const { lancCombosId, setLandCombosId } = useCart()
    const [landCombosData, setLandCombosData] = useState(null);
    const [originalLnC, setOriginalLnC] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(true);

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
                console.log(data.data);
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
    const navigate = useNavigate()
    const clickedLandCombos = (id) => {
        setLandCombosId(id)
        navigate('/landcombosDetails')
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
                <h2> Packages created for you </h2>
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
                                    <hr style={{marginTop:"10px"}} />
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
        <Footer />
    </>
}
export default LandCombos;