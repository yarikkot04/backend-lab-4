const { Router } = require('express')
const router = Router()
const auth = require('../middlewares/auth')

router.get('/user', auth, (req, res) => {
    res.render('user-find', {
        title: 'Find user'
    })
})

router.post('/user', auth, (req, res) => {
    res.redirect(`/user/${req.body.id}`)
})

router.get('/record', auth, (req, res) => {
    res.render('record-find', {
        title: 'Find record'
    })
})

router.post('/record', auth, (req, res) => {
    res.redirect(`/record/${req.body.id}`)
})

router.get('/filter/record', auth, (req, res) => {
    res.render('filter-record', {
        title: 'Filter record'
    })
})
router.get('/filter/userId/error', auth, (req, res) => {
    res.status(404).json({ error: 'Record with this userId doesn`t exist!' })
})
router.get('/filter/categoryId/error', auth, (req, res) => {
    res.status(404).json({ error: 'Record with this categoryId doesn`t exist!' })
})
router.get('/filter/error', auth, (req, res) => {
    res.status(404).json({ error: 'Record with this userId and categoryId doesn`t exist!' })
})

router.get('/filter/noParams/error', auth, (req, res) => {
    res.status(404).json({ error: 'Enter search parameters!' })
})

module.exports = router