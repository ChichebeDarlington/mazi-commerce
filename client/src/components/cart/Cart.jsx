import "./Cart.css";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useGlobalContextHook } from "../contextAPI/context/context";
import { useNavigate } from "react-router-dom";

import {
  DeleteOutlined,
  MinusSquareOutlined,
  PlusSquareOutlined,
} from "@ant-design/icons";

const Cart = () => {
  const navigate = useNavigate();
  const { cart, handleUpdateItem, handleRemoveItem } = useGlobalContextHook();

  const handleCheckout = () => {
    navigate("/signin?redirect=/shipping");
  };

  return (
    <div>
      <Helmet>
        <title>Shopping Cart</title>
      </Helmet>
      <h1 className="heading">Shopping Cart</h1>
      <section className="grid-container">
        <article className="col-1">
          {cart.cartItems.length === 0 ? (
            window.confirm("Cart item is empty")
          ) : (
            <section>
              {cart.cartItems.map((item) => (
                <div key={item._id}>
                  <section key={item._id} className="flex-container">
                    <article className="nameAndImage">
                      <img src={item.image} alt={item.name} />
                      <Link className="" to={`/product/${item.slug}`}>
                        {item.name}
                      </Link>
                    </article>
                    <article className="btn-article">
                      <button
                        onClick={() =>
                          handleUpdateItem(item, item.quantity - 1)
                        }
                        disabled={item.quantity === 1}
                      >
                        <MinusSquareOutlined />
                      </button>
                      <span>{item.quantity}</span>
                      <button
                        onClick={() =>
                          handleUpdateItem(item, item.quantity + 1)
                        }
                        disabled={item.quantity === item.countInStock}
                      >
                        <PlusSquareOutlined />
                      </button>
                    </article>
                    <article className="">N{item.price}</article>
                    <article className="">
                      <button onClick={() => handleRemoveItem(item)}>
                        <DeleteOutlined />
                      </button>
                    </article>
                  </section>
                </div>
              ))}
            </section>
          )}
        </article>
        <article className="col-2">
          <div className="col-2-flex">
            <h4>
              {" "}
              <span>Sub total: </span>
              {cart.cartItems.reduce(
                (accumulator, currentItem) =>
                  accumulator + currentItem.quantity,
                0
              )}
            </h4>
            <h4>
              {" "}
              <span>Total price: N</span>
              {cart.cartItems.reduce(
                (accumulator, currentItem) =>
                  accumulator + currentItem.quantity * currentItem.price,
                0
              )}
            </h4>
            <section className="btn">
              <button
                onClick={handleCheckout}
                disabled={cart.cartItems.length === 0}
              >
                Proceed to checkout
              </button>
            </section>
          </div>
        </article>
      </section>
    </div>
  );
};

export default Cart;
