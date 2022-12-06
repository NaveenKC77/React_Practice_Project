import React, { useState, useContext, useReducer, useEffect } from "react";
import cartItems from "./data";
import reducer from "./reducer";
// ATTENTION!!!!!!!!!!
// I SWITCHED TO PERMANENT DOMAIN
const url = "https://course-api.com/react-useReducer-cart-project";
const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const defaultState = {
    cart: cartItems,
    loading: false,
    amount: 0,
    total: 0,
  };

  const [state, dispatch] = useReducer(reducer, defaultState);

  const clearItems = () => {
    dispatch({ type: "CLEAR_ITEMS" });
  };

  const removeItem = (id) => {
    dispatch({ type: "REMOVE_ITEM", payload: id });
  };

  const increase = (id) => {
    dispatch({ type: "INCREASE", payload: id });
  };
  const decrease = (id) => {
    dispatch({ type: "DECREASE", payload: id });
  };

  const fetchData = async (url) => {
    dispatch({ type: "LOADING" });
    const resp = await fetch(url);
    const cart = await resp.json();
    dispatch({ type: "DISPLAY_ITEMS", payload: cart });
  };
  useEffect(() => {
    dispatch({ type: "GET_TOTALS" });
  }, [state.cart]);

  useEffect(() => {
    fetchData(url);
  }, []);

  return (
    <AppContext.Provider
      value={{
        ...state,
        clearItems,
        removeItem,
        increase,
        decrease,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
// make sure use
export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
