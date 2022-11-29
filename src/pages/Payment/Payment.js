import React from "react";
import { Container } from "react-bootstrap";
import { useLoaderData } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./CheckoutForm";
import { Elements } from "@stripe/react-stripe-js";

const stripePromise = loadStripe(process.env.REACT_APP_stripe_pk);

const Payment = () => {
  const booking = useLoaderData();

  console.log("booking", booking);

  return (
    <Container>
      <h2>Payment for {booking.productName}</h2>
      <p> Please pay taka {booking.productSellingPrice} for your product</p>
      <div className="w-75">
        <Elements stripe={stripePromise}>
          <CheckoutForm booking={booking}/>
        </Elements>
      </div>
    </Container>
  );
};

export default Payment;
