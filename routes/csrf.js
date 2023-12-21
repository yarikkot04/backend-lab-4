const { Router } = require('express')
const router = Router()

router.get('/', async (req, res) => {
    const csrf = req.csrfToken()
    res.json(csrf)
})

module.exports = router