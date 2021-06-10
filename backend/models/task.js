
// Requires
const mongoose = require('mongoose')

// Create Schema
const taskSchema = new mongoose.Schema({
    userId: String,
    name: String,
    description: String,
    status: String,
    imageUrl: String,
    date: {type: Date, default: Date.now}
})

// Create model
const Task = mongoose.model('task', taskSchema)

module.exports = Task