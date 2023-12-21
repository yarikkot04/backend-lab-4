require('dotenv').config()
const express = require('express')
const expHbs = require('express-handlebars')
const path = require('path')
const mongoose = require('mongoose')
const mongoUri = process.env.MONGO_URI
const cookieParser = require('cookie-parser')
const csurf = require('csurf')
const csrf = require('./middlewares/csrf')


const mainRoute = require('./routes/main')
const userRoute = require('./routes/user')
const findRoute = require('./routes/find')
const usersRoute = require('./routes/users')
const deleteRoute = require('./routes/delete')
const categoryRoute = require('./routes/category')
const recordRoute = require('./routes/record')
const recordsRoute = require('./routes/records')
const authRoute = require('./routes/auth')
const csrfRoute = require('./routes/csrf')

const hbs = expHbs.create({
    defaultLayout: 'main',
    extname: 'hbs'
})

const app = express()

app.engine('hbs', hbs.engine)
app.set('view engine', 'hbs')
app.set('views', 'pages')

app.use(express.static(path.resolve(__dirname, 'public')))
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(csurf({ cookie: true }))
app.use(csrf)

app.use('/', mainRoute)
app.use('/user', userRoute)
app.use('/find', findRoute)
app.use('/users', usersRoute)
app.use('/delete', deleteRoute)
app.use('/category', categoryRoute)
app.use('/record', recordRoute)
app.use('/records', recordsRoute)
app.use('/auth', authRoute)
app.use('/csrf', csrfRoute)

async function start() {
    const PORT = process.env.PORT || 4000
    await mongoose.connect(mongoUri)
    app.listen(PORT, () => {
        console.log(`Server is running on port : ${PORT}`)
    })
}

start()