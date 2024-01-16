const mongoose = require('mongoose')

const argsLen = process.argv.length
if (argsLen < 3) {
    console.log('Pass DB password as argument')
    process.exit(1)
}

// Connect to DB
const DBPass = process.argv[2]
const url = `mongodb+srv://theodinproject:${DBPass}@cluster0.w2yptts.mongodb.net/?retryWrites=true&w=majority`
mongoose.set('strictQuery', false)
mongoose.connect(url)

// Schema
const personSchema = new mongoose.Schema({
    name: String,
    number: String
})

// Model
const Person = mongoose.model('Person', personSchema)

// Fetch data
if (argsLen === 3) {
    Person
        .find({})
        .then(results => {
            console.log('Phonebook:')
            results.forEach(result => {
                console.log(`${result.name}: ${result.number}`)
            })
        mongoose.connection.close()
    })
}

if (argsLen === 5) {
    const newName = process.argv[3]
    const newNumber = process.argv[4]

    const newPerson = new Person({
        name: newName,
        number: newNumber
    })
    newPerson.save().then(result => {
        console.log(`Added ${newName}: ${newNumber} to Phonebook`)
        mongoose.connection.close()
    })
}