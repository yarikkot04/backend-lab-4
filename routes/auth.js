const { Router } = require('express')
const router = Router()

router.get('/login', (req, res) => {
    res.render('auth_login', {
        title: 'Login page'
    })
})
router.get('/register', (req, res) => {
    res.render('auth_register', {
        title: 'Register page'
    })
})

module.exports = router
