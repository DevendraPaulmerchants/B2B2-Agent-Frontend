import react,{useEffect} from 'react';
import './Aboutus.css';
import Footer from '../Footer/Footer';
const Aboutus=()=>{
  useEffect(() => {
    window.scrollTo(0, 0);
}, []);
    return <>
    <div className="pagebanner">
         <h2>About Us</h2>
       </div>
    <div className='aboutus'>
        <h2>About Company</h2>
        <div className='paragraph-image'>
            <div className='paragraph'>
               <p>
               Alhusul Ealaa Lamhat Min Dubay!Get a Glimpse of Dubai with MAGICAL VACATION. 
               Established by 2 seasoned professionals and tyrant Business owners with two 
               decades of enduring experience in the world of travel and tourism, MAGICAL 
               VACATION is a Destination Management Company that offers its customers from 
               across the world an experience that will make them crave and desire more for 
               travelling. <br></br> <br></br>
               The lalaland of Dubai is simply astounding, the magical transition
                from the plain bedsheets of sand dunes to real-life sci-fi skyrocketing buildings 
                and technological amazements is simply unbelievable. To make this experience 
                Jaw-dropping for all customers, Magical Vacation has made sure to make super flexible, 
                customizable and suitable holiday packages. Best Dubai tours at the most exotic 
                locations at exclusive and exquisite rates, with special tours and holiday packages 
                for honeymooners. <br></br><br></br>
                Our objective is to give the best services to our customers so that 
                they can always rely on us for their safety, pleasure and touring experiences. Magical 
                Vacation is registered under the Dubai Department of Tourism and Commerce Marketing. 
                We serve to provide only the best, with our hands on all local transporters, and guides.
               </p>
            </div>
            <div className='image'>
              <img src='https://res.cloudinary.com/ddxawuqwy/image/upload/v1704172861/packages/pt5_mw3jmo.jpg' />
            </div>
        </div>
        <div   >
            <br></br><br></br>
            <p>Magical Vacation makes sure that all our customers get the most authentic exposure to DUBAI.</p>
            <br></br><br></br>
            <p>Not only people travelling to Dubai but the Local citizens of the United Arab Emirates can also
              transverse to the lands of other countries in the most luxurious and enriching way. 
              Take a leap towards journeying to the other parts of the world and gather the experience
               of the cultural and multifariousness of the other regions of the planet.</p>
              <br></br>
            <h3>Our Services</h3>   
            <p>  <br></br>
                From Air Ticketing to Visa and Hotel Reservations, Magical Vacation are prepared for all.
                 We understand and sustain the fact that tailored packages may not fit all, so we keep 
                 it open for our customers to make adjustments and get their free will customisable packages</p>
                 <br></br>
                 <ul style={{marginLeft:"2rem"}}>
                    <li>Local guides</li>
                    <li>Tourist attractions</li>
                    <li>Cab services</li>
                 </ul>
                 <br></br>
                 <p>All you need to do is Travel with Leisure rest will be organised and systemized by MAGICAL VACATION</p>
        </div>
    </div>
    <Footer/>
    </>
}
export default Aboutus;