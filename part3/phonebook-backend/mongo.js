const mongoose = require('mongoose')

if (process.argv.length<3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]
const name = process.argv[3]

function hasNumber(s) {
  return /\d/.test(s)
}

if (hasNumber(name)) {
  console.log('give name of person as fourth argument')
  process.exit(1)
}

const number = process.argv[4]

//function hasAlphabet(s) {
//  if (s === 'undefined') {
//    return false
//  }
//  return /[a-zA-Z]/.test(s)
//}

//if (hasAlphabet(number)) {
//  console.log('give number of person as fifth argument')
//  process.exit(1)
//}


if (process.argv.length>3 && process.argv.length<5) {
  console.log('cannot add person without a number. Give number of person as fifth argument')
  process.exit(1)
}

const url =
  `mongodb+srv://darwindsouzadd:${password}@cluster0.dxmmydf.mongodb.net/phonebookApp?retryWrites=true&w=majority&appName=Cluster0`

mongoose.set('strictQuery',false)

mongoose.connect(url)

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', personSchema)

//const person = new Person({
//  name: 'Anna',
//  number: '040-123456',
//})

const person = new Person({
  name: name,
  number: number,
})

function hasWhiteSpace(s) {
  return s.indexOf(' ') >= 0;
}

if (process.argv.length === 5) {
  person.save().then(result => {
    if (hasWhiteSpace(person.name)) {
      console.log(`added "${person.name}" number ${person.number} to phonebook`)
    } else {
      console.log(`added ${person.name} number ${person.number} to phonebook`)
    }
    mongoose.connection.close()
  })
} else {
  Person.find({}).then(result => {
    result.forEach(person => {
      console.log(person)
    })
    mongoose.connection.close()
  })
}

