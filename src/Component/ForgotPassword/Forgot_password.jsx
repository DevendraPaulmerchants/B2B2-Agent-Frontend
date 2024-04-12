import React, { useState } from "react";
import { IoMdClose } from "react-icons/io";
import { IoEyeOffSharp } from "react-icons/io5";
import { MdRemoveRedEye } from "react-icons/md";
import './Forgot_password.css';

const ForgotPassword = ({ onClose }) => {
    document.body.style.overflow = 'hidden';
    const [email, setEmail] = useState('');
    const [resetScreen, setResetScreen] = useState(false);

    const onEmailChange = (e) => {
        setEmail(e.target.value)
    }
    const sendLink = () => {
        alert("password reset link sent to your registered email id ")
        setResetScreen(true);
        // onClose();
    }
    const PasswordReset = () => {
        const [pass1,setPass1]=useState(false)
        const [pass2,setPass2]=useState(false);
        const [password1,setPassword1]=useState('');
        const [password2,setPassword2]=useState('');
        const [error,setError]=useState(true);
        const [isValid, setIsValid] = useState(false);

        const handlePasswordChange = (e) => {
            e.preventDefault();
            const value = e.target.value.trim();
            setPassword1(value);
            const isValidPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/.test(value);
            setIsValid(isValidPassword);
        }
        const handlePasswordChange2 = (e) => {
            e.preventDefault();
            const value = e.target.value.trim();
            setPassword2(value);
        }

        const showPassword1=()=>{
            setPass1(!pass1);
        }
        const showPassword2=()=>{
            setPass2(!pass2);
        }
        const resetPassword =()=>{
            if(!isValid){
                alert("password not full fill all creteria")
                return
            }
            if(password1 != password2){
                setError(false)
                alert("Password not matching")
            }
            else {
                setError(true)
                
            }
        }
        return <>
            <div className="password-reset-container">
                <div className="password-reset-main">
                    <h2>Reset Password</h2>
                    <form onSubmit={(e)=>{
                        e.preventDefault();
                        resetPassword();
                        }}>
                        <p>New password *</p>
                        <div className="input-and-eye">
                            <input type={pass1 ? "text" :"password"} placeholder="must have 8 characters" 
                            required maxLength={16} minLength={8}
                            value={password1}
                            onChange={handlePasswordChange}
                            />
                            <span style={{color:"rgba(61, 61, 61, 0.5)",cursor:"pointer"}}
                             onClick={showPassword1}
                            >{pass1 ? <MdRemoveRedEye/>:<IoEyeOffSharp/>}</span>
                            
                        </div>
                        {!isValid && (<p style={{margin:"0",color:"red",fontSize:"12px"}}>
                            <img src="/alert.svg"  alt="alert-logo" style={{color:"red"}}/>&nbsp;
                            Must be at least one Uppercase, one lowercase, one special character and one numeric digit</p>)}
                        <p>Confirm password *</p>
                        <div className="input-and-eye">
                            <input type={pass2 ? "text" :"password"} placeholder="must have 8 characters" 
                            required maxLength={16} minLength={8}
                            value={password2}
                            // onChange={(e)=>{
                            //     e.preventDefault();
                            //     const value=e.target.value.trim("")
                            //     setPassword2(value);
                            // }}
                            onChange={handlePasswordChange2}
                            />
                            <span style={{color:"rgba(61, 61, 61, 0.5)",cursor:"pointer"}}
                             onClick={showPassword2}
                            >{pass2 ? <MdRemoveRedEye/>:<IoEyeOffSharp/>}</span>
                        </div>
                        {!error && (<p style={{margin:"0",color:"red"}}>Password mismatch</p>)}
                        <br />
                        <br />
                        <div style={{ textAlign: "center" }}>
                            <button>Reset</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    }
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