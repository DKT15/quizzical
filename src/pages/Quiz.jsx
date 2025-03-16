import "../styles/Quiz.css";
import React from "react";
import { decode } from "html-entities";
import { Link } from "react-router-dom";

//Keeping state local no need to pass props down here.

export function Quiz() {
  const [questionsData, setQuestionsData] = React.useState([]);

  // Pull in 5 questions and options from API using a side effect as the API is outside of React.
  React.useEffect(() => {
    fetch(
      "https://opentdb.com/api.php?amount=5&category=21&difficulty=medium&type=multiple"
    )
      .then((res) => res.json())
      .then((data) => setQuestionsData(data.results));
  }, []);

  // Mapping through questions data to have it rendered on the page.
  const getQuestionsData = questionsData?.map((q, index) => {
    console.log(q);
    // Adding the correct answer to the incorrect answers array.
    // answers.lenth + 1 is used to make sure one of the possible random positions can be after the last element of the orignal array.
    // Instead of using math.floor the idiom |0 is used
    // and is equivalent to positive numbers less than 2^31.
    const answers = q.incorrect_answers;
    answers.splice(
      ((answers.length + 1) * Math.random()) | 0,
      0,
      q.correct_answer
    );

    answers + "";

    // This is an alternative way to do the above code using the Math.floor method.

    // const answers = q.incorrect_answers;
    // const n = answers.length;
    // const randomIndex = Math.floor(Math.random() * (n + 1));
    // answers.splice(randomIndex, 0, q.correct_answer);

    // With that array I will render all the answers and format them to look the same in the app.
    return (
      <span className="questions-element" key={index}>
        {/* HTML entites used here to decode some of the questions in the API. */}
        <h2 className="questions-text">
          {decode(q.question, { level: "html5" })}
        </h2>
        {/* Mapping through the answers to render a button for the 4 answers in the array. */}
        <span className="buttons-element">
          {decode(
            answers.map((answer) => (
              <button className="answer-button">{answer}</button>
            )),
            { level: "html5" }
          )}
        </span>
        <hr />
      </span>
    );
  });

  // function checkAnswers() {}

  return (
    <>
      <Link className="home-btn" to="/">
        Back Home
      </Link>
      <div className="questions-wrapper">
        <section className="questions-data">{getQuestionsData}</section>
        {/* <button onClick={checkAnswers}>Check answers</button> */}
      </div>
    </>
  );
}

/* 

- Style to questions page
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
