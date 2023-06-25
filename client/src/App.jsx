import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
const Home = lazy(() => import("./pages/Home"));
// import Product from "./components/product/Product";
const Product = lazy(() => import("./components/product/Product"));
import NavBar from "./components/nav/Navbar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Cart from "./components/cart/Cart";
import Signin from "./pages/signin/Signin";
import Shipping from "./components/shippingaddress/Shipping";
import Signup from "./pages/signup/Signup";
import Payments from "./components/payments/Payments";
import PlaceOrder from "./components/PlaceOrder";

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          limit={1}
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />

        <NavBar />

        <main className="main-app">
          <Suspense fallback="Loading a while">
            <Routes>
              <Route path="/product/:slug" element={<Product />} />
              <Route path="/" element={<Home />} />
              <Route path="/signin" element={<Signin />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/shipping" element={<Shipping />} />
              <Route path="/payment" element={<Payments />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/placeorder" element={<PlaceOrder />} />
            </Routes>
          </Suspense>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
