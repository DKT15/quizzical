import "../styles/Quiz.css";
import { useState, useEffect, Fragment } from "react";
import { decode } from "html-entities";
import { Link } from "react-router-dom";

//Keeping state local no need to pass props down here.

export function Quiz() {
  const [questionsData, setQuestionsData] = useState(null);
  const [selectedAnswer, setSelectedAnswer] = useState({});

  // Pull in 5 questions and options from API using a side effect as the API is outside of React.
  useEffect(() => {
    fetch(
      "https://opentdb.com/api.php?amount=5&category=21&difficulty=medium&type=multiple"
    )
      .then((res) => res.json())
      .then((data) => setQuestionsData(data.results))
      .catch((error) => console.error("Error fetching data", error));
  }, []);

  // Updating the answer for the current question. Whenever change happens in the code,
  // i.e. the user selects or changes their answer, the state updates with the new answer (it won't allow more than one answer per question) but makes sure
  // it keeps the other answers as they might not change.
  const handleChange = (event, answerIndex) => {
    setSelectedAnswer((prev) => ({
      ...prev,
      [answerIndex]: event.target.value,
    }));
  };

  // Loading message while data is being fetched
  if (!questionsData) {
    return <p>Loading...</p>;
  }

  console.log(selectedAnswer);

  // Mapping through questions data to have it rendered on the page.
  const getQuestionsData = questionsData?.map((q, index) => {
    // Combining the correct answer and incorrect answers in an array.
    const answers = decode([...q.incorrect_answers, q.correct_answer]);

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
          {answers.map((answer, questionIndex) => (
            <Fragment key={questionIndex}>
              <label>
                <input
                  type="radio"
                  name={`question-${index}`}
                  value={answer}
                  onChange={(event) => handleChange(event, index)}
                  checked={selectedAnswer[index] === answer} //checks to see if the specific option has been selected by comparing with the current answer and makes sure the state is updated with only one radio button selected.
                />
                {answer}
              </label>
            </Fragment>
          ))}
        </span>
        <hr />
      </span>
    );
  });

  // function checkAnswers() {
  //   /* Check if the users selected answer and the correct answer are the equal to the same value. If change the users highlighted answer to green.
  // If not change the users selected answer and highlight it red, and highlight the correct answer green. Use CLSX here.
  // */
  // }

  return (
    <>
      <Link className="home-btn" to="/">
        Back Home
      </Link>
      <div className="questions-wrapper">
        <section className="questions-data">{getQuestionsData}</section>
      </div>
      <div className="button-wrapper">
        {/* <button className="btn-primary" onClick={isGameOver ? resetGame : checkAnswers}>
          {isGameOver ? "Play again" : "Check answers"}
        </button> */}
      </div>
    </>
  );
}

/* 
- Save the users guessed answers
- When the user hits the checkAnswers button allow the state to change so that if the users selection is right it highlights green 
and if the user is wrong highlight their option red and the correct answer green.

- Display below the five questions, how many answers the user got correct.
- Besides the above allow the user to hit play again and reset the state of the game. This will load new or the same questions.
- Create a new function or variable that resets the game.


- Make sure that elements are accessible for screenreaders 
- Make sure the CSS follows some of the best practices.
- README
- Check Comments

*/
