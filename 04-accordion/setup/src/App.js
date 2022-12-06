import React, { useState } from "react";
import data from "./data";
import Question from "./Question";
import SingleQuestion from "./Question";
function App() {
  return (
    <>
      <main>
        <section className="container">
          <h3> Questions and Answers About Login</h3>

          <div className="info">
            {data.map((question) => {
              return <Question key={question.id} question={question} />;
            })}
          </div>
        </section>
      </main>
    </>
  );
}

export default App;
