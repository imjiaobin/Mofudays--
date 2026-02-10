import React from "react";
import FaqCard from "./FaqCard";

const FaqContent = ({ currentData }) => {
  return (
    <section className="faq-content py-9">
      <div className="tab-content active">
        <section className="cards">
          {currentData.map((item) => (
            <FaqCard
              key={item.id}
              theme={item.theme}
              category={item.category}
              question={item.question}
              answer={item.answer}
            />
          ))}
        </section>
      </div>
    </section>
  );
};

export default FaqContent;
