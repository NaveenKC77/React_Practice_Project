import React, { useState } from "react";
import people from "./data";
import { FaChevronLeft, FaChevronRight, FaQuoteRight } from "react-icons/fa";

const Review = () => {
  const [index, setIndex] = useState(0);

  const checkIndex = (number) => {
    if (number > people.length - 1) {
      return 0;
    } else if (number < 0) {
      return people.length - 1;
    } else {
      return number;
    }
  };
  const prevPerson = () => {
    setIndex((index) => {
      const newIndex = index - 1;
      return checkIndex(newIndex);
    });
  };
  const nextPerson = () => {
    setIndex((index) => {
      const newIndex = index - 1;
      return checkIndex(newIndex);
    });
  };
  const randomPerson = () => {
    setIndex((index) => {
      let newIndex = Math.floor(Math.random() * 4);
      if (newIndex == index) {
        newIndex += 1;
      }
      return checkIndex(newIndex);
    });
  };

  const { id, name, job, image, text } = people[index];
  return (
    <>
      <article className="review">
        <div className="img-container">
          <img className="person-img" src={image} alt={name} />
          <span className="quote-icon">
            <FaQuoteRight />
          </span>
        </div>
        <h4 className="author">{name}</h4>
        <p className="job">{job}</p>
        <p className="info">{text}</p>
        <div className="btn-container">
          <button className="prev-btn" onClick={() => prevPerson()}>
            <FaChevronLeft />
          </button>
          <button className="next-btn" onClick={() => nextPerson()}>
            <FaChevronRight />
          </button>
        </div>
        <button className="random-btn" onClick={() => randomPerson()}>
          Surprise Me
        </button>
      </article>
    </>
  );
};

export default Review;
