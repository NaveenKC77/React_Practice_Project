import React from "react";
import { useGlobalContext, useState } from "./context";

const SearchForm = () => {
  const { query, handleSearch } = useGlobalContext();

  return (
    <section className="search-form">
      <h1>Search Hacker News</h1>
      <div className="form">
        <form action="" onSubmit={(e) => e.preventDefault()}>
          <input
            type="text"
            value={query}
            onChange={(e) => handleSearch(e.target.value)}
            placeholder="REACT"
            className=""
          />
        </form>
      </div>
    </section>
  );
};

export default SearchForm;
