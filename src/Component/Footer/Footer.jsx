import { Link } from 'react-router-dom';
import './Footer.css'

const Footer = () => {
    return <>

        <div className='footer-container'>
            <div className='footer-link'>
                <div className='services'>
                    <h3>Corporate</h3>
                    <ul>
                        <li> <Link to="/aboutus">About us</Link> </li>
                        <li> <Link to="/privacy_policy">Privacy Policy</Link> </li>
                        <li> <Link to="/term&condition">Terms & Conditions</Link> </li>
                        <li> <Link to="/contactus">Contact Us</Link> </li>
                    </ul>
                </div>
                <div className='services'>
                    <h3>Services</h3>
                    <ul>
                        <li> <Link to="/packages">Packages</Link> </li>
                        <li> <Link to="/attractions">Attractions</Link> </li>
                        <li> <Link to="/landcombos">Land&nbsp;combos</Link> </li>
                        <li> <Link to="/transfers">Transfers</Link> </li>
                    </ul>
                </div>
                <div className='services'>
                    <h3>Useful Links</h3>
                    <ul>
                        <a href="https://magicalvacation.com/app/blogs" target='blank'><li>Blog</li></a>
                        <a href="https://magicalvacation.com/app/gallery" target='blank'><li>Gallery</li></a>

                    </ul>
                </div>
                <div className='follow-us'>
                    <h3>Follow Us</h3>
                    <ul className='social'>
                        <li className='social'>
                            <a href="https://www.facebook.com/profile.php?id=61552300956220" target='blank'><span><i class="fa fa-facebook"></i></span></a>
                            <span className='twitter'><i class="fa fa-twitter"></i></span>
                            <a href="https://www.youtube.com/channel/UC7dtLCXl2SOnGdWvtGT6cEg" target='blank'><span><i class="fa fa-youtube-play"></i></span>   </a>
                            <a href="https://www.instagram.com/magicalvacations7/?next=%2F" target='blank'><span className='instagram'><i class="fa fa-instagram"></i></span></a>
                        </li>
                    </ul>
                </div>

            </div>

            <div className='address-subscribe'>
                <div className='address'>
                    <div className='dubai-address'>
                        <p>
                            <b>Dubai Office:</b> <br />
                            <b><i class="fa fa-home" style={{ marginRight: "0.3rem" }}></i>Office no: </b>
                            202 Rania Business Center Al Barsha First, Dubai, UAE <br />
                            <i class="fa fa-phone" style={{ marginRight: "0.3rem" }}></i>
                            +971 444 52101 <br />
                            <i class="fa fa-envelope-o" style={{ marginRight: "0.3rem" }}></i>
                            <a href="mailto:info@magicalvacation.com">info@magicalvacation.com</a>
                        </p>
                    </div>
                </div>
                <div className='subscribe1'>
                    <form >
                        <label className='footer-label' style={{ fontWeight: "600" }}>Subscribe to Our NewsLetter</label><br />
                        <input className='footer-input' type="email" placeholder="Your Email" maxLength={40} required />
                        <button style={{ fontWeight: "500" }}>Contact Now</button>
                    </form>
                    <br /><br />
                    <div>
                        <h5 style={{ marginBottom: "0", fontFamily: "Montserrat", fontWeight: "600" }}>We Accept Debit and Credit Cards </h5>
                        <img src='/Master.png' alt='Master-Card' style={{ width: "120px",height:"100px" }} />
                        <img src='/Visa.webp' alt='Master-Card' style={{ width: "120px",height:"100px" }} />
                        <img src='/UnionPay.png' alt='Master-Card' style={{ width: "120px",height:"100px" }} />
                    </div>
                </div>
            </div>
        </div>
        <hr style={{ margin: "0" }} />
        <div className='copyright'>
            <small>Copyright 2023 Magical vacation. All right Reserved</small>
        </div>
    </>
}
export default Footer;