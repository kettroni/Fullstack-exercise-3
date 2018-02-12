const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')
const mongoose = require('mongoose')
const Person = require('./models/person')



morgan.token('content', (req, res) => {
  const temp = JSON.stringify(req.body)
  return temp
})

app.use(cors())
app.use(morgan(':method :url :content :status :res[content-length] - :response-time ms'))
app.use(bodyParser.json())
app.use(express.static('build'))

const randomize = () => {
  return Math.floor(Math.random()*100000)
}

const validTest = (param) => {
  const errors = []

  if (param.name === undefined) {
    errors.push('name must be defined')
  } else if (param.name === '') {
    errors.push('name cannot be empty')
  } else if (param.number === undefined) {
    errors.push('number must be defined')
  } else if (param.number === '') {
    errors.push('number must be defined')
  }
  return errors
}

app.get('/api/persons', (req, res) => {
  Person
    .find({})
    .then(persons => res.json(persons.map(Person.format)))
})

app.get('/api/persons/:id', (req,res) => {
  /*const id = req.params.id
  Person.find({_id: id}).then(result => {
    if (result.length !== 0) {
      return (res.json(result.map(Person.format)))
    } else {
      return(res.status(404).end())
    }
  })*/
  Person
    .find({_id: req.params.id})
    .then(persons => res.json(persons.map(Person.format)))
    .catch((error) => {
      return res.status(404).end()
    })
})

app.delete('/api/persons/:id', (req,res) => {
  const id = Number(req.params.id)
  persons = persons.filter(person => person.id !== id)

  res.status(204).end()
})

app.post('/api/persons', (req, res) => {

  const temp = req.body
  const errors = validTest(temp)
  if (errors.length > 0) {
    return res.status(400).json({error: errors})
  }
  const person = new Person({
    name: temp.name,
    number: temp.number
  })

  person
    .save((err) => {
      if (err) throw err;

      console.log('Tallennettu onnistuneesti!')
    })
})

app.get('/info', (req, res) => {
  res.send('<p>puhelinluettelossa ' + persons.length + ' henkilön tiedot</p>'
    + '<p>'+ new Date() + '</p>')
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
