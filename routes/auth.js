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

router.post('/login', async (req, res) => {
    const { username, passwd } = req.body
    const candidate = await AuthUser.findOne({ username })
    if (!candidate) {
        return res.status(400).json({ error: `User with username: ${username} doesn't exist!` })
    }
    const isPassCorrect = await bcrypt.compare(passwd, candidate.password)
    if (!isPassCorrect) {
        return res.status(400).json({ error: `Incorrect password!` })
    }
    const jwtToken = CommonUtils.generateAccessToken(candidate._id, candidate.username)
    res.cookie('jwtToken', jwtToken, {
        httpOnly: true,
        maxAge: 30 * 60 * 1000,
    })
    return res.redirect('/')
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

router.get('/logout', (req, res) => {
    res.cookie('jwtToken', '', { maxAge: 0 })
    res.redirect('/auth/login')
})


module.exports = router
