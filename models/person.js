const mongoose = require('mongoose')

mongoose.set('strictQuery', false)

const DB_URI = process.env.DB_URI

mongoose.connect(DB_URI)
    .then(res => console.log('Connected to MongoDB'))
    .catch(err => console.log('Error connecting to MongoDB', err.message))

const personSchema = new mongoose.Schema({
    name: {type: String, minLength: 3},
    number: {
        type: String, 
        validate: {
            validator: function(v) {
                return /^(\d{2}-\d{6,})|\d{3}-\d{5,}$/.test(v)
            }
        }
    }
})

personSchema.set('toJSON', {
    transform: (document, returedObj) => {
        returedObj.id = returedObj._id.toString()
        delete returedObj._id
        delete returedObj.__v
    }
})

module.exports = mongoose.model('Person', personSchema)