const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
// const mongoose = require('mongoose')
require('dotenv').config()
const Person = require('./models/person')

// Create a new morgan token
morgan.token('body', (req, res) => {
    return JSON.stringify(req.body)
})

const app = express()
app.use(express.static('dist'))
app.use(express.json())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))
app.use(cors())

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
app.get('/api/persons/:id', (req, res) => {
    Person.findById(req.params.id).then(result => {
        res.json(result)
    })
})

// ADD ONE
app.post('/api/persons', (req, res) => {
    const body = req.body
    if (!body) {
        return res.status(400).json({error: 'missing body'})
    }
    if (!body.name) {
        return res.status(400).json({error: 'missing name'})
    }
    if (!body.number) {
        return res.status(400).json({error: 'missing number'})
    }
    const newPerson = new Person({
        id: Math.ceil(Math.random()*100000),
        name: body.name,
        number: body.number
    })
    newPerson.save().then(savedPerson => {
        res.json(savedPerson)
    })
})

// DELETE ONE
app.delete('/api/persons/:id', (req, res) => {
    console.log(req.params.id)
    Person.findByIdAndDelete(req.params.id)
        .then(result => res.status(204).end())
        .catch(err => res.status(404).end())
})

app.listen(process.env.port || 3001)