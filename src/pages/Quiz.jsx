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
  // i.e. the user selects or changes their answer, the state updates with the new answer (it won't allow more than one answer per question) but makes sure it keeps the other answers as,
  // they might not change.
  const handleChange = (event, answerIndex) => {
    setSelectedAnswer((prev) => ({
      ...prev,
      [answerIndex]: event.target.value,
    }));
  };

  // All the questions are answered when the answers index through 0-4 are selected.
  // This will be used below to stop users from checking answers until they have answered all the questions.
  const allAnswered = [0, 1, 2, 3, 4].every((i) => selectedAnswer[i]);

  // This code will only be excuted when the quiz is over.
  const getAnswerClass = (answer, questionIndex) => {
    if (!isQuizOver) return "";

    // Getting the correct answer and selected answer to help with the clsx below.
    const correctAnswer = questionsData[questionIndex].correct_answer;
    const selected = selectedAnswer[questionIndex];

    return clsx({
      correct: answer === correctAnswer, // right answer will be highlighted green
      wrong: answer === selected && selected !== correctAnswer, // wrong answer will be red. If the answer is selected and it is not equal to the correct answer.
      faded: answer !== selected && answer !== correctAnswer, // will fade unselected answers. If the answer isn't selected and isn't correct.
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
    return <p className="loading">Loading...</p>;
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
              <label className={getAnswerClass(answer, index)}>
                <input
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
      <div className="score-section">
        <p>{isQuizOver && `You scored ${score}/5 correct answers`}</p>
        {/* Displays the score once the quiz is over.*/}
        <div className="button-wrapper">
          <button
            className="btn-primary"
            onClick={isQuizOver ? resetGame : checkAnswers}
            disabled={!isQuizOver && !allAnswered}
          >
            {/* Will display the button depending on the state of the game.*/}
            {isQuizOver ? "Play again" : "Check answers"}
          </button>
        </div>
      </div>
    </>
  );
}

/* 
- Media queries.
- Deployment, then add link to README.
*/
