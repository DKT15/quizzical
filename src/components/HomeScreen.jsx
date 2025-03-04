import React from "react";
import "../styles/HomeScreen.css";
import { Link } from "react-router-dom";

function HomeScreen() {
  return (
    <div className="home-wrapper">
      <h2 className="home-title">Quizzical</h2>
      <p className="home-text">Take part in the fun quiz!</p>
      <Link className="quiz-btn" to="/quiz">
        Start Quiz
      </Link>
    </div>
  );
}

export default HomeScreen;
