import React, { useState, useEffect } from "react"
import MainPage from "./components/MainPage"
import QuestionPage from "./components/QuestionPage"
import "./style.css"

export default function App() {
  const [startQuiz, setStartQuiz] = useState(false)
  const [data, setData] = useState({
    number: 1,
    category: "",
    difficulty: "",
  })

  // console.log({ data })

  function handleStartQuiz() {
    // console.log(startQuiz);
    setStartQuiz((oldStartQuiz) => !oldStartQuiz)
  }

  function handleNewGame() {
    // console.log("starting new game")
    setStartQuiz((oldStartQuiz) => !oldStartQuiz)
  }

  return (
    <div className="container">
      {startQuiz ? (
        <QuestionPage
          startQuiz={startQuiz}
          handleNewGame={handleNewGame}
          data={data}
        />
      ) : (
        <MainPage
          startQuiz={startQuiz}
          handleStartQuiz={handleStartQuiz}
          data={data}
          setData={setData}
        />
      )}
    </div>
  )
}
