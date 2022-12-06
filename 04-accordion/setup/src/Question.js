import React, { useState } from "react";
import { useEffect } from "react";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
const Question = ({ question }) => {
  const { id, title, info } = question;
  const [showInfo, setShowInfo] = useState(false);

  useEffect(() => {
    if (id == 1) {
      setShowInfo(true);
    } else {
      setShowInfo(false);
    }
  }, []);

  return (
    <>
      <div className="question">
        <header>
          <h4>{title}</h4>
          <button
            className="btn"
            onClick={() => {
              setShowInfo(!showInfo);
            }}
          >
            {showInfo ? <AiOutlinePlus /> : <AiOutlineMinus />}
          </button>
        </header>
        {showInfo && <p>{info}</p>}
      </div>
    </>
  );
};

export default Question;
