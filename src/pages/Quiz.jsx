import "../styles/Quiz.css";
import React from "react";

//Keeping state local no need to pass props down here.

export function Quiz() {
  // const [questionsData, setQuestionsData] = React.useState({});

  // // API is outside of React, therefore useEffect is needed.
  // React.useEffect(() => {
  //   fetch(
  //     "https://opentdb.com/api.php?amount=5&category=21&difficulty=easy&type=multiple"
  //   )
  //     .then((res) => res.json())
  //     .then((data) => setQuestionsData(data));
  // });

  return (
    <>
      {/* testing code out */}
      <h1>Test</h1>
      <h1>Test</h1>
      <h1>Test</h1>
      <h1>Test</h1>
      <h1>Test</h1>
    </>
  );
}

export default Quiz;

/* 

Pull in 5 questions and options from API using a side effect as the API is outside of React.
Style the 5 questions.
When the user selects an answer let the button fade. (UseState) // note - might be best to do this in App.jsx. 
Add a check answers button below the code and have it check the users selected values against the correct value. (useState)
If the answer is correct, highlight the users selection green. If the user selection is false, highlight the users selection red and highlight the correct answer in green.
Display below how many questions the user got correct based in their answers.
Beside the result, have a button that allows the user to play again and refresh the app.

*/
