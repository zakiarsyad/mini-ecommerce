
if (process.env.NODE_ENV === "development" || process.env.NODE_ENV === "test")
    require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const routes = require('./routes/index')
const errorHandler = require('./middlewares/errorHandler')

const app = express()
const PORT = process.env.PORT || 3000
const ATLAS_CONNECT = process.env.ATLAS_CONNECT
// const ATLAS_CONNECT = `mongodb://localhost:27017/ecommerce${(process.env.NODE_ENV === 'test') ? '-test' : ''}`

mongoose.connect(ATLAS_CONNECT, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(function () {
        console.log(`connection success`)
    })
    .catch(err => {
        console.log(err)
        console.log(`connection failed`)
    })

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cors())
app.use('/', routes)
app.use(errorHandler)

app.listen(PORT, function () {
    console.log(`listening on port ${PORT}`)
})

module.exports = app