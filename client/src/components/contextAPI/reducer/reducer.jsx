// import { FETCH_BEGIN, FETCH_SUCCESS, FETCH_FAIL } from "../action/action";
import {
  FETCH_BEGIN,
  FETCH_SUCCESS,
  FETCH_FAIL,
  FETCH_SINGLE_BEGIN,
  FETCH_SINGLE_SUCCESS,
  FETCH_SINGLE_FAIL,
} from "../action/action";

const reducer = (state, action) => {
  if (action.type == FETCH_BEGIN) {
    return { ...state, loading: true };
  }

  if (action.type == FETCH_SUCCESS) {
    return { ...state, products: action.payload, loading: false };
  }

  if (action.type == FETCH_FAIL) {
    return { ...state, loading: false, error: action.payload };
  }

  if (action.type == FETCH_SINGLE_BEGIN) {
    return { ...state, loading: true };
  }

  if (action.type == FETCH_SINGLE_SUCCESS) {
    return { ...state, loading: false, product: action.payload };
  }

  if (action.type == FETCH_SINGLE_FAIL) {
    return { ...state, loading: false, error: action.payload };
  }

  if (action.type === "ADD_TO_CART") {
    const newItem = action.payload;
    const existedItems = state.cart.cartItems.find(
      (item) => item._id === newItem._id
    );
    const cartItems = existedItems
      ? state.cart.cartItems.map((item) =>
          item._id === existedItems._id ? newItem : item
        )
      : [...state.cart.cartItems, newItem];
    window.localStorage.setItem("cartItems", JSON.stringify(cartItems));
    return {
      ...state,
      cart: {
        ...state.cart,
        cartItems,
      },
    };
  }

  if (action.type === "REMOVE_TO_CART") {
    const cartItems = state.cart.cartItems.filter(
      (item) => item._id !== action.payload._id
    );
    window.localStorage.removeItem("cartItems");
    return { ...state, cart: { ...state.cart, cartItems } };
  }

  if (action.type === "USER_SIGNIN") {
    return {
      ...state,
      userInfo: action.payload,
    };
  }

  if (action.type === "USER_LOGOUT") {
    return {
      ...state,
      userInfo: null,
      cartItems: [],
      shippingAddress: {},
    };
  }

  if (action.type === "SAVE_SHIPPING_ADDRESS") {
    return {
      ...state,
      cart: {
        ...state.cart,
        shippingAddress: action.payload,
      },
    };
  }

  if (action.type === "SAVE_PAYMENT_METHOD") {
    return {
      ...state,
      cart: {
        ...state.cart,
        paymentMethod: action.payload,
      },
    };
  }

  return state;
};

export default reducer;
