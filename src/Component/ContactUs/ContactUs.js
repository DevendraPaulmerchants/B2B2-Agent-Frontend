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
  const [message, setMessage] = useState("")

  const user = {
    name: name,
    email: email,
    mobile: mobile,
    message: message
  }

  const handleNameChange = (e) => {
    const name = e.target.value;
    const isAlphabetic = /^[a-zA-Z\s]*$/.test(name);
    if (isAlphabetic || name === "") {
      setName(name)
    }
  };
  const handleEmailChange = (e) => {
    const email = e.target.value;
    // const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (email || email === "") {
      setEmail(email);
    }
  };

  const handleMobileChange = (value) => {
    setMobile(value)
  }
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
    // console.log("Form data:", user);
    fetch(`${APIPath}/api/v1/contactus`, {
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'POST',
      mode: 'cors',
      body: JSON.stringify(user)
    }).then((res) => res.json())
      .then((data) => {
        alert(data.message)
        setName("")
        setEmail("")
        setMobile("")
        setMessage("")
        navigate('/')
      })
      .catch((err) => {
        alert(err)
        return
      })
  };

  return <>
    <div id="contactus">
      <div className="pagebanner" >
        <h2>Contact Us</h2>
      </div>
      <div className="address-container">
        <div className="address">
          <h2>Office Address</h2>
          <p>
            <b><i class="fa fa-home"></i>Office no: </b>
            202 Rania Business Center Al Barsha first, Dubai, UAE
          </p>
          <p className='india-address'>
            <b>India Representative Office: Paul Merchants Ltd.</b><br />
            <b>Head Office:</b> <span>SCO 829-830, Sector 22 A, Chandigarh – 160022</span> <br />
            <b>Regd Office:</b> <span>DSM 335, 336, 337, 3rd Floor, DLF Tower, 15,
              Shivaji Marg, Najafgarh Road, New Delhi -110015</span>
          </p>
          <p style={{margin:0}}>
            <b><i class="fa fa-phone"></i></b>
            +971 444 52101
          </p>
          <p style={{margin:0}}>
            <b><i class="fa fa-envelope-o"></i></b>
            <a href="mailto:info@magicalvacation.com">info@magicalvacation.com</a>
          </p>
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

            <label htmlFor="mobile">Mobile:</label>
            <PhoneInput className="mobile-number-validation"
              country={'in'}
              value={mobile}
              onChange={(value) => handleMobileChange(value)}
              inputProps={{
                name: 'mobile',
                required: true,
              }}
            />


            <label htmlFor="message">Message:</label>
            <textarea
              placeholder="Write something.."
              name="message"
              value={message}
              onChange={handleMessageChane}
              required
            ></textarea>

            <input type="submit" value="Submit" />
          </form>
        </div>
      </div>
    </div>
    <Footer />
  </>
}
export default ContactUs;