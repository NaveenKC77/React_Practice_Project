import React from "react";
import { useEffect } from "react";
import { useGlobalContext } from "../context";

const SearchForm = () => {
  const { searchTerm, setSearchTerm } = useGlobalContext();
  const searchContainer = React.useRef(null);

  const handleValue = () => {
    setSearchTerm(searchContainer.current.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  useEffect(() => {
    searchContainer.current.focus();
  }, []);
  return (
    <section className="section search">
      <form action="" className="search-form" onSubmit={handleSubmit}>
        <label htmlFor="searchTerm">Search cocktail of your choice </label>
        <input
          type="text"
          name={"searchTerm"}
          ref={searchContainer}
          onChange={handleValue}
        />
      </form>
    </section>
  );
};

export default SearchForm;
