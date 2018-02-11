const express = require('express')
const app = express()
const bodyParser = require('body-parser')

app.use(bodyParser.json())

const randomize = () => {
  return Math.floor(Math.random()*100000)
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
  console.log(temp.name)
  const person = {
    name: temp.name,
    number: temp.number,
    id: randomize().toString()
  }

  persons = persons.concat(person)

  res.json(person)
})

app.get('/info', (req, res) => {
  res.send('<p>puhelinluettelossa ' + persons.length + ' henkilön tiedot</p>'
    + '<p>'+ new Date() + '</p>')
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
