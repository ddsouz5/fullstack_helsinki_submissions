import { useState } from 'react'

// a proper place to define a component
const Statistics = ({good, neutral, bad, all, avg, pos}) => {
  return (
    <div>
      <h1> statistics </h1>
      good {good} <br />
      neutral {neutral} <br />
      bad {bad} <br />
      all {all} <br />
      average {avg} <br />
      positive {pos} % <br />
    </div>
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
  const all = good + neutral + bad
  const avg = (good - bad)/all
  const pos = (good/all) * 100

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
      <Statistics good={good} neutral={neutral} bad={bad} all={all} avg={avg} pos={pos}  />
    </div>
  )
}

export default App