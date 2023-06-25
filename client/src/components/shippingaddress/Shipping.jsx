import "./Shipping.css";
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";
import CheckoutSteps from "../checkout_steps/CheckoutSteps";
import { useGlobalContextHook } from "../contextAPI/context/context";

const Shipping = () => {
  const {
    dispatch,
    cart: { shippingAddress },
    userInfo,
  } = useGlobalContextHook();
  const [fullName, setFullName] = useState(shippingAddress.fullName || "");
  const [address, setAddress] = useState(shippingAddress.address || "");
  const [city, setCity] = useState(shippingAddress.city || "");
  const [country, setCountry] = useState(shippingAddress.country || "");
  const [postalCode, setPostalCode] = useState(
    shippingAddress.postalCode || ""
  );

  const navigate = useNavigate();

  useEffect(() => {
    if (!userInfo) {
      navigate("/signin?redirect=/shipping");
    }
  }, [userInfo, navigate]);

  const handleShipping = (m) => {
    m.preventDefault();
    dispatch({
      type: "SAVE_SHIPPING_ADDRESS",
      payload: {
        fullName,
        address,
        city,
        postalCode,
        country,
      },
    });
    window.localStorage.setItem(
      "shippingAddress",
      JSON.stringify({
        fullName,
        address,
        city,
        postalCode,
        country,
      })
    );
    navigate("/payment");
  };

  return (
    <div className="shipping">
      <Helmet>
        <title>Shipping Address</title>
      </Helmet>
      <CheckoutSteps step1 step2 />
      <h1 className="heading">Shipping Address</h1>
      <form className="form" onSubmit={handleShipping}>
        <div className="form-group">
          <label htmlFor="full-name">Full Name</label>
          <input
            id="full-name"
            type="text"
            value={fullName}
            onChange={(m) => {
              setFullName(m.target.value);
            }}
          />
        </div>

        <div className="form-group">
          <label htmlFor="address">Address</label>
          <input
            id="address"
            type="text"
            value={address}
            onChange={(m) => {
              setAddress(m.target.value);
            }}
          />
        </div>

        <div className="form-group">
          <label htmlFor="city">City</label>
          <input
            id="city"
            type="text"
            value={city}
            onChange={(m) => {
              setCity(m.target.value);
            }}
          />
        </div>

        <div className="form-group">
          <label htmlFor="country">Country</label>
          <input
            id="country"
            type="text"
            value={country}
            onChange={(m) => {
              setCountry(m.target.value);
            }}
          />
        </div>

        <div className="form-group">
          <label htmlFor="postal-code">Postal Code</label>
          <input
            id="postal-code"
            type="text"
            value={postalCode}
            onChange={(m) => {
              setPostalCode(m.target.value);
            }}
          />
        </div>
        <div className="btn shipping-btn">
          <button type="sunmit">Continue</button>
        </div>
      </form>
    </div>
  );
};

export default Shipping;
