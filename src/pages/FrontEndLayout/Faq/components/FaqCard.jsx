import React from "react";

const FaqCard = ({ theme, category, question, answer }) => {
  return (
    <div className={`card-container ${theme}`}>
      <div className="question-section">
        <div className="top-bubble">{category}</div>

        <div className="question-text">{question}</div>
      </div>
      <div className="answer-section">{answer}</div>
    </div>
  );
};

export default FaqCard;
