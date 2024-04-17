require('dotenv').config()

const express = require('express')
const app = express()

const Person = require('./models/person')

app.use(express.json())

const morgan = require('morgan')
app.use(morgan('tiny'))

const cors = require('cors')
app.use(cors())

app.use(express.static('dist'))

//persons = [
//    { 
//      "id": 1,
//      "name": "Arto Hellas", 
//      "number": "040-123456"
//    },
//    { 
//      "id": 2,
//      "name": "Ada Lovelace", 
//      "number": "39-44-5323523"
//    },
//    { 
//      "id": 3,
//      "name": "Dan Abramov", 
//      "number": "12-43-234345"
//    },
//    { 
//      "id": 4,
//      "name": "Mary Poppendieck", 
//      "number": "39-23-6423122"
//    }
//]

app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>')
})

app.get('/api/persons', (request, response) => {
//  response.json(persons)
  Person.find({}).then(persons => {
    response.json(persons)
  })
})

const event = new Date()
app.get('/info', (request, response) => {
  response.send('Phonebook has info for ' + persons.length + ' people <br/> <br/>' + event.toString())
})

app.get('/api/persons/:id', (request, response, next) => {
//  const id = Number(request.params.id)
//  const person = persons.find(person => person.id === id)
//  if (person) {
//    response.json(person)
//  } else {
//    response.status(404).end()
//  }
  Person.findById(request.params.id)
    .then(person => {
      if (person) {
        response.json(person)
      } else {
        response.status(404).end()
      }
    })
    .catch(error => next(error))
})

// CHANGE TO DELETE FROM MONGODB  
app.delete('/api/persons/:id', (request, response, next) => {
  //const id = Number(request.params.id)
  //persons = persons.filter(person => person.id !== id)
  //response.status(204).end()
  
  Person.findByIdAndDelete(request.params.id)
    .then(result => {
      response.status(204).end()
    })
    .catch(error => next(error))
})

function getRandomInt(min, max) {
  const minCeiled = Math.ceil(min);
  const maxFloored = Math.floor(max);
  return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled); // The maximum is exclusive and the minimum is inclusive
}

app.use(morgan(function (tokens, req, res) {
  return [
    tokens.method(req, res),
    tokens.url(req, res),
    tokens.status(req, res),
    tokens.res(req, res, 'content-length'), '-',
    tokens['response-time'](req, res), 'ms',
    JSON.stringify(req.body)].join(' ')
}))

app.post('/api/persons', (request, response, next) => {
  const body = request.body

  if (!body.name) {
    return response.status(400).json({ 
      error: 'Name missing' 
    })
  }

  if (!body.number) {
    return response.status(400).json({ 
      error: 'Number missing' 
    })
  }

//  dups = persons.filter(person => person.name === body.name)
//  if (dups.length > 0) {
//    return response.status(400).json({ 
//      error: 'name must be unique' 
//    })
//  }

  const person = new Person({
    name: body.name,
    number: body.number
  })

//  persons = persons.concat(person)
//
//  response.json(person)

  person.save()
    .then(savedPerson => {
      response.json(savedPerson)
    })
  .catch(error => next(error))
})

app.put('/api/persons/:id', (request, response, next) => {
  const { name, number } = request.body

  Person.findByIdAndUpdate(
    request.params.id, 
    { name, number }, 
    { new: true, runValidators: true, context: 'query' })
    .then(updatedPerson => {
      response.json(updatedPerson)
    })
    .catch(error => next(error))
})

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name == 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name == 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }
  
  next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
