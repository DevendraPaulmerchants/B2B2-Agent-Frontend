import React, { useState, useEffect } from "react";
import { IoEyeOffSharp } from "react-icons/io5";
import { MdRemoveRedEye } from "react-icons/md";
import { useSearchParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { APIPath } from "../../Config";


const PasswordReset = () => {
    const [pass1, setPass1] = useState(false)
    const [pass2, setPass2] = useState(false);
    const [password1, setPassword1] = useState('');
    const [password2, setPassword2] = useState('');
    const [error, setError] = useState(true);
    const [isValid, setIsValid] = useState(false);

    const [token1, setToken1] = useState("");
    const [id, setId] = useState("")

    let [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate();
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

    const showPassword1 = () => {
        setPass1(!pass1);
    }
    const showPassword2 = () => {
        setPass2(!pass2);
    }
    useEffect(() => {
        setToken1(searchParams.get("token"));
        setId(searchParams.get("id"))
    }, [])

    const resetPassword = () => {
        if (!isValid) {
            alert("password not fulfill all criteria")
            return
        }
        if (password1 !== password2) {
            setError(false)
            alert("Password not matching")
            return
        }
        else {
            setError(true);
            fetch(`${APIPath}/api/v1/agent/auth/forgot-password`, {
                headers: {
                    // 'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                method: 'POST',
                mode: 'cors',
                body: JSON.stringify({
                    token: token1,
                    userId: id,
                    password: password1
                })
            }).then((res) => res.json())
                .then((data) => {
                    alert("Password reseted successfully...")
                    navigate('/login')
                })
                .catch((err) => {
                    alert(err)
                    return
                })
        }
    }
    return <>
        <div className="password-reset-container">
            <div className="password-reset-main">
                <h2>Reset Password</h2>
                <form onSubmit={(e) => {
                    e.preventDefault();
                    resetPassword();
                }}>
                    <p>New password *</p>
                    <div className="input-and-eye">
                        <input type={pass1 ? "text" : "password"} placeholder="must have 8 characters"
                            required maxLength={16} minLength={8}
                            value={password1}
                            onChange={handlePasswordChange}
                        />
                        <span style={{ color: "rgba(61, 61, 61, 0.5)", cursor: "pointer" }}
                            onClick={showPassword1}
                        >{pass1 ? <MdRemoveRedEye /> : <IoEyeOffSharp />}</span>

                    </div>
                    {!isValid && (<p style={{ margin: "0", color: "red", fontSize: "12px" }}>
                        <img src="/alert.svg" alt="alert-logo" style={{ color: "red" }} />&nbsp;
                        Must be at least one Uppercase, one lowercase, one special character and one numeric digit</p>)}
                    <p>Confirm password *</p>
                    <div className="input-and-eye">
                        <input type={pass2 ? "text" : "password"} placeholder="must have 8 characters"
                            required maxLength={16} minLength={8}
                            value={password2}
                            onChange={handlePasswordChange2}
                        />
                        <span style={{ color: "rgba(61, 61, 61, 0.5)", cursor: "pointer" }}
                            onClick={showPassword2}
                        >{pass2 ? <MdRemoveRedEye /> : <IoEyeOffSharp />}</span>
                    </div>
                    {!error && (<p style={{ margin: "0", color: "red" }}>Password mismatch</p>)}
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
export default PasswordReset;