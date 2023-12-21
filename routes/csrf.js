const { Router } = require('express')
const router = Router()
const auth = require('../middlewares/auth')

router.get('/', auth, async (req, res) => {
    const csrf = req.csrfToken()
    res.json(csrf)
})

module.exports = router