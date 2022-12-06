import React, { useState, useContext, useEffect } from "react";
import { useCallback } from "react";

const url = "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=";
const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [searchTerm, setSearchTerm] = useState("a");
  const [loading, setloading] = useState(false);
  const [cocktails, setCocktails] = useState([]);

  React.useEffect(() => {
    fetchCocktails();
  }, [searchTerm]);

  const fetchCocktails = async () => {
    try {
      const resp = await fetch(`${url}${searchTerm}`);
      const data = await resp.json();
      const { drinks } = data;

      if (drinks) {
        const newCocktails = drinks.map((item) => {
          const { idDrink, strDrink, strDrinkThumb, strAlcoholic, strGlass } =
            item;

          return {
            id: idDrink,
            name: strDrink,
            image: strDrinkThumb,
            info: strAlcoholic,
            glass: strGlass,
          };
        });
        setCocktails(newCocktails);
      } else {
        setCocktails([]);
      }
      setloading(false);
    } catch (error) {
      console.log(error);
      setloading(true);
    }
  };
  return (
    <AppContext.Provider
      value={{
        searchTerm,
        setSearchTerm,
        cocktails,
        setCocktails,
        loading,
        setloading,
        fetchCocktails,
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
