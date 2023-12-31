import { useState } from 'react'
import Person from './components/Person'


const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [newName, setNewName] = useState('')

  const addPerson = (event) => {
    event.preventDefault()
    console.log('button clicked', event.target)
    const dup = persons.filter(person => person.name === newName)
    if (dup.length >= 1) {
      alert(`${newName} is already added to phonebook`)
    }
    else {
      const personObject = {
        name : newName
      }
      setPersons(persons.concat(personObject))
      setNewName('')
    }
  }


  const handlePersonChange = (event) => {
    // console.log(event.target.value)
    setNewName(event.target.value)
  }
  return (
    <div>
      {/* debug: {newName} */}
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          name: 
            <input 
              value={newName}
              onChange={handlePersonChange}
            />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
        {persons.map(person => 
          <Person key={person.name} person={person} />
          )}
    </div>
  )
}

export default App