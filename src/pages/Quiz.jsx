import "../styles/Quiz.css";
import React from "react";
import { decode } from "html-entities";

//Keeping state local no need to pass props down here.

export function Quiz() {
  const [questionsData, setQuestionsData] = React.useState([]);

  React.useEffect(() => {
    fetch(
      "https://opentdb.com/api.php?amount=5&category=21&difficulty=medium&type=multiple"
    )
      .then((res) => res.json())
      .then((data) => setQuestionsData(data.results));
  }, []);

  // Mapping through every question.
  const getQuestionsData = questionsData?.map((q, index) => {
    console.log(q);
    // Combine the incorrect and correct answers and add to the same array
    // With that array I will render all the answers and format them to look the same in the app.
    return (
      <span className="questions-element" key={index}>
        <h2>{decode(q.question, { level: "html5" })}</h2>
      </span>
    );
  });

  // function checkAnswers() {}

  return (
    <>
      <section className="questions-data">{getQuestionsData}</section>
      {/* <button onClick={checkAnswers}>Check answers</button> */}
    </>
  );
}

/* 

- Pull in 5 questions and options from API using a side effect as the API is outside of React.
- Render the five questions and the multiple choice answers to the page from the data recieved from the API.
- Use HTML entities to decode some of the test in the API. Using the decode method.
- Create a new array with all the answers. Insert the correct answers into the incorrect answers. Insert the item into the array randomly/shuffle items in an array at random.
- When the user selects an answer highlight their option. They are allowed to change their answer but do not allow them to choose more than one answer. Use HTML form with
radio inputs using the same name attribute to automatically only allow one selection.

- Save the users guessed answers and compare them to the correct answers in the api.
- When the user hits the checkAnswers button allow the state to change so that if the users selection is right it highlights green 
and if the user is wrong highlight their option red and the correct answer green.

- In doing this the check answers button will need to be replaced for UX.
- Display below the five questions, how many answers the user got correct.
- Besides the above allow the user to hit play again and reset the state of the game. This will load new or the same questions.
- Create a new function or variable that resets the game.

*/
