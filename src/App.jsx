import "./App.css";
import React from "react";
import HomeScreen from "./components/HomeScreen.jsx";
import { Routes, Route } from "react-router-dom";
import Quiz from "./pages/Quiz.jsx";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomeScreen />} />
        <Route path="/quiz" element={<Quiz />} />
      </Routes>
    </>
  );
}

export default App;
