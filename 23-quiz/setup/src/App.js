import React from "react";
import { useGlobalContext } from "./context";
import Notification from "./Notification";
import SetupForm from "./SetupForm";
import Loading from "./Loading";
import Modal from "./Modal";

function App() {
  const {
    questions,
    index,
    isWaiting,
    isLoading,
    isModalOpen,
    correct,
    nextQuestion,
    checkAnswer,
    isNotification,
    notify,
  } = useGlobalContext();

  if (isWaiting) {
    return <SetupForm />;
  }

  if (isLoading) {
    return <Loading></Loading>;
  }

  const { question, incorrect_answers, correct_answer } = questions[index];
  let answers = [...incorrect_answers];
  const random = Math.floor(Math.random() * 4);
  if (random === 3) {
    answers.push(correct_answer);
  } else {
    answers.push(answers[random]);
    answers[random] = correct_answer;
  }
  return (
    <main>
      <Modal></Modal>
      <section className="quiz">
        {notify && <Notification />}
        <p className="correct-answers">
          Correct Answer: {correct}/{index}
        </p>
        <article>
          <h2
            className="question"
            dangerouslySetInnerHTML={{ __html: question }}
          ></h2>
          <div className="btn-container">
            {answers.map((answer) => {
              return (
                <button
                  className="answer-btn"
                  onClick={() => checkAnswer(answer === correct_answer)}
                >
                  {answer}
                </button>
              );
            })}
          </div>
        </article>
        <button className="next-question" onClick={nextQuestion}>
          Next Question
        </button>
      </section>
    </main>
  );
}

export default App;
