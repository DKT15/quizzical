import "./App.css";
import React, { useState } from "react";
import HomeScreen from "./components/HomeScreen.jsx";

function App() {
  // const [questionsData, setQuestionsData] = useState({});

  React.useEffect(() => {
    fetch(
      "https://opentdb.com/api.php?amount=5&category=21&difficulty=easy&type=multiple"
    )
      .then((res) => res.json())
      .then((data) => console.log(data));
  });

  return (
    <>
      <HomeScreen />
    </>
  );
}

export default App;
