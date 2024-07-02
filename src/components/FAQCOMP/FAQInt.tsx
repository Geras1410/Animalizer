import React from 'react'

interface FAQProps {
    faq: {
      question: string;
      answer: string;
      open: boolean;
    };
    index: number;
    toggleFAQ: (index: number) => void;
  }

const FAQInt: React.FC<FAQProps> = ({ faq, index, toggleFAQ }) => {
    return (
      <div
        className={`faq border-b border-gray-300 py-4 ${faq.open ? "open" : ""}`}
        key={index}
        onClick={() => toggleFAQ(index)}
      >
        <div className="faq-question text-lg font-semibold cursor-pointer">
          {faq.question}
        </div>
        <div className={`faq-answer mt-2 text-gray-600 ${faq.open ? "block" : "hidden"}`}>
          {faq.answer}
        </div>
      </div>
    );
  };

export default FAQInt