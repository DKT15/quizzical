import React from "react";
import "../styles/HomeScreen.css";

function HomeScreen() {
  return (
    <div className="home-wrapper">
      <h2 className="home-title">Quizzical</h2>
      <p className="home-text">Take part in our fun quiz!</p>
      <a href="./Quiz.jsx" className="quiz-btn">
        Start Quiz
      </a>
    </div>
  );
}

export default HomeScreen;
