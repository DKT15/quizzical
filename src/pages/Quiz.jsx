import "../styles/Quiz.css";
import { useState, useEffect, Fragment } from "react";
import { decode } from "html-entities";
import { Link } from "react-router-dom";
import { clsx } from "clsx";

//Keeping state local no need to pass props down here.

export function Quiz() {
  const [questionsData, setQuestionsData] = useState(null);
  const [selectedAnswer, setSelectedAnswer] = useState({});
  const [isQuizOver, setIsQuizOver] = useState(false);
  const [score, setScore] = useState(0);

  // Pull in 5 questions and options from API
  const fetchQuestions = () => {
    fetch(
      "https://opentdb.com/api.php?amount=5&category=21&difficulty=medium&type=multiple"
    )
      .then((res) => res.json())
      .then((data) => setQuestionsData(data.results))
      .catch((error) => console.error("Error fetching data", error));
  };

  // Using a side effect as the API is outside of React.
  // function above is used here.
  useEffect(() => {
    fetchQuestions();
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

  // Setting the answer class depending on whether or not the code is right or wrong.
  const getAnswerClass = (answer, questionIndex) => {
    if (!isQuizOver) return ""; // Don't show colors until quiz is over

    const correctAnswer = questionsData[questionIndex].correct_answer;
    const selected = selectedAnswer[questionIndex];

    console.log(selected);

    // Apply class based on correctness of the answer
    return clsx({
      correct: selected === correctAnswer,
      wrong: selected !== correctAnswer,
    });
  };

  // Checking the answers here by using a ForEach method to map through each question through
  // the questionsData to compare the selectedAnswer by its index and the correct answer from the questionsData.
  // If true and values are the same a point is added to the score.
  // Once the checkAnswers button is selected, the quiz is over.
  const checkAnswers = () => {
    let newScore = 0;
    questionsData.forEach((q, index) => {
      if (selectedAnswer[index] === q.correct_answer) {
        newScore++;
      }
    });
    setScore(newScore);
    setIsQuizOver(true);
  };

  // Resetting the game once the quiz is over by resetting the selected answers, score, quizOver state and fetching new questions and answers from the api.
  const resetGame = () => {
    setSelectedAnswer({});
    setIsQuizOver(false);
    setScore(0);
    fetchQuestions();
  };

  // Loading message while data is being fetched
  if (!questionsData) {
    return <p>Loading...</p>;
  }
  console.log(selectedAnswer);

  // Mapping through questions data to have it rendered on the page.
  const getQuestionsData = questionsData?.map((q, index) => {
    // Combining the correct answer and incorrect answers in an array.
    // And mapping through each individual answer for it to be decoded as the decode method only accepts a string but not an array.
    const answers = [...q.incorrect_answers, q.correct_answer].map((a) =>
      decode(a, { level: "html5" })
    );

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
                  className={getAnswerClass(answer, index)}
                  type="radio"
                  name={`question-${index}`}
                  value={answer}
                  onChange={(event) => handleChange(event, index)}
                  checked={selectedAnswer[index] === answer} //checks to see if the specific option has been selected by comparing with the current answer and makes sure the state is updated with only one radio button selected.
                  disabled={isQuizOver} // buttons are disabled once the quiz is over.
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

  return (
    <>
      <Link className="home-btn" to="/">
        Back Home
      </Link>
      <div className="questions-wrapper">
        <section className="questions-data">{getQuestionsData}</section>
      </div>
      <p>{isQuizOver && `You scored ${score}/5 correct answers`}</p>{" "}
      {/* Displays the score once the quiz is over.*/}
      <div className="button-wrapper">
        <button
          className="btn-primary"
          onClick={isQuizOver ? resetGame : checkAnswers}
        >
          {" "}
          {/* Will display the button depending on the state of the game.*/}
          {isQuizOver ? "Play again" : "Check answers"}
        </button>
      </div>
    </>
  );
}

/* 
- When the user hits the checkAnswers button allow the state to change so that if the users selection is right it highlights green 
and if the user is wrong highlight their option red and the correct answer green.

- Make sure that elements are accessible for screenreaders 
- Make sure the CSS follows some of the best practices.
- Fix loading CSS
- README
- Check Comments

*/
