const { Router } = require('express')
const User = require('../model/user_model')
const router = Router()
const auth = require('../middlewares/auth')

router.get('/', auth, async (req, res) => {
    const users = await User.find()
    res.json(users)
})

module.exports = router