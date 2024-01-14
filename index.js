const express = require('express')
const app = express()
app.use(express.json())

let persons = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

// HOMEPAGE
app.get('/', (req, res) => {
    res.send('Welcome to API')
})

// INFO PAGE
app.get('/info', (req, res) => {
    const body = `Phonebook has info for ${persons.length} people
    <br/>
    ${String(new Date())}
    `
    res.send(body)
})

// GET ALL
app.get('/api/persons', (req, res) => {
    res.json(persons)
})

// GET ONE
app.get('/api/persons/:id', (req, res) => {
    const person = persons.find(person => person.id === Number(req.params.id))
    if (!person) {
        res.status(404).end()
    }
    res.json(person)
})

// ADD ONE
app.post('/api/persons', (req, res) => {
    const body = req.body
    if (!body) {
        return res.status(400).json({error: 'missing'})
    }
    const newPerson = {
        id: Math.ceil(Math.random()*100000),
        name: body.name,
        number: body.number
    }
    persons = persons.concat(newPerson)
    res.json(newPerson)
})

// DELETE ONE
app.delete('/api/persons/:id', (req, res) => {
    persons = persons.filter(person => person.id !== Number(req.params.id))
    res.status(204).end()
})


app.listen(3001)