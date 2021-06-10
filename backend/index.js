// Requires
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
    // Routes
    const user = require('./routes/user')
    const auth = require('./routes/auth')
    const task = require('./routes/task')

// App
const app = express()
    
    // Middleware
    app.use(cors())
    app.use(express.json())
    app.use('/api/user/', user)
    app.use('/api/auth/', auth)
    app.use('/api/task/', task)
    // Permiso carpeta public (de imagenes)
    app.use('/public', express.static('public'))

// PORT
const port = process.env.PORT || 3030
// Run Server
app.listen( port, () => console.log(`Escuchando servidor en puerto: ${port}`) )
// Connect to MongoDb
mongoose.connect('mongodb://localhost/task', 
                {
                    useNewUrlParser: true, 
                    useFindAndModify: false, 
                    useCreateIndex: true,
                    useUnifiedTopology: true
                })
        .then( () => console.log('Conexión exitosa a MongoDb') )
        .catch( error => console.log(error.message) )