import React from "react";
import CocktailList from "../components/CocktailList";
import SearchForm from "../components/SearchForm";

const Home = () => {
  return (
    <>
      <SearchForm></SearchForm>
      <CocktailList></CocktailList>
    </>
  );
};

export default Home;
