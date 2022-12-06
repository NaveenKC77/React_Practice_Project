import React, { useState } from "react";

const Tour = ({ tour, removeTour }) => {
  const { id, name, info, image, price } = tour;
  const [readMore, setReadMore] = useState(false);

  return (
    <>
      <article key={id} className="single-tour">
        <img src={image} alt={name} />
        <footer>
          <div class="tour-info">
            <h4>{name}</h4>
            <h4 className="tour-price">{price}</h4>
          </div>
          <p>
            {readMore ? info : `${info.substring(0, 200)}`}
            <button type="button" onClick={() => setReadMore(!readMore)}>
              {readMore ? "show Less" : "Read More"}
            </button>
          </p>
          <button
            className="delete-btn"
            type="button"
            onClick={() => {
              removeTour(id);
            }}
          >
            Not Interested
          </button>
        </footer>
      </article>
    </>
  );
};

export default Tour;
