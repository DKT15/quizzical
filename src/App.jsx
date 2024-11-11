import "./App.css";
import React from "react";
import HomeScreen from "./components/HomeScreen.jsx";

function App() {
  const [questionsData, setQuestionsData] = React.useState({});

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
