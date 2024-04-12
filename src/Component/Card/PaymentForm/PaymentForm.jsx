import React, { useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import './PaymentForm.css';

const PaymentForm = () => {
  useEffect(() => {
    const loadStripePromise = async () => {
      const stripe = await loadStripe(
        "your_stripe_public_key"
      );
      const elements = stripe.elements();

      const cardNumberElement = elements.create("cardNumber");
      cardNumberElement.mount("#card-number-element");

      const cardExpiryElement = elements.create("cardExpiry");
      cardExpiryElement.mount("#card-expiry-element");

      const cardCvcElement = elements.create("cardCvc");
      cardCvcElement.mount("#card-cvc-element");
    };

    loadStripePromise();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
  };

  return (
    <Elements stripe={loadStripe("pk_test_51ONuagDlvGS7eWqTkz88NYU7TrRkcAW9S9zGc0fMDps0q0OiFXKaZn1mVPRrIvWynUGO20JR3e6AqjNvbjbnVk3l00ugbCgX6d")}>
      <form
        id="payment-form"
        onSubmit={handleSubmit}
        data-secret="pi_3OhmDbDlvGS7eWqT4XRRYxb9_secret_7xz7bRn0dwTrwYyUXLtfEl9LB"
      >
        <div>
          <label htmlFor="card-number">Card Number</label>
          <div id="card-number-element"></div>
        </div>
        <div>
          <label htmlFor="expiry">Expiration Date</label>
          <div id="card-expiry-element"></div>
        </div>
        <div>
          <label htmlFor="cvv">CVV</label>
          <div id="card-cvc-element"></div>
        </div>
        <button id="submit" type="submit">Submit</button>
      </form>
    </Elements>
  );
};

export default PaymentForm;



// import React from "react";
// import './PaymentForm.css';
// import { loadStripe } from "@stripe/stripe-js";
// import { Elements } from "@stripe/react-stripe-js";

// const stripePromise = loadStripe("pk_test_51ONuagDlvGS7eWqTkz88NYU7TrRkcAW9S9zGc0fMDps0q0OiFXKaZn1mVPRrIvWynUGO20JR3e6AqjNvbjbnVk3l00ugbCgX6d");
//       const elements = stripe.elements();

//       const cardNumberElement = elements.create("cardNumber");
//       cardNumberElement.mount("#card-number-element");

//       const cardExpiryElement = elements.create("cardExpiry");
//       cardExpiryElement.mount("#card-expiry-element");

//       const cardCvcElement = elements.create("cardCvc");
//       cardCvcElement.mount("#card-cvc-element");  

// const handleSubmit = async (event) => {
//     event.preventDefault();
//   };
// const PaymentForm = () => {
//   return (
//     <Elements stripe={stripePromise}>
//       <form id="payment-form" onSubmit={handleSubmit}>
//         <div>
//           <label htmlFor="card-number">Card Number</label>
//           <div id="card-number-element"></div>
//         </div>
//         <div>
//           <label htmlFor="expiry">Expiration Date</label>
//           <div id="card-expiry-element"></div>
//         </div>
//         <div>
//           <label htmlFor="cvv">CVV</label>
//           <div id="card-cvc-element"></div>
//         </div>
//         <button type="submit">Submit</button>
//       </form>
//     </Elements>
//   );
// };

// export default PaymentForm;
