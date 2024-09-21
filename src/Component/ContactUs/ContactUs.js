import React, { useState, useEffect } from "react";
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

import { APIPath } from "../../Config";
import { useNavigate } from "react-router-dom";
import './Contactus.css'
import Footer from "../Footer/Footer";


const ContactUs = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  document.body.style.overflow = 'auto';
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [isPhoneValid, setPhoneValid] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const user = {
    name: name,
    email: email,
    mobile: mobile,
    message: message
  }
  const capitalize = (str) => {
    if (typeof str !== 'string') return '';
    return str?.charAt(0).toUpperCase() + str?.slice(1).toLowerCase();
  };
  const handleNameChange = (e) => {
    const name = e.target.value;
    const isAlphabetic = /^[a-zA-Z\s]*$/.test(name);
    if (isAlphabetic || name === "") {
      const sanitizedValue = name.replace(/^\s+|\s+(?=\s)/g, '');
      setName(capitalize(sanitizedValue))
    }
  };
  const handleEmailChange = (e) => {
    const email = e.target.value;
    if (email || email === "") {
      setEmail(email);
    }
  };

  // const handleMobileChange = (value) => {
  //   setMobile(value)
  // }
  const handleMessageChane = (e) => {
    const message = e.target.value;
    const ismessageRegex = /^[a-zA-Z0-9,.'"\s]*$/.test(message)
    if (ismessageRegex || message === "") {
      setMessage(message)
    }
  }
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.length < 3) {
      alert("Please fill lead passenger details")
      return
    }
    if (!isPhoneValid) {
      alert("Please check Mobile Number");
      return;
    }
    setLoading(true)
    fetch(`${APIPath}/api/v1/contactus`, {
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'POST',
      mode: 'cors',
      body: JSON.stringify(user)
    }).then((res) => res.json())
      .then((data) => {
        alert("Thank you for contacting us! We will respond to you shortly.")
        setLoading(true);
        setName("")
        setEmail("")
        setMobile("")
        setMessage("")
        navigate('/')
      })
      .catch((err) => {
        alert(err);
        setLoading(true)
        return
      })
  };

  return <>
    <div id="contactus">
      {/* <div className="pagebanner" >
        <h2>Contact Us</h2>
      </div> */}
      <div className="address-container">
        <div className="contactUs-address">
          <h2>Contact Us</h2>
          <div>
            <img src="contactUs.svg" alt="Contact Us" height={300} />
          </div>
          <p className="contactUs-icon-text">
            <img src="location.svg" alt="Loaction" />
            202 Rania Business Center Al Barsha first, Dubai, UAE
          </p>
          <div className="contactUs-call-email">
            <p className="contactUs-icon-text">
              <img src="Call.svg" alt="Contact No." />
              +971 444 52101
            </p>
            <p className="contactUs-icon-text">
              <img src="email.svg" alt="Email" />
              <a href="mailto:info@magicalvacation.com">info@magicalvacation.com</a>
            </p>
          </div>
        </div>
        <div className="container1">
          <h3>Send us a query</h3>
          <form className="container1-form" onSubmit={handleSubmit}>
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              className="contact-input"
              placeholder="Your name.."
              name="name"
              value={name}
              onChange={handleNameChange}
              required
            />
            <div className="contactUs-email-mobile">
              <div className="contactUs-email">
                <label htmlFor="email">Email:</label>
                <input
                  type="email"
                  className="contact-input"
                  placeholder="Your email.."
                  name="email"
                  value={email}
                  maxLength={30}
                  onChange={handleEmailChange}
                  required
                />
              </div>
              <div className="contactUs-mobile">
                <label htmlFor="mobile">Mobile:</label>
                <PhoneInput inputClass="ant-input phoneInput" className="mobile-number-validation"
                  country={'in'} enableSearch value={mobile}
                  onChange={(value, country, e, formattedValue) => {
                    const { format, dialCode } = country;
                    if (format?.length === formattedValue?.length &&
                      (value.startsWith(dialCode) || dialCode.startsWith(value))) {
                      setPhoneValid(true);
                      setMobile(value);
                    }
                    else {
                      setPhoneValid(false)
                    }
                  }} />
              </div>
            </div>


            <label htmlFor="message">Message:</label>
            <textarea
              placeholder="Write something.."
              name="message"
              value={message}
              onChange={handleMessageChane}
              required
            ></textarea>
            {loading ? <div className="loader"></div> :
              <input type="submit" value="Submit" />
            }
          </form>
        </div>
      </div>
    </div>
    <Footer />
  </>
}
export default ContactUs;