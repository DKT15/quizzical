import "./App.css";
import React from "react";
import HomeScreen from "./components/HomeScreen.jsx";
import { Quiz } from "./components/Quiz.jsx";

function App() {
  return (
    <>
      <HomeScreen />
      <Quiz />
    </>
  );
}

export default App;
