const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const mongoose = require('mongoose')

// Create a new morgan token
morgan.token('body', (req, res) => {
    return JSON.stringify(req.body)
})

const app = express()
app.use(express.json())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))
app.use(cors())
app.use(express.static('dist'))

const DBPass = process.argv[2]
const DB_URL = `mongodb+srv://theodinproject:${DBPass}@cluster0.w2yptts.mongodb.net/?retryWrites=true&w=majority`
mongoose.set('strictQuery', false)
mongoose.connect(DB_URL)
const personSchema = new mongoose.Schema({
    name: String,
    number: String
})
personSchema.set('toJSON', {
    transform: (document, returedObj) => {
        returedObj.id = returedObj._id.toString()
        delete returedObj._id
        delete returedObj.__v
    }
})
const Person = mongoose.model('Person', personSchema)

// HOMEPAGE
app.get('/', (req, res) => {
    res.send('Welcome to Persons API')
})

// INFO PAGE
app.get('/info', (req, res) => {
    const body = `Phonebook has info for ${persons.length} people
    <br/>
    ${String(new Date())}
    `
    res.send(body.body)
})

// GET ALL
app.get('/api/persons', (req, res) => {
    Person
        .find({})
        .then(persons => {
            res.json(persons)
        })
})

// GET ONE
// app.get('/api/persons/:id', (req, res) => {
//     const person = persons.find(person => person.id === Number(req.params.id))
//     if (!person) {
//         res.status(404).end()
//     }
//     res.json(person)
// })

// // ADD ONE
// app.post('/api/persons', (req, res) => {
//     const body = req.body
//     if (!body) {
//         return res.status(400).json({error: 'missing body'})
//     }
//     if (!body.name) {
//         return res.status(400).json({error: 'missing name'})
//     }
//     if (!body.number) {
//         return res.status(400).json({error: 'missing number'})
//     }
//     if (persons.find(person => person.name === body.name)) {
//         return res.status(400).json({error: 'person already exists'})
//     }
//     const newPerson = {
//         id: Math.ceil(Math.random()*100000),
//         name: body.name,
//         number: body.number
//     }
//     persons = persons.concat(newPerson)
//     res.json(newPerson)
// })

// // DELETE ONE
// app.delete('/api/persons/:id', (req, res) => {
//     persons = persons.filter(person => person.id !== Number(req.params.id))
//     res.status(204).end()
// })

app.listen(process.env.port || 3001)