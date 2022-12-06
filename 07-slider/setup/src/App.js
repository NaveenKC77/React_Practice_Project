import React, { useState, useEffect } from "react";
import { FiChevronRight, FiChevronLeft } from "react-icons/fi";
import { FaQuoteRight } from "react-icons/fa";
import data from "./data";
function App() {
  const [people, setPeople] = useState(data);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    let lastIndex = people.length - 1;

    if (index < 0) {
      setIndex(lastIndex);
    }
    if (index > lastIndex) {
      setIndex(0);
    }
  }, [index, people]);

  useEffect(() => {
    let interval = setInterval(() => {
      setIndex(index + 1);
    }, 3000);
    return () => {
      clearInterval(interval);
    };
  });
  return (
    <section className="reviews">
      <h3 class="title">
        <span>/</span>Reviews
      </h3>

      <div className="section-center">
        {people.map((person, personIndex) => {
          const { id, image, name, title, quote } = person;
          let position = "nextSlide";

          if (personIndex === index) {
            position = "activeSlide";
          }
          if (
            personIndex === index - 1 ||
            (index === 0 && personIndex === people.length - 1)
          ) {
            position = "lastSlide";
          }
          return (
            <article className={position}>
              <img src={image} className="person-img" alt="" />
              <h4>{name}</h4>
              <p className="title">{title}</p>
              <p className="quote">{quote}</p>
              <button
                onClick={() => setIndex(index - 1)}
                type="button"
                className="prev"
              >
                <FiChevronLeft></FiChevronLeft>
              </button>
              <button
                onClick={() => setIndex(index + 1)}
                type="button"
                className="next"
              >
                <FiChevronRight></FiChevronRight>
              </button>
              <FaQuoteRight className="icon"></FaQuoteRight>
            </article>
          );
        })}
      </div>
    </section>
  );
}

export default App;
