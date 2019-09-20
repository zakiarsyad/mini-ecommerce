
if (process.env.NODE_ENV === "development" || process.env.NODE_ENV === "test")
    require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const routes = require('./routes/index')
const errorHandler = require('./middlewares/errorHandler')

const app = express()
const PORT = process.env.PORT || 3000

mongoose.connect(`mongodb+srv://admin:admin@cluster0-loyjn.mongodb.net/e-commerce${(process.env.NODE_ENV === "test") ? "-test" : ""}?retryWrites=true&w=majority`, { useNewUrlParser: true, useUnifiedTopology: true })
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