const mongoose = require('mongoose')

mongoose.set('strictQuery', false)

const DB_URI = process.env.DB_URI

mongoose.connect(DB_URI)
    .then(res => console.log('Connected to MongoDB'))
    .catch(err => console.log('Error connecting to MongoDB', err.message))

const personSchema = new mongoose.Schema({
    name: {type: String, minLength: 3},
    number: String
})

personSchema.set('toJSON', {
    transform: (document, returedObj) => {
        returedObj.id = returedObj._id.toString()
        delete returedObj._id
        delete returedObj.__v
    }
})

module.exports = mongoose.model('Person', personSchema)