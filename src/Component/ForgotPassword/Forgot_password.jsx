import React, { useState } from "react";
import { IoMdClose } from "react-icons/io";
import './Forgot_password.css';
import PasswordReset from "./PasswordReset";
import { APIPath } from "../../Config";

const ForgotPassword = ({ onClose }) => {
    document.body.style.overflow = 'hidden';
    const [email, setEmail] = useState('');
    const [resetScreen, setResetScreen] = useState(false);

    const onEmailChange = (e) => {
        setEmail(e.target.value)
    }
    const sendLink = async () => {
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
                throw new Error('Failed to send reset link');
            }
    
            const data = await response.json();
            alert(data.message)
            setResetScreen(true)
        } catch (error) {
            alert(error.message);
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
                        <p>Eneter your registered email</p>
                        <input type="email" placeholder="Enter your email" value={email} required maxLength={40} onChange={(e) => {
                            onEmailChange(e)
                        }} />
                    </div>
                    <div className="forgot-password-button">
                        <button
                        // onClick={sendLink}
                        >Send Link</button>
                    </div>
                    <br />
                </form>
            </div>
        </div>
        {resetScreen && <PasswordReset />}
    </>
}
export default ForgotPassword;