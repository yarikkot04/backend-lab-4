const { Router } = require('express')
const router = Router()
const auth = require('../middlewares/auth')

router.get('/', auth, (req, res) => {
    const username = req.user.username
    res.render('index', {
        title: 'main page',
        username
    })
})

module.exports = router