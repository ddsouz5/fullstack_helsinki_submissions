import { useState, useEffect } from 'react'
// import axios from 'axios'
import personService from './services/persons'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import Notification from './components/Notification'
import './index.css'


const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [showAll, setShowAll] = useState('')
  const [alertMessage, setAlertMessage] = useState(null)

  useEffect(() => {
    // console.log('effect')
    personService
    .getAll()
    .then(initialPersons => {
      // console.log('promise fulfilled')
      setPersons(initialPersons)
    })
  }, [])
  // console.log('render', persons.length, 'persons')

  const handleDelete = (id) => {
    // console.log(id + ' needs to be deleted')
    const person = persons.find(p => p.id === id)
    if (window.confirm("Delete " + person.name)) {
      personService
      .deletedata(id)
      .then(returnedPerson => {
        // console.log(returnedPerson)
        setPersons(persons.filter(person => person.id !== id))
      })
    }
  }

  const addPerson = (event) => {
    event.preventDefault()
    // console.log('button clicked', event.target)
    const personObjects = persons.filter(person => person.name === newName)
    if (personObjects.length >= 1) {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with new one?`)) {
        const personObject = personObjects[0]
        personObject.number = newNumber
        personService
        .update(personObject.id, personObject)
        .then(returnedPerson => {
          setPersons(persons.map(person => person.id !== personObject.id ? person : returnedPerson))
          setNewName('')
          setNewNumber('')
        })
        .catch(error => {
          setAlertMessage(
            `Information ${personObject.name} has already been removed from server`
          )
          setTimeout(() => {
            setAlertMessage(null)
          }, 5000)
        })
      }
    }
    else {
      const personObject = {
        name : newName,
        number: newNumber,
        // id : persons.length + 1
      }
      personService
      .create(personObject)
      .then(returnedPerson => {
        // console.log(returnedPerson)
        setPersons(persons.concat(returnedPerson))
        setNewName('')
        setNewNumber('')
      })
      .then(success => {
        setAlertMessage(
          `${newName} was added`
        )
        setTimeout(() => {
          setAlertMessage(null)
        }, 5000)
      })
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
      <Notification message = {alertMessage} />
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
          <Persons 
          key={person.id}
          person={person} 
          handleClick={() => handleDelete(person.id)} />
          )}
    </div>
  )
}

export default App