const mongoose = require('mongoose')

const url = 'mongodb://kettroni:Salainen@ds233238.mlab.com:33238/phonebook'

mongoose.connect(url)

const Person = mongoose.model('Person', {
  name: String,
  number: String
})

const name = process.argv[2]
const number = process.argv[3]

if (!name || !number) {
  Person
    .find({})
    .then(result => {
      result.forEach(person => {
        console.log(person.name + ' ' + person.number)
      })
      mongoose.connection.close()
    })
} else {
  const person = new Person({
    name: name,
    number: number
  })
  console.log('lisätään henkilö ' + name + ' numero ' + number + ' luetteloon')
  person
    .save()
    .then(response => {
      mongoose.connection.close()
    })
}
