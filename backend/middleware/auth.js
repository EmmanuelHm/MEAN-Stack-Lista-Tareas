
// Requires
const jwt = require('jsonwebtoken')

function auth(req,res,next){
    let jwtToken = req.header('Authorization')
    if(!jwtToken) return res.status(401).send('Acesso denegado. No hay token.')
    jwtToken = jwtToken.split(' ')[1]
    if(!jwtToken) return res.status(401).send('Acesso denegado. No hay token.')

    try {
        const payload = jwt.verify(jwtToken, 'secretKey')
        req.user = payload
        next()
    } catch (e) {
        res.status(401).send("Acceso denegado. Token no valido.")
    }
}

module.exports = auth