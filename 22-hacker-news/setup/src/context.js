import React, { useContext, useEffect, useReducer } from "react";

import {
  SET_LOADING,
  SET_STORIES,
  REMOVE_STORY,
  HANDLE_PAGE,
  HANDLE_SEARCH,
} from "./actions";
import reducer from "./reducer";

const API_ENDPOINT = `https://hn.algolia.com/api/v1/search?query=$`;

const initialState = {
  query: "react",
  page: 1,
  stories: [],
  isLoading: false,
  error: false,
  nbHits: 0,
  nbPages: 0,
};

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const fetchStories = async (url) => {
    dispatch({ type: "SET_LOADING" });
    try {
      const resp = await fetch(url);
      const data = await resp.json();
      console.log(data);
      if (data) {
        dispatch({ type: "SET_STORIES", payload: data });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSearch = (value) => {
    dispatch({ type: "HANDLE_SEARCH", payload: value });
  };

  const removeItem = (id) => {
    dispatch({ type: "REMOVE_STORY", payload: id });
  };

  const handlePages = (mode) => {
    dispatch({ type: "HANDLE_PAGE", payload: mode });
  };
  useEffect(() => {
    fetchStories(`${API_ENDPOINT}${state.query}&page=${state.page}`);
  }, [state.page, state.query]);
  return (
    <AppContext.Provider
      value={{ ...state, handleSearch, removeItem, handlePages }}
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
