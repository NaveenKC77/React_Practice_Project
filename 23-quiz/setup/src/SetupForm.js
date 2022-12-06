import React from "react";
import { useGlobalContext } from "./context";

const SetupForm = () => {
  const { quiz, handleChange, handleSubmit } = useGlobalContext();
  const { number, category, difficulty } = quiz;
  return (
    <section className="quiz quiz-small">
      <form action="" className="setup-form">
        <h1>Setup Quiz</h1>
        {/* number */}
        <div className="form-control">
          <label htmlFor="number">Number of Questions</label>
          <input
            className="form-input"
            type="number"
            name="number"
            id="number"
            value={number}
            onChange={handleChange}
            min={1}
            max={50}
          ></input>
        </div>
        {/* category */}

        <div className="form-control">
          <label htmlFor="category">Category</label>
          <select
            name="category"
            id="category"
            className="form-input"
            value={category}
            onChange={handleChange}
          >
            <option value="sports">Sports</option>
            <option value="history">History</option>
            <option value="politics">Politics</option>
          </select>
        </div>

        {/* difficulty */}
        <div className="form-control">
          <label htmlFor="difficulty">Difficulty</label>
          <select
            name="difficulty"
            id="difficulty"
            className="form-input"
            value={difficulty}
            onChange={handleChange}
          >
            <option value="easy">easy</option>
            <option value="medium">medium</option>
            <option value="hard">hard</option>
          </select>
        </div>
        <button className="submit-btn" onClick={handleSubmit}>
          Submit
        </button>
      </form>
    </section>
  );
};

export default SetupForm;
