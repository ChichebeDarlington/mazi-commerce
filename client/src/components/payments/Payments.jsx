import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";
import CheckoutStepsteps from "../checkout_steps/CheckoutSteps";
import { useGlobalContextHook } from "../contextAPI/context/context";

const Payments = () => {
  const navigate = useNavigate();
  const {
    cart: { shippingAddress, paymentMethod },
    dispatch,
  } = useGlobalContextHook();

  const [paymentMethodName, setPaymentMethodName] = useState(
    paymentMethod || "Paypal"
  );

  useEffect(() => {
    if (!shippingAddress.address) {
      navigate("/shipping");
    }
  }, [shippingAddress, navigate]);

  const handleSubmit = (m) => {
    m.preventDefault();
    dispatch({ type: "SAVE_PAYMENT_METHOD", payload: paymentMethodName });
    window.localStorage.setItem("paymentMethod", paymentMethodName);
    navigate("/placeorder");
  };

  return (
    <div>
      <CheckoutStepsteps step1 step2 step3 />
      <Helmet>
        <title>Payments Method</title>
      </Helmet>

      <h1>Payment Methods</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="Paypal">Paypal</label>
          <input
            type="radio"
            id="Paypal"
            aria-label="Paypal"
            value="Paypal"
            checked={paymentMethod === "Paypal"}
            onChange={(m) => setPaymentMethodName(m.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="Stripe">Stripe</label>
          <input
            type="radio"
            id="Stripe"
            aria-label="Stripe"
            value="Stripe"
            checked={paymentMethod === "Stripe"}
            onChange={(m) => setPaymentMethodName(m.target.value)}
          />
        </div>
        <button>Next</button>
      </form>
    </div>
  );
};

export default Payments;
