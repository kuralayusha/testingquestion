import React, { useState } from "react"

export default function MainPage({ data, setData, handleStartQuiz }) {
  // console.log(data)

  function handleNumber(event) {
    const { name, value } = event.target
    setData((oldData) => {
      return {
        ...oldData,
        [name]: value,
      }
    })
  }

  function handleCategory(event) {
    const { name, value } = event.target
    setData((oldData) => {
      return {
        ...oldData,
        [name]: value,
      }
    })
  }

  function handleDifficulty(event) {
    const { name, value } = event.target
    setData((oldData) => {
      return {
        ...oldData,
        [name]: value,
      }
    })
  }

  return (
    <div className="form--container">
      <h1 className="app--title">Quizzical</h1>

      <form>
        <div className="form--card">
          <label htmlFor="number">Select Number Of Question:</label>
          <select
            id="number"
            value={data.number}
            onChange={handleNumber}
            name="number"
          >
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10</option>
          </select>
        </div>
        <div className="form--card">
          <label htmlFor="category">Select Category:</label>
          <select
            id="category"
            value={data.category}
            onChange={handleCategory}
            name="category"
          >
            <option value="">Any Category</option>
            <option value="&category=9">General Knowledge</option>
            <option value="&category=10">Entertainment: Book</option>
            <option value="&category=11">Entertainment: Film</option>
            <option value="&category=12">Entertainment: Music</option>
            <option value="&category=13">
              Entertainment: Musicals & Theaters
            </option>
            <option value="&category=14">Entertainment: Television</option>
            <option value="&category=15">Entertainment: Video Games</option>
            <option value="&category=16">Entertainment: Board Games</option>
            <option value="&category=17">Science & Nature</option>
            <option value="&category=18">Science: Computers</option>
            <option value="&category=19">Science: Mathematics</option>
            <option value="&category=20">Mythology</option>
            <option value="&category=21">Sports</option>
            <option value="&category=22">Geography</option>
            <option value="&category=23">History</option>
            <option value="&category=24">Politics</option>
            <option value="&category=25">Art</option>
            <option value="&category=26">Celebrities</option>
            <option value="&category=27">Animals</option>
            <option value="&category=28">Vehicles</option>
            <option value="&category=29">Entertainment: Comics</option>
            <option value="&category=30">Science: Gadgets</option>
            <option value="&category=31">
              Entertainment: Japanese Anime & Manga
            </option>
            <option value="&category=32">
              Entertainment: Cartoon & Animation
            </option>
          </select>
        </div>
        <div className="form--card">
          <label htmlFor="difficulty">Select Difficulty:</label>
          <select
            id="difficulty"
            value={data.difficulty}
            onChange={handleDifficulty}
            name="difficulty"
          >
            <option value="">Any</option>
            <option value="&difficulty=easy">Easy</option>
            <option value="&difficulty=medium">Medium</option>
            <option value="&difficulty=hard">Hard</option>
          </select>
        </div>
        <div className="form--card--btn">
          <button
            className="start--btn"
            type="button"
            onClick={handleStartQuiz}
          >
            Start quiz
          </button>
        </div>
      </form>
    </div>
  )
}
