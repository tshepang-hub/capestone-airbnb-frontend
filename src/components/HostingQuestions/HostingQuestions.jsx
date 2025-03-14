import React from 'react';
import './HostingQuestions.css';

const HostingQuestions = () => {
  return (
    <div className="hosting-questions">
      <div className="overlay"></div>
      <div className="text-container">
        <p className="text-line">Questions</p>
        <p className="text-line">about</p>
        <p className="text-line">hosting?</p>
        <button className="ask-superhost-button">Ask a Superhost</button>
      </div>
    </div>
  );
};

export default HostingQuestions;
