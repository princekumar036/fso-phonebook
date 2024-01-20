const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
require('dotenv').config()
const Person = require('./models/person')

// Create a new morgan token
morgan.token('body', (req, res) => {
    return JSON.stringify(req.body)
})

const app = express()
app.use(express.json())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))
app.use(cors())
app.use(express.static('dist'))

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
app.get('/api/persons', (req, res, next) => {
    Person.find({})
        .then(results => res.json(results))
        .catch(err => next(err))
})

// GET ONE
app.get('/api/persons/:id', (req, res, next) => {
    Person.findById(req.params.id)
        .then(result => {
            if (result) {
                res.json(result)
            } else {
                console.log(error)
                res.status(404).end()
            }
        })
        .catch(err => next(err))
})

// ADD ONE
app.post('/api/persons', (req, res, next) => {
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
    const newPerson = new Person ({
        name: body.name,
        number: body.number
    })
    newPerson.save()
        .then(savedPerson => {
            res.json(savedPerson)
        })
        .catch(err => next(err))
})

// DELETE ONE
app.delete('/api/persons/:id', (req, res, next) => {
    Person.findByIdAndDelete(req.params.id)
        .then(result => res.status(204).end())
        .catch(err => next(err))
})

// UPDATE ONE
app.put('/api/persons/:id', (req, res, next) => {
    const body = req.body
    const updatedPerson = {
        name: body.name,
        number: body.number
    }
    Person.findByIdAndUpdate(req.params.id, updatedPerson, {new: true})
        .then(updatedPerson => {
            res.json(updatedPerson)
        })
        .catch(err => next(err))
})

// Error Handler Middlerware
const errorHandler = (err, req, res, next) => {
    console.log(err.message)

    if (err.name === 'CastError') {
        return res.status(400).send({'error': 'malformatted id'})
    }

    next(err)
}
app.use(errorHandler)

app.listen(process.env.port || 3001)