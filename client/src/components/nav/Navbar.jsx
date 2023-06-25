import "./Navbar.css";
import { Link } from "react-router-dom";
import { useGlobalContextHook } from "../contextAPI/context/context";
import { ShoppingCartOutlined } from "@ant-design/icons";

export default function NavBar() {
  const { cart, userInfo, userLogout } = useGlobalContextHook();
  //   console.log(cart.cartItems);
  return (
    <nav className="navbar w-full bg-white  shadow position:  ">
      <header>
        <div className="flex items-center justify-between py-3 md:py-5">
          <Link to="/">Mazi commerce</Link>

          <ul className="cart">
            <Link to="/cart">
              <ShoppingCartOutlined />
              {cart.cartItems.length > 0 && (
                <small>
                  {cart.cartItems.reduce(
                    (acculator, currentItem) =>
                      acculator + currentItem.quantity,
                    0
                  )}{" "}
                </small>
              )}
            </Link>
          </ul>
        </div>
        {/* {userInfo ? (
          <section>{userInfo.name}</section>
        ) : (
          <Link to="/signin">Sign In</Link>
        )} */}

        {/* {userInfo && (
          <Link onClick={userLogout} to="/sign">
            Logout
          </Link>
        )} */}
      </header>
    </nav>
  );
}
