import React, { useState, useEffect } from "react"

export default function QuestionPage({ handleNewGame, data }) {
  const [questions, setQuestions] = useState([])
  const [optionChosen, setOptionChosen] = useState({})
  const [showScore, setShowScore] = useState(false)
  const [score, setScore] = useState(-1)
  const [loading, setLoading] = useState(true)

  const myApi = `https://opentdb.com/api.php?amount=${data.number}${data.category}${data.difficulty}&type=multiple`

  // function convertHTMLEntity(text) {
  //   const span = document.createElement("span")

  //   return text.replace(/&[#A-Za-z0-9]+;/gi, (entity, position, text) => {
  //     span.innerHTML = entity
  //     return span.innerText
  //   })
  // }

  useEffect(() => {
    async function getQuestion() {
      const res = await fetch(myApi)
      const data = await res.json()
      const datawithoptions = getOptions(data.results)
      datawithoptions.forEach((q) => {
        q.correct_answer = q.correct_answer.replaceAll("&#039;", "'")
        q.incorrect_answers = q.incorrect_answers.map((i) =>
          i.replaceAll("&#039;", "'")
        )
        q.question = q.question.replaceAll("&#039;", "'")
      })
      datawithoptions.forEach((q) => {
        q.correct_answer = q.correct_answer.replaceAll("&quot;", `"`)
        q.incorrect_answers = q.incorrect_answers.map((i) =>
          i.replaceAll("&quot;", `"`)
        )
        q.question = q.question.replaceAll("&quot;", `"`)
      })
      setLoading(false)
      setQuestions(datawithoptions)
      console.log({ datawithoptions })
    }
    getQuestion()
  }, [])

  function getOptions(arr) {
    arr.forEach((question) => {
      const options = [question.correct_answer, ...question.incorrect_answers]
      let randomArr = []
      while (options.length > 0) {
        const randomIndex = Math.floor(Math.random() * options.length)
        randomArr.push(options[randomIndex])
        options.splice(randomIndex, 1)
        question.options = randomArr
        // console.log({options})
        // console.log({randomArr})
        // console.log({question.options})
      }
      return randomArr
    })
    return arr
  }

  function handleSelectedOption(optionTitle, question, event) {
    optionChosen[question] = optionTitle
    setOptionChosen(optionChosen)
    const optionsContainer = document.getElementById(question + "options")
    const optionsBtns = optionsContainer.childNodes
    for (let i = 0; i < optionsBtns.length; i++) {
      // console.log(optionsBtns[i].innerHTML, optionTitle)
      if (
        optionsBtns[i].classList.contains("active") &&
        optionsBtns[i].innerHTML !== optionTitle
      ) {
        optionsBtns[i].classList.remove("active")
      } else if (optionsBtns[i].innerHTML === optionTitle) {
        optionsBtns[i].classList.add("active")
      }
    }
    // console.log(optionsBtns)
  }

  function handleCheck() {
    setShowScore(true)
    questions.forEach((question) => {
      const givenAnswer = optionChosen[question.question]
      const trueAnswer = question.correct_answer
      const optionsContainer = document.getElementById(
        question.question + "options"
      )
      const optionsBtns = optionsContainer.childNodes
      if (givenAnswer === trueAnswer) {
        setScore((oldScore) => (oldScore === -1 ? 1 : oldScore + 1))
      }
      optionsBtns.forEach((button) => {
        if (button.innerHTML === trueAnswer) {
          button.classList.remove("active")
          button.classList.add("correct")
        } else if (button.innerHTML === givenAnswer) {
          button.classList.remove("active")
          button.classList.add("incorrect")
        }
      })
    })
  }

  // console.log({ optionChosen })
  // console.log(seeScore)
  // console.log({ correctAnswerArr })
  // console.table(questions)
  // console.log({ correctAnswers })
  // console.log({ optionChosen })

  if (loading) {
    return <div className="loader"></div>
  }

  return (
    <div className="questions--container" id="style-1">
      <div className="questions--box">
        {questions.map((q) => (
          <div className="questions" key={q.question} id={q.question}>
            <div className="questions--info">
              <h4>Category / {q.category}</h4>
              <h4>Difficulty / {q.difficulty}</h4>
            </div>
            <h3 className="question--title">{q.question}</h3>
            <div className="options" id={q.question + "options"}>
              <button
                className="start--btn"
                onClick={(event) =>
                  handleSelectedOption(q.options[0], q.question, event)
                }
              >
                {q.options[0]}
              </button>
              <button
                className="start--btn"
                onClick={(event) =>
                  handleSelectedOption(q.options[1], q.question, event)
                }
              >
                {q.options[1]}
              </button>
              <button
                className="start--btn"
                onClick={(event) =>
                  handleSelectedOption(q.options[2], q.question, event)
                }
              >
                {q.options[2]}
              </button>
              <button
                className="start--btn"
                onClick={(event) =>
                  handleSelectedOption(q.options[3], q.question, event)
                }
              >
                {q.options[3]}
              </button>
            </div>
            <hr />
          </div>
        ))}
      </div>
      <br />
      <div className="solutions">
        {showScore && (
          <small className="score">
            You scored {score === -1 ? 0 : score}/{data.number} correct answers
          </small>
        )}
        {showScore ? (
          <button className="start--btn" onClick={handleNewGame}>
            New Game
          </button>
        ) : (
          <button className="start--btn" onClick={() => handleCheck()}>
            Check Answer
          </button>
        )}
      </div>
    </div>
  )
}
