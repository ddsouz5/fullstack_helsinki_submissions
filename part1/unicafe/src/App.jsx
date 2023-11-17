import { useState } from 'react'

const StatisticLine = ({text, value}) => {
  return (
    <div>
      {text} {value} <br />
    </div>
  )
}

const Statistics = ({good, neutral, bad, all, avg, pos}) => {
  if (all === 0) {
    return (
      <div>
        No feedback given
      </div>
    )
  }
  return (
    <div>
      <StatisticLine text="good" value ={good} />
      <StatisticLine text="neutral" value ={neutral} />
      <StatisticLine text="bad" value ={bad} />
      <StatisticLine text="all" value ={all} />
      <StatisticLine text="avg" value ={avg} />
      <StatisticLine text="pos" value ={pos} />
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
      <h1> statistics </h1>
      <Statistics good={good} neutral={neutral} bad={bad} all={all} avg={avg} pos={pos}  />
    </div>
  )
}

export default App