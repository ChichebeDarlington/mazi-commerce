import axios from "axios";
import React, { useContext, useReducer, useEffect, createContext } from "react";
import reducer from "../reducer/reducer";
import { FETCH_BEGIN, FETCH_SUCCESS, FETCH_FAIL } from "../action/action";
// import reducerLogger from "use-reducer-logger";  "use-reducer-logger": "^1.0.2"

const getCartItems = () =>
  localStorage.getItem("cartItems")
    ? JSON.parse(localStorage.getItem("cartItems"))
    : [];

const getShippingAddress = () =>
  localStorage.getItem("shippingAddress")
    ? JSON.parse(localStorage.getItem("shippingAddress"))
    : {};

const gettPaymentMethod = () =>
  localStorage.getItem("paymentMethod")
    ? localStorage.getItem("paymentMethod")
    : "";

const getUserInfo = () =>
  localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    : [];

const AppContext = createContext();

const initialState = {
  userInfo: getUserInfo(),
  cart: {
    shippingAddress: getShippingAddress(),
    cartItems: getCartItems(),
    paymentMethod: gettPaymentMethod(),
  },
  products: [],
  product: [],
  loading: false,
  error: "",
};

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    fetchProducts();
  }, []);
  // console.log(state.product);
  const fetchProducts = async () => {
    dispatch({ type: FETCH_BEGIN });
    try {
      const { data } = await axios.get("http://localhost:5000/api/products");
      dispatch({ type: FETCH_SUCCESS, payload: data });
    } catch (error) {
      dispatch({ type: FETCH_FAIL, payload: error.message });
    }
  };

  const handleUpdateItem = async (item, quantity) => {
    try {
      const { data } = await axios.get(
        "http://localhost:5000/api/products/product/" + item._id
      );
      if (data.countInStock < quantity) {
        alert("Product outta stock");
        return;
      }
      dispatch({ type: "ADD_TO_CART", payload: { ...item, quantity } });
    } catch (error) {}
  };

  const handleRemoveItem = async (item) => {
    dispatch({ type: "REMOVE_TO_CART", payload: item });
  };

  const handleAddToCart = async (item) => {
    const existedItem = state.cart.cartItems.find(
      (item) => item._id === state.product._id
    );
    const quantity = existedItem ? existedItem.quantity + 1 : 1;
    try {
      const { data } = await axios.get(
        `http://localhost:5000/api/products/product/${item._id}`
      );

      if (data.countInStock < quantity) {
        window.alert("Product out of stock, ehyyaa!!!");
        return;
      }
      dispatch({
        type: "ADD_TO_CART",
        payload: { ...state.product, quantity },
      });
    } catch (error) {
      console.log(error);
    }
  };

  const userLogout = () => {
    dispatch({ type: "USER_LOGOUT" });
    localStorage.removeItem("userInfo");
    localStorage.removeItem("shippingAddress");
    localStorage.removeItem("paymentMethod");
  };

  return (
    <AppContext.Provider
      value={{
        ...state,
        dispatch,
        handleUpdateItem,
        handleRemoveItem,
        handleAddToCart,
        userLogout,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
// make sure use
export const useGlobalContextHook = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
