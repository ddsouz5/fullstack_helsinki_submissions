import { useState } from 'react'

const DisplayGood = ({ good }) => {
  return (
    <div>good {good}</div>
  )
}

const DisplayNeutral = ({ neutral }) => {
  return (
    <div>neutral {neutral}</div>
  )
}

const DisplayBad = ({ bad }) => {
  return (
    <div>bad {bad}</div>
  )
}

const Button = ({ onClick, text }) => (
  <button onClick={onClick}>
    {text}
  </button>
)

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const increaseGood = () => {
    console.log('increasing, value before', good)
    setGood(good + 1)
  }

  const increaseNeutral = () => {
    console.log('increasing, value before', neutral)
    setNeutral(neutral + 1)
  }

  const increaseBad = () => {
    console.log('increasing, value before', bad)
    setBad(bad + 1)
  }

  return (
    <div>
      <h1> give feedback </h1>
      <Button
        onClick={increaseGood}
        text='good'
      />
      <Button
        onClick={increaseNeutral}
        text='neutral'
      />     
      <Button
        onClick={increaseBad}
        text='bad'
      />
      <h1> statistics </h1>
      <DisplayGood good={good} />
      <DisplayNeutral neutral={neutral} />
      <DisplayBad bad={bad} />
    </div>
  )
}

export default App