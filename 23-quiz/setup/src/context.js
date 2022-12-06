import axios from "axios";
import React, { useState, useContext, useEffect } from "react";

const table = {
  sports: 21,
  history: 23,
  politics: 24,
};

const API_ENDPOINT = "https://opentdb.com/api.php?";
const url = "";
const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [isWaiting, setWaiting] = useState(true);
  const [isLoading, setLoading] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [index, setIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [quiz, setQuiz] = useState({
    number: 5,
    category: "sports",
    difficulty: "easy",
  });
  const [correct, setCorrect] = useState(0);
  const [isNotification, setNotification] = useState({
    msg: "hello",
    type: "success",
  });
  const [notify, setNotify] = useState(false);
  const fetchQuestions = async (url) => {
    setLoading(true);
    setWaiting(false);
    const response = await axios(url).catch((err) => console.log(err));
    if (response) {
      const data = response.data.results;
      if (data.length > 0) {
        setQuestions(data);
        setLoading(false);
        setWaiting(false);
      } else {
        setWaiting(true);
      }
    } else {
      setWaiting(true);
    }
  };

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setQuiz({ ...quiz, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { number, difficulty, category } = quiz;
    console.log(quiz);
    const url = `${API_ENDPOINT}amount=${number}&difficulty=${difficulty}&category=${table[category]}&type=multiple`;
    fetchQuestions(url);
  };

  const nextQuestion = () => {
    setIndex((oldIndex) => {
      if (oldIndex === questions.length - 1) {
        setIsModalOpen(true);
        return 0;
      } else {
        return oldIndex + 1;
      }
    });
  };

  const closeModal = () => {
    setWaiting(true);
    setIsModalOpen(false);
    setCorrect(0);
  };

  const checkAnswer = (value) => {
    if (value) {
      setCorrect((correct) => correct + 1);
      setNotification({ type: "success", msg: "correct answer" });
    } else {
      setNotification({ type: "danger", msg: "inCorrect answer" });
    }
    setNotify(true);
    setTimeout(() => {
      setNotify(false);
    }, [1000]);
    nextQuestion();
  };

  return (
    <AppContext.Provider
      value={{
        isWaiting,
        isLoading,
        isModalOpen,
        closeModal,
        questions,
        index,
        quiz,
        handleChange,
        handleSubmit,
        correct,
        nextQuestion,
        checkAnswer,
        isNotification,
        notify,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
// make sure use
export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
