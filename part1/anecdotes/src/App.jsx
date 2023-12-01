import { useState } from 'react'

const Button = ({ onClick, text }) => (
  <button onClick={onClick}>
    {text}
  </button>
)
const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
  // console.log(anecdotes.length)
   
  const [selected, setSelected] = useState(0)
  // console.log('value before', selected)
  const [total, setTotal] = useState({0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0})
  // console.log(total)

  function getRandomInt(min, max) {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min) + min) // The maximum is exclusive and the minimum is inclusive
  }

  const generateRandom = () => {
    setSelected(getRandomInt(0,anecdotes.length))
    // console.log('value after',  selected)
  }

  const compileVotes = () => {
    const copy = { ...total }
    copy[selected] += 1
    setTotal(copy)
    // console.log(copy)
  }

  function getMaxVote(obj) {
    let arr = Object.values(obj)
    let max = Math.max(...arr)
    console.log(arr.indexOf(max))
    return arr.indexOf(max)
  }

  return (
    <div>
      <h1>Anecdote of the day</h1>
      {anecdotes[selected]} <br />
      has {total[selected]} votes <br />
      <Button
        onClick={compileVotes}
        text='vote'
      />
      <Button
        onClick={generateRandom}
        text='next anecdote'
      />
      <h1>Anecdote with the most votes</h1>
      {anecdotes[getMaxVote(total)]}

    </div>
  )
}

export default App