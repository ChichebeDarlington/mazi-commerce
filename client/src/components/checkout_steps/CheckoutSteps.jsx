import "./CheckoutSteps.css";

function CheckeoutSteps({ step1, step2, step3, step4 }) {
  return (
    <div className="checkout-steps">
      <span className={step1 ? "active" : ""}>Sign In</span>
      <span className={step2 ? "active" : ""}>Shipping</span>
      <span className={step3 ? "active" : ""}>Payment</span>
      <span className={step4 ? "active" : ""}>Place Order</span>
    </div>
  );
}

export default CheckeoutSteps;
