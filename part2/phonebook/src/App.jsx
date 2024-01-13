import { useState } from 'react'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'


const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [showAll, setShowAll] = useState('')

  const addPerson = (event) => {
    event.preventDefault()
    // console.log('button clicked', event.target)
    const dup = persons.filter(person => person.name === newName)
    if (dup.length >= 1) {
      alert(`${newName} is already added to phonebook`)
    }
    else {
      const personObject = {
        name : newName,
        number: newNumber,
        id : persons.length + 1
      }
      setPersons(persons.concat(personObject))
      setNewName('')
      setNewNumber('')
    }
  }

  const handlePersonChange = (event) => {
    // console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    // console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const personsToShow = showAll === ''
  ? persons
  : persons.filter(person => 
    person.name.toLowerCase().includes(showAll.toLowerCase()))

  const handleFilterChange = (event) => {
    console.log(event.target.value)
    // setNewFilter(event.target.value)
    setShowAll(event.target.value)
  }

  return (
    <div>
      {/* debug: {newName} */}
      <h2>Phonebook</h2>
      <Filter
        showAll={showAll}
        handleFilterChange={handleFilterChange}
      />
      <h2>add a new</h2>
      <PersonForm  
        addPerson={addPerson}
        newName={newName}
        handlePersonChange={handlePersonChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />
      <h2>Numbers</h2>
        {personsToShow.map(person => 
          <Persons key={person.id} person={person} />
          )}
    </div>
  )
}

export default App