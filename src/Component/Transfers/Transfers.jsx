import React, { useEffect, useState } from "react";
import Select from 'react-select';
import 'react-datepicker/dist/react-datepicker.css';
import { APIPath } from "../../Config";
import TransferDescription from "./TransferDescription/TransferDescription";
import './Transfers.css';
import SelectTransfer from "./SelectTransfer/SelectTransfer";
import { useCart } from "../context/CartContext";
import AddHotel from "../AddHotel/AddHotel";
import BookTransfer from "./BookTransfer/BookTransfer";
import './Transfers.css';
import Footer from "../Footer/Footer";

const Transfers = () => {
    const { bookTransfer, setBookTransfer, transferDetails, setTransferDetails,
        descriptionPage, setDescriptionPage, filteredList, setFilteredList } = useCart()
    document.body.style.overflow = 'auto';
    const { token, addNewHotel, setAddNewHotel, adult, setadult, setChild } = useCart();
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    const [descriptionPageData, setDescriptionPageData] = useState('');

    const handeDescriptionPage = (id, Data) => {
        setDescriptionPageData(Data)
        setDescriptionPage(true);
    }
    const [selectTransferPage, setSelectTransferPage] = useState(false);
    const [selecttransferPageData, setSelectTransferPageData] = useState('')
    const handleSelectTransferPage = (id, Data) => {
        setSelectTransferPage(true);
        setSelectTransferPageData(Data)
    }
    const handleDescriptionClosePage = () => {
        setDescriptionPage(false);
        setSelectTransferPage(false)
    }
    // ---------------------------------------------Select CountryId-----------------------------------    
    const [countryId, setCountryId] = useState('');
    const handleSelectChange = (selectedOption) => {
        const selectedCountryId = selectedOption ? selectedOption.value : '';
        setCountryId(selectedCountryId);
        setAirport([]);
        setFromCity([])
    };
    // --------------------------------------------Select CityId-----------------------------------------
    const [cityId, setCityId] = useState('');
    const handleCityChange = (selectedOption) => {
        const selectedCityId = selectedOption ? selectedOption.value : '';
        console.log(selectedCityId);
        setCityId(selectedCityId);
        // setAirport([]); 
    };
    // ------------------------------------Date-picker-------------------------------------------------------   
    const [selectedDate, setSelectedDate] = useState('');
    const handleDateChange = (e) => {
        setSelectedDate(e.target.value);
    };
    const getCurrentDate = () => {
        const now = new Date();
        const year = now.getFullYear();
        const month = (now.getMonth() + 1).toString().padStart(2, '0');
        const day = now.getDate().toString().padStart(2, '0');
        return `${year}-${month}-${day}`;
    }

    const [selectedDateTo, setSelectedDateTo] = useState('');
    // -------------------------------Terminal-changes----------------------------------------
    const [selectedTerminal, setSelectedTerminal] = useState('');
    const [selectedTerminalName, setSelectedTerminalName] = useState('Airport Name');
    const handleTerminalChange = (selectedOption) => {
        const terminalId = selectedOption ? selectedOption.value : '';
        setSelectedTerminal(terminalId);
        setSelectedTerminalName(selectedOption.label)
    };
    const [selectedTerminalTo, setSelectedTerminalTo] = useState('');
    const [selectedTerminalToName, setSelectedTerminalToName] = useState('Airport Name')
    const handleTerminalChangeTo = (selectedOption) => {
        const terminalId = selectedOption ? selectedOption.value : '';
        setSelectedTerminalTo(terminalId);
        setSelectedTerminalToName(selectedOption.label)
    };
    // --------------------------------Hotel-changes------------------------------------------- 
    const [selectedHotel, setSelectedHotel] = useState('');
    const [selectedHotelName, setSelectedHotelName] = useState('Hotel Name')
    const handleHotelChange = (selectedOption) => {
        const hotelId = selectedOption ? selectedOption.value : '';
        setSelectedHotelName(selectedOption.label)
        setSelectedHotel(hotelId);
    }
    const [selectedHotelTo, setSelectedHotelTo] = useState('');
    const [selctedHotelNameTo, setSelectedHotelNameTo] = useState('Hotel Name');
    const handleHotelChangeTo = (selectedOption) => {
        const hotelId = selectedOption ? selectedOption.value : '';
        setSelectedHotelTo(hotelId);
        setSelectedHotelNameTo(selectedOption.label)
    }
    // ----------------------------------Terminal Or Hotel type--------------------------------    
    const TerminalHotel = [
        { value: "terminal", label: "Airport" },
        { value: "stay", label: "Hotel" }
    ]
    // -------------------------TransferType like private,shared, scheduled--------------------------
    const TransferType = [
        { value: "All", label: "All" },
        { value: "Private", label: "Private" },
        { value: "Shared", label: "Shared" },
    ]
    const [transferType, setTransferType] = useState('');
    const [transferTypeset, setTransferTypeset] = useState('All');

    const transfertypeChange = (e) => {
        if (e.value === "All") {
            setTransferTypeset(e.label);
            console.log(e.value);
            delete TripDetails['transferType'];
            setTransferType('')
        }
        else {
            setTransferTypeset(e.label);
            setTransferType(e.value);
            console.log(e.value);
        }
    };

    // ---------------------------Transfer From Or To like From Airport to Hotel Or Hotel TO airport ---------------------------------    
    const [travelTypeFrom, setTravelTypeFrom] = useState('terminal');
    const [travelTypeFromName, setTravelTypeFromName] = useState('Airport');
    const TerminalOrStay = (e) => {
        setTravelTypeFrom(e.value);
        setTravelTypeFromName(e.label)
    }
    const [travelTypeTo, setTravelTypeTo] = useState('terminal');
    const [travelTypeToType, setTravelTypeToType] = useState('Airport');
    const TerminalOrStayTo = (e) => {
        setTravelTypeTo(e.value);
        setTravelTypeToType(e.label)
    }
    // -------------------------------------Trip Type Ex-One-way or Two Way------------------------ 
    const [tripType, setTripType] = useState('ONE_WAY');
    const handleFormData = (e) => {
        console.log(tripType)
        setTripType(e.target.value);
        if (tripType === 'ONE_WAY') {
            delete TripDetails.serviceDate["endDate"];
        }

    };
    // --------------------------------------setCountry List---------------------------------------------
    const [formCountry, setFromCountry] = useState([]);
    const Id = '65b20828d1cdfbe9749eb653';
    useEffect(() => {
        if (Id) {
            fetch(`${APIPath}/api/v1/agent/country?continent=${Id}`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                method: 'GET',
                mode: 'cors',
            })
                .then((res) => res.json())
                .then((data) => {
                    setFromCountry(data.data)
                })
                .catch((err) => (
                    alert(err)
                ))
        }
    }, [Id]);
    // --------------------------------------setCity List------------------------------------------------
    const [fromCity, setFromCity] = useState([])
    useEffect(() => {
        if (countryId) {
            fetch(`${APIPath}/api/v1/agent/city?country=${countryId}`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                method: 'GET',
                mode: 'cors',
            })
                .then((res) => res.json())
                .then((data) => {
                    setFromCity(data.data)
                })
                .catch((err) => (
                    alert(err)
                ))
        }
    }, [countryId]);
    // ----------------------------------------setAirport List-------------------------------------------
    const [fromAirport, setAirport] = useState([]);
    useEffect(() => {
        if (cityId) {
            fetch(`${APIPath}/api/v1/agent/airport?city=${cityId}`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                method: 'GET',
                mode: 'cors',
            })
                .then((res) => res.json())
                .then((data) => {
                    setAirport(data.data)
                })
                .catch((err) => (
                    alert(err)
                ))
        }
    }, [cityId]);
    // ----------------------------------------setHotel List----------------------------------------------
    const [Hotel, setHotel] = useState([]);
    const hotelsWithOther = Hotel
        .sort((a, b) => a.name.localeCompare(b.name))
        .map((val, id) => ({ value: val._id, label: val.name }));
    hotelsWithOther.push({ value: 'other', label: 'Other' });

    useEffect(() => {
        if (cityId) {
            fetch(`${APIPath}/api/v1/agent/hotel?city=${cityId}`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                method: 'GET',
                mode: 'cors',
            })
                .then((res) => res.json())
                .then((data) => {
                    setHotel(data.data)
                })
                .catch((err) => (
                    alert(err)
                ))
        }
    }, [cityId]);
    // --------------------------- Pessangers count------------------------------------------------------------------
    const [adultsPassengers, setAdultsPassengers] = useState(0);
    const [childPassengers, setChildPassengers] = useState(0);

    const TripDetails = {
        transferType: transferType,
        tripType: tripType,
        country: countryId,
        typeA: travelTypeFrom,
        typeB: travelTypeTo,
        serviceDate: {
            initDate: {
                date: selectedDate
            },
            endDate: {
                date: selectedDateTo
            }
        },
        passengers: [{
            adults: adultsPassengers,
            children: childPassengers,
        }],
        arrival: {
            pickupLocation: {
                code: travelTypeFrom === 'terminal' ? selectedTerminal : selectedHotel
            },
            destinationLocation: {
                code: travelTypeTo === 'terminal' ? selectedTerminalTo : selectedHotelTo
            }
        }
    }
    const [filterList, setFilterList] = useState(null);
    const [dataNotfound, setDataNotFound] = useState('')
    const [loading, setLoading] = useState(false);

    const searchList = (e) => {
        e.preventDefault();
        // console.log(adult)
        setLoading(true);
        if (!countryId || !cityId) {
            alert("Please Select Country and City to Continue..");
            setSearchHeight(false);
            setLoading(false);
            return;
        }
        if (adultsPassengers < 1) {
            alert("please add atleast 1 Adult:")
            setSearchHeight(false);
            setLoading(false);
            return;
        }
        fetch(`${APIPath}/api/v1/agent/transfer/availability`, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            method: 'POST',
            mode: 'cors',
            body: JSON.stringify(TripDetails)
        }).then((res) => res.json())
            .then((data) => {
                if (data.data.length > 0) {
                    setSearchHeight(true);
                    setTimeout(() => {
                        setFilterList(data.data);
                        // console.log(data.data)
                        // setFilteredList(data.data);
                        setLoading(false);
                    }, 2000)
                } else {
                    setFilterList([]);
                    // setFilteredList([])
                    setDataNotFound('NO RECORDS FOUND');
                    setLoading(false);
                }
            })
            .catch((err) => {
                console.log(err);
                setLoading(false);
            });
    };

    const [onetrip, setOneTrip] = useState(true);
    const [roundTrip, setRoundTrip] = useState(false);
    const [searchHeight, setSearchHeight] = useState(false);
    return <>
        <div className="transfers-container">
            {/* -----------------------------Terminal Accommodation Form--------------------- */}
            <div className="terminal-accommodation">
                <div className="terminal-acco-details">
                    <form onSubmit={searchList} >
                        {/* -------------------------------Search Form After clicking on Search Button------------------ */}
                        <div className={searchHeight ? "search-container-shrink-height" : "hidden"}>
                            <div className="country">
                                <p>Airport/Hotel</p>
                                <Select
                                    options={TerminalHotel}
                                    onChange={TerminalOrStay}
                                    placeholder={travelTypeFromName}
                                    isSearchable
                                    styles={{
                                        control: (provided) => ({
                                            ...provided,
                                            borderRadius: '20px',
                                            cursor: 'pointer'
                                        }),
                                        placeholder: (provided) => ({
                                            ...provided,
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis',
                                            whiteSpace: 'nowrap',
                                            color: 'hsl(0, 0%, 20%)'
                                        }),
                                    }}
                                />
                            </div>
                            {travelTypeFrom === 'terminal' && (
                                <div className="country">
                                    <p>From Airport</p>
                                    <Select
                                        options={fromAirport
                                            .sort((a, b) => a.name.localeCompare(b.name))
                                            .map((val, id) => ({ value: val._id, label: val.name }))}
                                        onChange={handleTerminalChange}
                                        placeholder={selectedTerminalName}
                                        isSearchable
                                        styles={{
                                            control: (provided) => ({
                                                ...provided,
                                                borderRadius: '20px',
                                                cursor: 'pointer'
                                            }),
                                            placeholder: (provided) => ({
                                                ...provided,
                                                overflow: 'hidden',
                                                textOverflow: 'ellipsis',
                                                whiteSpace: 'nowrap',
                                                color: 'hsl(0, 0%, 20%)'
                                            }),

                                        }}
                                    />

                                </div>
                            )}
                            {travelTypeFrom === 'stay' && (
                                <div style={{ width: "100%" }}>
                                    <div className="country">
                                        <p>From Hotel</p>
                                        <Select
                                            options={hotelsWithOther}
                                            onChange={handleHotelChange}
                                            placeholder={selectedHotelName}
                                            isSearchable
                                            styles={{
                                                control: (provided) => ({
                                                    ...provided,
                                                    borderRadius: '20px',
                                                    cursor: 'pointer'
                                                }),
                                                placeholder: (provided) => ({
                                                    ...provided,
                                                    overflow: 'hidden',
                                                    textOverflow: 'ellipsis',
                                                    whiteSpace: 'nowrap',
                                                    color: 'hsl(0, 0%, 20%)'
                                                }),
                                            }}
                                        />
                                    </div>
                                    {selectedHotelName === 'Other' && (
                                        setAddNewHotel(true), setSelectedHotelName("OR")
                                    )}

                                </div>
                            )}
                            <div className="country">
                                <p>Airport/Hotel</p>
                                <Select
                                    options={TerminalHotel}
                                    onChange={TerminalOrStayTo}
                                    placeholder={travelTypeToType}
                                    isSearchable
                                    styles={{
                                        control: (provided) => ({
                                            ...provided,
                                            borderRadius: '20px',
                                            cursor: 'pointer'
                                        }),
                                        placeholder: (provided) => ({
                                            ...provided,
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis',
                                            whiteSpace: 'nowrap',
                                            color: 'hsl(0, 0%, 20%)'
                                        }),
                                    }}
                                />
                            </div>
                            {travelTypeTo === 'terminal' && (
                                <div className="country">
                                    <p>To Terminal</p>
                                    <Select id="select"
                                        options={fromAirport
                                            .sort((a, b) => a.name.localeCompare(b.name))
                                            .map((val, id) => ({ value: val._id, label: val.name }))}
                                        onChange={handleTerminalChangeTo}
                                        placeholder={selectedTerminalToName}
                                        isSearchable
                                        styles={{
                                            control: (provided) => ({
                                                ...provided,
                                                borderRadius: '20px',
                                                cursor: 'pointer'
                                            }),
                                            placeholder: (provided) => ({
                                                ...provided,
                                                overflow: 'hidden',
                                                textOverflow: 'ellipsis',
                                                whiteSpace: 'nowrap',
                                                color: 'hsl(0, 0%, 20%)'
                                            }),
                                        }}
                                    />
                                </div>
                            )}
                            {travelTypeTo === 'stay' && (
                                <div style={{ width: "100%" }}>
                                    <div className="country">
                                        <p>To Hotel</p>
                                        <Select
                                            options={hotelsWithOther}
                                            onChange={handleHotelChangeTo}
                                            placeholder={selctedHotelNameTo}
                                            isSearchable
                                            styles={{
                                                control: (provided) => ({
                                                    ...provided,
                                                    borderRadius: '20px',
                                                    cursor: 'pointer'
                                                }),
                                                placeholder: (provided) => ({
                                                    ...provided,
                                                    overflow: 'hidden',
                                                    textOverflow: 'ellipsis',
                                                    whiteSpace: 'nowrap',
                                                    color: 'hsl(0, 0%, 20%)'
                                                }),
                                            }}
                                        />
                                    </div>
                                    {selctedHotelNameTo === 'Other' && (
                                        setAddNewHotel(true), setSelectedHotelNameTo("OR")
                                    )}
                                </div>

                            )}
                            <div className="date-container" style={{ gap: "10px" }}>
                                <div className="country"
                                    style={{ width: "100%" }}
                                >
                                    <p>From Date</p>
                                    <input style={{ color: 'hsl(0, 0%, 20%)' }}
                                        type="date"
                                        placeholder="dd/MM/yyyy"
                                        value={selectedDate}
                                        onChange={handleDateChange}
                                        min={getCurrentDate()}
                                    />
                                </div>

                                {tripType === 'ROUND_TRIP' && (
                                    <div className="country"
                                        style={{ width: "50%" }}
                                    >
                                        <p>To Date</p>
                                        <input style={{ color: 'hsl(0, 0%, 20%)' }}
                                            type="date"
                                            placeholder="dd/MM/yyyy"
                                            value={selectedDateTo}
                                            onChange={(e) => {
                                                e.preventDefault();
                                                setSelectedDateTo(e.target.value)
                                            }}
                                            min={selectedDate}
                                        />
                                    </div>
                                )}
                            </div>
                            <div className="Adults-passengers">
                                <p>ADULTS</p>
                                <div className="numberOfPassenger" style={{ width: "100%" }}
                                >
                                    <button className="inc-dec-btn" style={{ padding: "0 5px" }}
                                        onClick={(e) => {
                                            e.preventDefault();
                                            if (adultsPassengers > 0) {
                                                setAdultsPassengers(adultsPassengers - 1)
                                                setadult(adultsPassengers - 1)
                                            }
                                        }}
                                    >-</button>
                                    <button className="numberOfAdults"
                                        style={{ padding: "0 2px", color: 'hsl(0, 0%, 20%)' }}
                                    >{adultsPassengers}</button>
                                    <button className="inc-dec-btn" style={{ padding: "0 5px" }}
                                        onClick={(e) => {
                                            e.preventDefault()
                                            setAdultsPassengers(adultsPassengers + 1)
                                            setadult(adultsPassengers + 1)
                                        }}
                                    >+</button>
                                </div>
                            </div>

                            <div className="country">
                                <p>TransferType</p>
                                <Select
                                    options={TransferType}
                                    onChange={transfertypeChange}
                                    placeholder={transferTypeset}
                                    isSearchable
                                    styles={{
                                        control: (provided) => ({
                                            ...provided,
                                            borderRadius: '20px',
                                            cursor: 'pointer'
                                        }),
                                        placeholder: (provided) => ({
                                            ...provided,
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis',
                                            whiteSpace: 'nowrap',
                                        }),
                                    }}
                                />
                            </div>
                            <div className="transfers-find-btn"
                                style={{ margin: "0", padding: "0" }}>
                                <button type="submit">Modify</button>
                            </div>
                        </div>
                        {/* --------------------Search Form Before clicking on Search----------------------------------------- */}
                        <div style={{ padding: "2rem 0" }}>
                            <div className={searchHeight ? "hidden" : "search-container-full-height"} >
                                <div className="transfers-trip">
                                    <div className={onetrip ? "transfers-one-way" : "transfers-round-trip"}>
                                        <input
                                            type="radio"
                                            id="oneWay"
                                            value="ONE_WAY"
                                            checked={tripType === 'ONE_WAY'}
                                            onChange={handleFormData}
                                            onClick={() => { setRoundTrip(false); setOneTrip(true) }}
                                        /> &nbsp;
                                        <label htmlFor="oneWay">One Way</label>
                                    </div>
                                    <div className={roundTrip ? "transfers-one-way1" : "transfers-round-trip"}>
                                        <input
                                            type="radio"
                                            id="roundTrip"
                                            value="ROUND_TRIP"
                                            checked={tripType === 'ROUND_TRIP'}
                                            onChange={handleFormData}
                                            onClick={() => { setOneTrip(false); setRoundTrip(true) }}
                                        /> &nbsp;
                                        <label htmlFor="roundTrip">Round Trip</label>
                                    </div>

                                </div>
                                {/* -----------------------Search Form----------------------------------------- */}
                                <div className="fromToParent">
                                    <div className="from-country" style={{ display: "block" }} >
                                        <div className="country-city-container"
                                            style={{ display: "flex", gap: "4rem", width: "100%" }}>
                                            <div className="country">
                                                <p>From Country</p>
                                                <Select
                                                    options={formCountry?.map((val, id) => ({ value: val._id, label: val.name }))}
                                                    onChange={handleSelectChange}
                                                    placeholder="Select Country"
                                                    isSearchable
                                                    styles={{
                                                        control: (provided) => ({
                                                            ...provided,
                                                            borderRadius: '20px',
                                                            cursor: 'pointer'
                                                        }),
                                                        placeholder: (provided) => ({
                                                            ...provided,
                                                            whiteSpace: 'nowrap',
                                                            fontSize: '14px'
                                                        }),
                                                    }}
                                                />
                                            </div>
                                            <div className="country">
                                                <p>From City</p>
                                                <Select
                                                    options={fromCity
                                                        .sort((a, b) => a.name.localeCompare(b.name))
                                                        .map((val, id) => ({ value: val._id, label: val.name }))}
                                                    onChange={handleCityChange}
                                                    placeholder="Select City"
                                                    isSearchable
                                                    styles={{
                                                        control: (provided) => ({
                                                            ...provided,
                                                            borderRadius: '20px',
                                                            cursor: 'pointer'
                                                        }),
                                                        placeholder: (provided) => ({
                                                            ...provided,
                                                            whiteSpace: 'nowrap',
                                                            fontSize: '14px'
                                                        }),
                                                    }}
                                                />
                                            </div>
                                        </div>
                                        <div className="pickup-dropoff-container" style={{ display: "flex", gap: "4rem" }}>
                                            <div className="pickup-container" style={{ display: "flex", gap: "2rem", width: "100%" }}>
                                                <div className="country">
                                                    <p>From Airport/Hotel</p>
                                                    <Select
                                                        options={TerminalHotel}
                                                        onChange={TerminalOrStay}
                                                        placeholder="Airport/Hotel"
                                                        isSearchable
                                                        styles={{
                                                            control: (provided) => ({
                                                                ...provided,
                                                                borderRadius: '20px',
                                                                cursor: 'pointer'
                                                            }),
                                                            placeholder: (provided) => ({
                                                                ...provided,
                                                                whiteSpace: 'nowrap',
                                                                fontSize: '14px'
                                                            }),
                                                        }}
                                                    />
                                                </div>
                                                {travelTypeFrom === 'terminal' && (
                                                    <div className="country">
                                                        <p>From Airport</p>
                                                        <Select
                                                            options={fromAirport
                                                                .sort((a, b) => a.name.localeCompare(b.name))
                                                                .map((val, id) => ({ value: val._id, label: val.name }))}
                                                            onChange={handleTerminalChange}
                                                            placeholder="Select Airport"
                                                            isSearchable
                                                            styles={{
                                                                control: (provided) => ({
                                                                    ...provided,
                                                                    borderRadius: '20px',
                                                                    cursor: 'pointer'
                                                                }),
                                                                placeholder: (provided) => ({
                                                                    ...provided,
                                                                    whiteSpace: 'nowrap',
                                                                    fontSize: '14px'
                                                                }),
                                                            }}
                                                        />

                                                    </div>
                                                )}
                                                {travelTypeFrom === 'stay' && (
                                                    <div style={{ width: "100%" }}>
                                                        <div className="country">
                                                            <p>From Hotel</p>
                                                            <Select
                                                                options={hotelsWithOther}
                                                                onChange={handleHotelChange}
                                                                placeholder="Select Hotel"
                                                                isSearchable
                                                                styles={{
                                                                    control: (provided) => ({
                                                                        ...provided,
                                                                        borderRadius: '20px',
                                                                        cursor: 'pointer'
                                                                    }),
                                                                    placeholder: (provided) => ({
                                                                        ...provided,
                                                                        whiteSpace: 'nowrap',
                                                                        fontSize: '14px'
                                                                    }),
                                                                }}
                                                            />
                                                        </div>
                                                        {selectedHotelName === 'Other' && (
                                                            setAddNewHotel(true), setSelectedHotelName("OR")
                                                        )}

                                                    </div>
                                                )}
                                            </div>
                                            <div className="dropoff-container" style={{ display: "flex", gap: "2rem", width: "100%" }} >
                                                <div className="country">
                                                    <p>To Airport/Hotel</p>
                                                    <Select
                                                        options={TerminalHotel}
                                                        onChange={TerminalOrStayTo}
                                                        placeholder="Airport/Hotel"
                                                        isSearchable
                                                        styles={{
                                                            control: (provided) => ({
                                                                ...provided,
                                                                borderRadius: '20px',
                                                                cursor: 'pointer'
                                                            }),
                                                            placeholder: (provided) => ({
                                                                ...provided,
                                                                whiteSpace: 'nowrap',
                                                                fontSize: '14px'
                                                            }),
                                                        }}
                                                    />
                                                </div>
                                                {travelTypeTo === 'terminal' && (
                                                    <div className="country">
                                                        <p>To Terminal</p>
                                                        <Select id="select"
                                                            options={fromAirport
                                                                .sort((a, b) => a.name.localeCompare(b.name))
                                                                .map((val, id) => ({ value: val._id, label: val.name }))}
                                                            onChange={handleTerminalChangeTo}
                                                            placeholder="Select Airport"
                                                            isSearchable
                                                            styles={{
                                                                control: (provided) => ({
                                                                    ...provided,
                                                                    borderRadius: '20px',
                                                                    cursor: 'pointer'
                                                                }),
                                                                placeholder: (provided) => ({
                                                                    ...provided,
                                                                    whiteSpace: 'nowrap',
                                                                    fontSize: '14px'
                                                                }),
                                                            }}
                                                        />
                                                    </div>
                                                )}
                                                {travelTypeTo === 'stay' && (
                                                    <div style={{ width: "100%" }}>
                                                        <div className="country">
                                                            <p>To Hotel</p>
                                                            <Select
                                                                options={hotelsWithOther}
                                                                onChange={handleHotelChangeTo}
                                                                placeholder="Select Hotel"
                                                                isSearchable
                                                                styles={{
                                                                    control: (provided) => ({
                                                                        ...provided,
                                                                        borderRadius: '20px',
                                                                        cursor: 'pointer'
                                                                    }),
                                                                    placeholder: (provided) => ({
                                                                        ...provided,
                                                                        whiteSpace: 'nowrap',
                                                                        fontSize: '14px'
                                                                    }),
                                                                }}
                                                            />
                                                        </div>
                                                        {selctedHotelNameTo === 'Other' && (
                                                            setAddNewHotel(true), setSelectedHotelNameTo("OR")
                                                        )}
                                                    </div>

                                                )}
                                            </div>
                                        </div>
                                        <div className="date-passenger-transfertype-container">
                                            <div className="date-container">
                                                <div className="country"
                                                    style={{ width: "50%" }}
                                                >
                                                    <p>From Date</p>
                                                    <input style={{ color: 'hsl(0, 0%, 20%)' }}
                                                        type="date"
                                                        placeholder="dd/MM/yyyy"
                                                        value={selectedDate}
                                                        onChange={handleDateChange}
                                                        min={getCurrentDate()}
                                                        required
                                                    />
                                                </div>

                                                {/* {tripType === 'ROUND_TRIP' && ( */}
                                                <div className="country" id={tripType === 'ROUND_TRIP' ? '' : 'opacity'}
                                                    style={{ width: "50%" }}
                                                >
                                                    <p>To Date</p>
                                                    <input style={{ color: "hsl(0, 0%, 20%)" }}
                                                        type="date"
                                                        placeholder="dd/MM/yyyy"
                                                        value={selectedDateTo}
                                                        onChange={(e) => {
                                                            e.preventDefault();
                                                            setSelectedDateTo(e.target.value)
                                                        }}
                                                        min={selectedDate}
                                                        disabled={tripType === 'ROUND_TRIP' ? false : true}
                                                    />
                                                </div>
                                                {/* //    )} */}
                                            </div>
                                            <div className="passenger-transfertype-container">
                                                <div className="Adults-passengers">
                                                    <p>ADULTS</p>
                                                    <div className="numberOfPassenger">
                                                        <button className="inc-dec-btn"
                                                            onClick={(e) => {
                                                                e.preventDefault();
                                                                if (adultsPassengers > 0) {
                                                                    setAdultsPassengers(adultsPassengers - 1)
                                                                    setadult(adultsPassengers - 1)
                                                                }
                                                            }}
                                                        >-</button>
                                                        <button className="numberOfAdults" style={{ color: "hsl(0, 0%, 20%)" }}
                                                        >{adultsPassengers}</button>
                                                        <button className="inc-dec-btn"
                                                            onClick={(e) => {
                                                                e.preventDefault()
                                                                setAdultsPassengers(adultsPassengers + 1)
                                                                setadult(adultsPassengers + 1)
                                                            }}
                                                        >+</button>
                                                    </div>
                                                </div>
                                                <div className="Adults-passengers">
                                                    <p>Children
                                                        {/* (<LiaLessThanSolid />12 Years) */}
                                                    </p>
                                                    <div className="numberOfPassenger">
                                                        <button className="inc-dec-btn"
                                                            onClick={(e) => {
                                                                e.preventDefault()
                                                                if (childPassengers > 0) {
                                                                    setChildPassengers(childPassengers - 1)
                                                                    setChild(childPassengers - 1)
                                                                }
                                                            }}
                                                        >-</button>
                                                        <button className="numberOfAdults" style={{ color: "hsl(0, 0%, 20%)" }}
                                                        >{childPassengers}</button>
                                                        <button className="inc-dec-btn"
                                                            onClick={(e) => {
                                                                e.preventDefault()
                                                                setChildPassengers(childPassengers + 1)
                                                                setChild(childPassengers + 1)
                                                            }}
                                                        >+</button>
                                                    </div>
                                                </div>
                                                <div className="country">
                                                    <p>TransferType</p>
                                                    <Select
                                                        options={TransferType}
                                                        onChange={transfertypeChange}
                                                        placeholder="TransferType"
                                                        isSearchable
                                                        styles={{
                                                            control: (provided) => ({
                                                                ...provided,
                                                                borderRadius: '20px',
                                                                cursor: 'pointer'
                                                            }),
                                                            placeholder: (provided) => ({
                                                                ...provided,
                                                                whiteSpace: 'nowrap',
                                                                fontSize: '14px'
                                                            }),
                                                        }}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="transfers-find-btn">
                                    <button type="submit">Search Transfer</button>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            {/* -------------------------------------Card Deatils------------------------------*/}
            {loading ? (<div className="loader-container">
                <div className="loader1">
                    <img src="/transferIcon.png" />
                </div>
            </div>) : (
                <div className="transfers-card-container">
                    {filterList?.length > 0 ? filterList.map((val, id) => {
                        return <>
                            <div key={id} className="transfer-card-details">
                                <div className="transfer-card-image">
                                    <img src={val.vehicle.images} alt="vehicle Image" />
                                </div>
                                <div className="transfer-card-type">
                                    <div id="transfer-card-type">
                                        <div id="transfer-type">{val.transferType}</div>
                                    </div>
                                    <div className="min-max-pass-bag-allowed">
                                        <div className="min-max-pass">
                                            <img src="/Passenger.svg" />
                                            <span> (Min. <b>1</b> - Max. <b>{val.vehicle?.maxPassenger}</b>) Passenger allowed</span>
                                        </div>
                                        <div className="min-max-pass">
                                            <img src="/suitcase.svg" />
                                            <span> (Max. <b>{val.vehicle?.suitCaseAllowed}</b>) Suitcase allowed</span>
                                        </div>
                                        <div className="min-max-pass">
                                            <img src="/handbag.svg" />
                                            <span> (Max. <b>{val.vehicle?.handbagAllowed}</b>) Handbag allowed</span>
                                        </div>

                                    </div>
                                    <div id="description"
                                        onClick={() => { handeDescriptionPage(val._id, val); setTransferDetails(val) }}
                                    >Full Description</div>
                                </div>
                                <div className="transfer-card-price">
                                    <div className="price">
                                        <h4 style={{ display: "flex", justifyContent: "flex-end" }}><b>AED</b>&nbsp;
                                            {(val.transferType === 'Shared' || val.transferType === 'Scheduled') &&
                                                <p style={{ color: "blue", fontSize: "1.5rem" }}>{val.cost}<span
                                                    style={{ fontSize: "20px", color: "#267540" }}
                                                >&nbsp;/&nbsp;person</span></p>
                                            }
                                            {val.transferType === 'Private' &&
                                                <p style={{ color: "blue" }}>{val.cost}</p>
                                            }
                                        </h4>
                                        {(val.transferType === 'Shared' || val.transferType === 'Scheduled') &&
                                            tripType === 'ONE_WAY' && (
                                                <p className="travler-price">One Way Price, for <b>&nbsp;one&nbsp;</b>travellers</p>
                                            )}
                                        {(val.transferType === 'Private') &&
                                            tripType === 'ONE_WAY' && (
                                                <p className="travler-price">One Way Price, for <b>&nbsp;all&nbsp;</b> travellers</p>
                                            )}

                                        {(val.transferType === 'Shared' || val.transferType === 'Scheduled') &&
                                            tripType === 'ROUND_TRIP' && (
                                                <p className="travler-price">Roundtrip price, for <b>&nbsp;one&nbsp;</b>travellers</p>
                                            )}
                                        {(val.transferType === 'Private') &&
                                            tripType === 'ROUND_TRIP' && (
                                                <p className="travler-price">Roundtrip price, for <b>&nbsp;all&nbsp;</b> travellers</p>
                                            )}

                                    </div>
                                    <div className="select-transfer-btn">
                                        {/* <button
                                     onClick={() =>
                                         handleSelectTransferPage(val._id,val)
                                     }
                                 >Select Transfer</button> */}
                                        <button
                                            onClick={() => { setBookTransfer(true); setTransferDetails(val) }}
                                        >
                                            Book Transfer
                                        </button>
                                    </div>
                                </div>

                            </div>
                        </>
                    }) : (<div className="data-not-found">
                        <h2>{dataNotfound}</h2>
                    </div>)}

                </div>
            )}
            <Footer />
            {/*---------------------------------PopUp Pages-------------------------------------*/}
            {descriptionPage && <TransferDescription onClose={handleDescriptionClosePage}
                descriptionPageData={descriptionPageData}
                handleSelectTransferPage={handleSelectTransferPage}
                tripType={tripType}
                adultsPassengers={adultsPassengers}
                childPassengers={childPassengers}
                selectedDate={selectedDate}
                selectedDateTo={selectedDateTo}
            />}
            {selectTransferPage && <SelectTransfer onClose={handleDescriptionClosePage}
                selectTransferPageData={selecttransferPageData}
                tripType={tripType}
            />}
            {addNewHotel && <AddHotel countryId={countryId} cityId={cityId} />}
            {bookTransfer && <BookTransfer tripType={tripType}
                adultsPassengers={adultsPassengers}
                childPassengers={childPassengers}
                selectedDate={selectedDate}
                selectedDateTo={selectedDateTo}
            />}
        </div>

    </>
}

export default Transfers;
