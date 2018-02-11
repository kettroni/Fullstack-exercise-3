const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')


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
  } else if (persons.find(person => person.name === param.name)) {
    errors.push('name must be unique')
  }
  return errors
}

let persons = [
  {
    name: "Arto Hellas",
    number: "040-123456",
    id: 1
  },
  {
    name: "Martti Tienari",
    number: "040-123456",
    id: 2
  },
  {
    name: "Arto Järvinen",
    number: "040-123456",
    id: 3
  },
  {
    name: "Lea Kutvonen",
    number: "040-123456",
    id: 4
  }
]

app.get('/api/persons', (req, res) => {
  res.json(persons)
})

app.get('/api/persons/:id', (req,res) => {
  const id = Number(req.params.id)
  const searched = persons.find(person => person.id === id)

  if (searched) {
    res.json(searched)
  } else {
    res.status(404).end()
  }
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
  const person = {
    name: temp.name,
    number: temp.number,
    id: randomize()
  }

  persons = persons.concat(person)

  res.json(person)
})

app.get('/info', (req, res) => {
  res.send('<p>puhelinluettelossa ' + persons.length + ' henkilön tiedot</p>'
    + '<p>'+ new Date() + '</p>')
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
