const { Router } = require('express')
const router = Router()
const auth = require('../middlewares/auth')

router.get('/user', auth, (req, res) => {
    res.render('user-delete', {
        title: 'Delete user'
    })
})

router.get('/user/error', auth, (req, res) => {
    res.status(404).json({ error: 'The user with this id does not exist' })
})

router.get('/category', auth, (req, res) => {
    res.render('category-delete', {
        title: 'Delete category'
    })
})

router.get('/category/error', auth, (req, res) => {
    res.status(404).json({ error: 'The category with this id does not exist!' })
})

router.get('/record', auth, (req, res) => {
    res.render('record-delete', {
        title : 'Delete record'
    })
})

router.get('/record/error', auth, (req, res) => {
    res.status(404).json({ error: 'The record with this id does not exist' })
})

module.exports = router