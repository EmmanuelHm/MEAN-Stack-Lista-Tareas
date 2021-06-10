'use strict'
// Requires
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')

// Create Schema User
const userSchema = new mongoose.Schema({
    name:{
        type: String
    },
    email: {
        type: String
    },
    password:{
        type: String
    },
    date: {
        type: Date, 
        default: Date.now
    }
})

// Function: Generate JWT
userSchema.methods.generateJWT = function(){
    return jwt.sign({
        _id: this._id,
        name: this.name,
        email: this.email
    }, 'secretKey')
}

// Create Model
const User = mongoose.model('user', userSchema)

module.exports.User = User
module.exports.userSchema= userSchema 