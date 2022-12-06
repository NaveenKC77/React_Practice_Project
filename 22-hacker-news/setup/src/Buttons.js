import React from "react";
import { HANDLE_PAGE } from "./actions";
import { useGlobalContext } from "./context";

const Buttons = () => {
  const { nbPages, nbHits, page, handlePages } = useGlobalContext();
  return (
    <section>
      <div className="btn-container">
        <button className="prev-btn" onClick={() => handlePages("dec")}>
          Prev
        </button>
        <h2>
          <span>{page} </span> of <span> {nbPages}</span>
        </h2>
        <button className="next-btn" onClick={() => handlePages("inc")}>
          Next
        </button>
      </div>
    </section>
  );
};

export default Buttons;
