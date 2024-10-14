import "./App.css";
import React, { useState } from "react";
import HomeScreen from "./components/HomeScreen.jsx";

function App() {
  const [questions, setQuestions] = useState();

  return (
    <>
      <HomeScreen />
    </>
  );
}

export default App;
