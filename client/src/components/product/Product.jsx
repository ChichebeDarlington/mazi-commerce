import "./Product.css";
import { useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useGlobalContextHook } from "../contextAPI/context/context";
import {
  FETCH_SINGLE_BEGIN,
  FETCH_SINGLE_SUCCESS,
  FETCH_SINGLE_FAIL,
} from "../contextAPI/action/action";
import axios from "axios";
import Rating from "../rating/Rating";
import { Helmet } from "react-helmet-async";
import { LoadingOutlined } from "@ant-design/icons";
import { toast } from "react-toastify";

const Product = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { product, error, loading, dispatch, cart } = useGlobalContextHook();

  useEffect(() => {
    fetchSingleProduct();
  }, []);

  const fetchSingleProduct = async () => {
    dispatch({ type: FETCH_SINGLE_BEGIN });
    try {
      const { data } = await axios.get(
        `http://localhost:5000/api/products/${slug}`
      );
      console.log(data);
      dispatch({ type: FETCH_SINGLE_SUCCESS, payload: data });
    } catch (error) {
      dispatch({ type: FETCH_SINGLE_FAIL, payload: error.message });
      toast.error("error message");
    }
  };

  const handleCart = async () => {
    const existedItem = cart.cartItems.find((item) => item._id === product._id);
    const quantity = existedItem ? existedItem.quantity + 1 : 1;
    const { data } = await axios.get(
      `http://localhost:5000/api/products/product/${product._id}`
    );
    if (data.countInStock < quantity) {
      window.alert("Product out of stock, ehyyaa!!!");
      return;
    }
    dispatch({
      type: "ADD_TO_CART",
      payload: { ...product, quantity },
    });
    navigate("/cart");
  };

  if (loading) {
    <LoadingOutlined />;
  }

  if (error) {
    <section>{error}</section>;
  }

  return (
    <section
      className="product max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
      key={product.slug}
    >
      <Helmet>
        <title>{product.name}</title>
      </Helmet>

      <img className="rounded-t-lg" src={product.image} alt={product.name} />

      <div className="product-info">
        <h3>{product.name}</h3>

        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
          <strong> N{product.price}</strong>
        </p>
        <Rating rating={product.rating} numReviews={product.numReviews} />
        <div>
          <p>{product.description}</p>
          <pre>
            Status:{" "}
            {product.countInStock > 0 ? (
              <span className="in-stock">In stock</span>
            ) : (
              <span className="out-stock">Out of stock</span>
            )}
          </pre>
        </div>
        {product.countInStock === 0 ? (
          <button className="outtaStock" disabled>
            Outta stock
          </button>
        ) : (
          <button
            className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            onClick={handleCart}
          >
            Add to cart
          </button>
        )}
      </div>
    </section>
  );
};

export default Product;
