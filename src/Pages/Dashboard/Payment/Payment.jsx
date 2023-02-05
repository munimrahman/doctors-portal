import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import React from "react";
import { useLoaderData } from "react-router-dom";
import CheckoutForm from "./CheckoutForm";

const stripePromise = loadStripe(process.env.REACT_APP_stripe_pk);

const Payment = () => {
  const booking = useLoaderData();

  return (
    <div>
      <h1 className="text-3xl mb-5">Payment for {booking.treatment}</h1>
      <p className="text-xl">
        Please pay <strong>${booking.price}</strong> for your appointment on{" "}
        {booking.appointmentDate} at {booking.slot}
      </p>
      <div className="w-96 my-12">
        <Elements stripe={stripePromise}>
          <CheckoutForm booking={booking} />
        </Elements>
      </div>
    </div>
  );
};

export default Payment;
