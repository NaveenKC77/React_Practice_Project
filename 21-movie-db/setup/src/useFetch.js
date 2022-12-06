import React, { useState, useEffect } from "react";

import { Switch, Route, useParams } from "react-router-dom";
export const API_ENDPOINT = `https://www.omdbapi.com/?apikey=${process.env.REACT_APP_MOVIE_API_KEY}`;

export const useFetch = (urlParams) => {
  const [isLoading, setLoading] = useState("false");
  const [error, setError] = useState({ show: false, msg: "" });
  const [data, setData] = useState([]);

  const fetchMovies = async (url) => {
    setLoading(true);
    try {
      const resp = await fetch(url);
      const data = await resp.json();

      if (data.Response === "True") {
        setData(data.Search || data);
        setError({ show: false, msg: "" });
        setLoading(false);
      } else {
        setError({ show: true, msg: "Can't find the movie" });
        setLoading(false);
      }
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchMovies(`${API_ENDPOINT}${urlParams}`);
  }, [urlParams]);

  return { isLoading, data, error };
};
