import React, { useState } from "react";
import data from "./data";
function App() {
  const [count, setCount] = useState(0);
  const [text, setText] = useState([]);
  const [warning, setWarning] = useState();
  const handleSubmit = (e) => {
    e.preventDefault();
    let amount = parseInt(count);
    if (count < 0) {
      amount = 1;
      setWarning("The number of paragraphs can't be negative!!");
    }
    if (count > 8) {
      amount = 8;
      setWarning("Sorry, we only have 8 paragraphs available!!");
    }
    setText(data.slice(0, amount));
  };

  return (
    <section className="section-center">
      <h2>Tired of boring lorem ipsum</h2>
      <form className="lorem-form" onSubmit={handleSubmit}>
        <label htmlFor="amount">Paragraphs</label>
        <input
          type="number"
          name="amount"
          id="amount"
          value={count}
          onChange={(e) => setCount(e.target.value)}
        />
        <button tybe="submit" className="btn">
          Generate text
        </button>
      </form>
      <article className="lorem-text">
        <h4 style={{ color: "red" }}>{warning}</h4>
        {text.map((item, index) => {
          return <p key={index}>{item}</p>;
        })}
      </article>
    </section>
  );
}

export default App;
