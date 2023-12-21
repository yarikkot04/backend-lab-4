const { Router } = require('express')
const router = Router()
const bcrypt = require('bcryptjs')
const { CommonUtils } = require('../utils/CommonUtils')
const AuthUser = require('../model/auth_user_model')

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

router.post('/register', async (req, res) => {
    try {
        const errors = CommonUtils.validateAuthData(req.body)
        if (!errors) {
            return res.status(400).json({ error: 'Register error!' })
        }
        const { username, passwd } = req.body
        const formatedUsername = username.trim()
        const candidate = await AuthUser.findOne({ username: formatedUsername })
        if (candidate) {
            return res.status(400).json({ error: 'User with this username already exist!' })
        }
        const hashedPass = await bcrypt.hash(passwd, 10)
        const newAuthUser = new AuthUser({
            username: formatedUsername,
            password: hashedPass
        })
        await newAuthUser.save()
        res.json({ error: 'User successfully created!' })
    } catch (e) {
        return res.status(400).json({ error: 'Server error!' })
    }
})


module.exports = router
