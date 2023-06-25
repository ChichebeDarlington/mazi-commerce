import React from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import CheckeoutSteps from "./checkout_steps/CheckoutSteps";
import { useGlobalContextHook } from "./contextAPI/context/context";

const PlaceOrder = () => {
  const { cart } = useGlobalContextHook();
  return (
    <div>
      <CheckeoutSteps step1 step2 step3 step4 />
      <Helmet>
        <title>Preview order</title>
      </Helmet>
      <div>
        <h3>Shipping</h3>
        <p>
          Name <strong>{cart.shippingAddress.fullName}</strong>
        </p>
        <p>
          Address<strong>{cart.shippingAddress.address}</strong>
        </p>
        <p>
          City <strong>{cart.shippingAddress.city}</strong>
        </p>
        <p>
          postalCode <strong>{cart.shippingAddress.postalCode}</strong>
        </p>
        <p>
          Country <strong>{cart.shippingAddress.country}</strong>
        </p>
      </div>
      <Link className="" to="/shipping">
        Edit
      </Link>
    </div>
  );
};

export default PlaceOrder;
