const jwt = require('jsonwebtoken')
const { secret } = require('../config')


module.exports = function (req, res, next) {
    try {
        const token = req.cookies.jwtToken
        if (!token) {
            return res.redirect('/auth/login')
        }
        const decodedData = jwt.verify(token, secret)
        req.user = decodedData
        next()
    } catch (e) {
        console.log(e)
        return res.status(400).json({ error: 'User unauthenticated!' })
    }
}