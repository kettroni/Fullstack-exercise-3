const mongoose = require('mongoose')

const url = 'mongodb://kettroni.Salainen@ds233238.mlab.com:33238/phonebook'

mongoose.connect(url)

const personSchema = new mongoose.Schema({
  name: String,
  number: String
})

personSchema.statics.format = function(person) {
  return {
    name: person.name,
    number: person.number,
    id: person._id
  }
}

const Person = mongoose.model('Person', personSchema)


module.exports = Person
