const { Router } = require('express')
const router = Router()

router.get('/', (req, res) => {
    const username = req.user.username
    res.render('index', {
        title: 'main page',
        username
    })
})

module.exports = router