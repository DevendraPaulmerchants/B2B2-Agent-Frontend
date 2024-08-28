import React, { useState } from "react";
import { IoMdClose } from "react-icons/io";
import './Forgot_password.css';
import { useNavigate } from "react-router-dom";
import { APIPath } from "../../Config";

const ForgotPassword = ({ onClose }) => {
    document.body.style.overflow = 'hidden';
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);

    const onEmailChange = (e) => {
        setEmail(e.target.value)
    }
    const navigate = useNavigate();
    const linkSend =()=>{
        return <div>
            <h3>Reset Password Link send to your Email.</h3>
        </div>
    }
    const sendLink = async () => {
        setLoading(true)
        try {
            const response = await fetch(`${APIPath}/api/v1/agent/auth/request-forgot-password`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: email
                })
            });
            if (!response.ok) {
            }
            const data = await response.json();
            alert(data.message)
            setLoading(false)
            onClose();
        } catch (error) {
            alert(error.message);
            setLoading(false)
        }
    };

    return <>
        <div className="forgot-password-container">
            <div className="forgot-password-main">
                <div className="forgot-password-header">
                    <h2 onClick={onClose}><IoMdClose /></h2>
                </div>
                <form onSubmit={(e) => {
                    e.preventDefault();
                    sendLink();
                }}>
                    <div className="forgot-password-input-container">
                        <p>Enter your registered email</p>
                        <input type="email" placeholder="Enter your email" value={email} required maxLength={40} onChange={(e) => {
                            onEmailChange(e)
                        }} />
                    </div>
                    <div className="forgot-password-button">
                        {loading ? <div className="loader"></div> :
                            <>
                                <button
                                >Send Link</button>
                            </>}
                    </div>
                    <br />
                </form>
            </div>
        </div>
    </>
}
export default ForgotPassword;