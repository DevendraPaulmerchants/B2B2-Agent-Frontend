import React, { useState } from "react";
import './Registration.css';
import { useNavigate } from "react-router-dom";
import { IoEyeOffSharp } from "react-icons/io5";
import { MdRemoveRedEye } from "react-icons/md";
import { Link } from 'react-router-dom';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

// const Registration=({ onRegistration })=>{
const Registration = () => {
    document.body.style.overflow = "auto";
    const [showpass, setShoPass] = useState(true);
    const [agentName, setAgentName] = useState('');
    const [vatNumber, setVAtNumber] = useState('');
    const [address, setAddress] = useState('');
    const [directorPhoneNumber, setDirectorPhoneNumber] = useState('');
    const [ownerName, setOwnerName] = useState('');
    const [agentPhoneNumber, setAgentPhoneNumber] = useState('');
    const [email, setEmail] = useState('');
    const [website, setWebsite] = useState('');
    const [userId, setUserId] = useState('');
    const [password, setPassword] = useState('');
    const [isValid, setIsValid] = useState(true);
    const [isPhoneValid, setPhoneValid] = useState(false);
    const [loading, setLoading] = useState(false);

    const capitalize = (str) => {
        if (typeof str !== 'string') return '';
        return str?.charAt(0).toUpperCase() + str?.slice(1).toLowerCase();
    };

    const handlePasswordChange = (e) => {
        e.preventDefault();
        const value = e.target.value.trim();
        setPassword(value);
        const isValidPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/.test(value);
        setIsValid(isValidPassword);
    }

    const formData = {
        agentName: agentName,
        vatNumber: vatNumber,
        address: address,
        directorPhoneNumber: directorPhoneNumber,
        ownerName: ownerName,
        agentPhoneNumber: directorPhoneNumber,
        email: email,
        website: website,
        userId: userId,
        password: password,
    };

    const navigate = useNavigate();
    const handleRegistration = (e) => {
        e.preventDefault();
        if (!isPhoneValid) {
            alert("Please Check Mobile Number");
            return;
        }
        if (!isValid) {
            alert("Password criteria do not match");
            return;
        }
        else {
            setLoading(true)
            fetch('https://admin.magicalvacation.com/api/v1/agent/auth/register', {
                headers: {
                    'Content-Type': 'application/json'
                },
                method: 'POST',
                mode: 'cors',
                body: JSON.stringify(formData)
            }).then((res) => res.json())
                .then((data) => {
                    setLoading(false);
                    if (data.message === 'agent registered successfully!!') {
                        alert("Account created Successfully");
                        navigate('/')
                    } else {
                        alert(data.message)
                        navigate('/registration')
                    }
                })
                .catch((err) => {
                    alert(err)
                    setLoading(false)
                })
        }
    };

    return <>
        <div className="registration-page-container">
            <div className="registration-page">
                <h2>WELCOME</h2>
                <div className="registration-page-content">
                    <form onSubmit={handleRegistration}>
                        {/* -------------------------------------------First field--------------------------        */}
                        <div className="registration-agent-vat-tax">
                            <div className="registration-agent">
                                <input type="text" placeholder="Agent Name" name="agentName" className="registration-agent-input"
                                    value={agentName} minLength={3} maxLength={30}
                                    onChange={(e) => {
                                        const name = e.target.value;
                                        const isAlphabetic = /^[a-zA-Z\s]*$/.test(name);
                                        if (isAlphabetic || name === "") {
                                            const sanitizedValue = name.replace(/^\s+|\s+(?=\s)/g, '');
                                            setAgentName(capitalize(sanitizedValue));
                                        }
                                    }}
                                    required />
                            </div>
                            <div className="registration-agent">
                                <input type="text" placeholder="VAT/Tax" name="vatNumber"
                                    value={vatNumber} minLength={3} maxLength={30}
                                    onChange={(e) => {
                                        const vat = e.target.value
                                        const sanitizedValue = vat.replace(/^\s+|\s+(?=\s)/g, '');
                                        setVAtNumber(sanitizedValue)
                                    }}
                                    required />
                            </div>
                            <div className="registration-agent">
                                <input type="text" placeholder="Address" name="address"
                                    value={address} minLength={3} maxLength={40}
                                    onChange={(e) => {
                                        const add = e.target.value
                                        const sanitizedValue = add.replace(/^\s+|\s+(?=\s)/g, '');
                                        setAddress(sanitizedValue);
                                    }}
                                    required />
                            </div>
                        </div>
                        {/* --------------------------------------- 2nd field-------------------------------           */}
                        <div className="registration-agent-vat-tax">
                            <div className="registration-agent">
                                {/* <PhoneInput
                                    country={'in'}
                                    placeholder="Enter  Agent Mobile number"
                                    value={directorPhoneNumber}
                                    onChange={(value) => {
                                        setDirectorPhoneNumber(value);
                                        setAgentPhoneNumber(value);
                                    }}

                                    inputProps={{
                                        name: 'directorPhoneNumber',
                                        required: true,
                                    }}
                                /> */}
                                <PhoneInput inputClass="ant-input phoneInput"
                                    country={'in'} enableSearch
                                    onChange={(value, country, e, formattedValue) => {
                                        const { format, dialCode } = country;
                                        if (format?.length === formattedValue?.length &&
                                            (value.startsWith(dialCode) || dialCode.startsWith(value))) {
                                            setPhoneValid(true);
                                            setAgentPhoneNumber(value);
                                            setDirectorPhoneNumber(value);
                                        }
                                        else {
                                            setPhoneValid(false)
                                        }
                                    }} />
                            </div>
                            <div className="registration-agent">
                                <input type="text" placeholder="Owner/Director Name" name="ownerName"
                                    value={ownerName} minLength={3} maxLength={30}
                                    onChange={(e) => {
                                        const name = e.target.value;
                                        const isAlphabetic = /^[a-zA-Z\s]*$/.test(name);
                                        if (isAlphabetic || name === "") {
                                            const sanitizedValue = name.replace(/^\s+|\s+(?=\s)/g, '');
                                            setOwnerName(sanitizedValue)
                                        }
                                    }}
                                    required />
                            </div>
                            <div className="registration-agent">
                                <input type="email" placeholder="Email id" name="email"
                                    value={email} minLength={3} maxLength={40}
                                    onChange={(e) => {
                                        const email = e.target.value;
                                        const sanitizedValue = email.replace(/^\s+|\s+(?=\s)/g, '');
                                        setEmail(sanitizedValue)
                                    }}
                                    required />
                            </div>
                        </div>
                        {/* --------------------------------------3rd Field------------------------------------*/}
                        <div className="registration-agent-vat-tax">
                            <div className="registration-agent">
                                <input type="text" placeholder="Website" name="website"
                                    value={website} minLength={3} maxLength={20}
                                    onChange={(e) => {
                                        const website = e.target.value;
                                        const sanitizedValue = website.replace(/^\s+|\s+(?=\s)/g, '');
                                        setWebsite(sanitizedValue)
                                    }}
                                    required />
                            </div>
                            <div className="registration-agent">
                                <input type="text" placeholder="UserId" name="userId"
                                    value={userId} minLength={3} maxLength={10}
                                    onChange={(e) => {
                                        const userid = e.target.value;
                                        const sanitizedValue = userid.replace(/^\s+|\s+(?=\s)/g, '');
                                        setUserId(sanitizedValue);
                                    }}
                                    required />
                            </div>
                            <div className="registration-password" style={{ width: "100%" }}>
                                <div className="registration-agent">
                                    <input type={showpass ? 'password' : 'text'}
                                        placeholder="Password" name="password"
                                        value={password}
                                        onChange={handlePasswordChange}
                                        minLength={8}
                                        maxLength={16}
                                        required />
                                    <span onClick={() => { setShoPass(!showpass) }}>{showpass ? <IoEyeOffSharp style={{ color: "#297CBB" }} /> :
                                        <MdRemoveRedEye style={{ color: "#297CBB" }} />}
                                    </span> &nbsp;&nbsp;&nbsp;
                                </div>
                                {!isValid && (<p style={{ margin: "0", color: "red", fontSize: "12px", width: "fit-content" }}>
                                    <img src="/alert.svg" alt="alert-logo" style={{ color: "red" }} />&nbsp;
                                    Must be at least one Uppercase, one lowercase, one special character and one numeric digit</p>)}
                            </div>
                        </div>
                        {isValid && <br />}
                        {/* -----------------------------Register button---------- */}
                        <div className="registration-btn">
                            {loading ? <div className="loader"></div> :
                                <>
                                    <button type="submit">REGISTER</button>
                                </>}
                        </div>
                    </form>
                    {/* --------------------------- Do not have account------------- */}
                    <div className="login-not-have-account">
                        <p>You have an account? <Link to="/"> Sign In</Link></p>
                    </div>
                </div>
            </div>
        </div>
    </>
}
export default Registration;