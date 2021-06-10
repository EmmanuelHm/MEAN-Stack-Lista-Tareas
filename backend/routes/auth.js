'use strict'
// Requires
const express = require('express')
const router = express.Router()
// Model User
const {User} = require('../models/user')

router.post('/', async(req,res)=>{
    const user = await User.findOne({email: req.body.email})
    // check if user exist
    if(!user) return res.status(400).send('El usuario o contraseña son incorrectos')
    // check if passowrd is correct
    if(user.password !== req.body.password) return res.status(400).send('El usuario o contraseña son incorrectos')

    const jwtToken = await user.generateJWT()
    res.status(200).send({jwtToken})
})

module.exports = router