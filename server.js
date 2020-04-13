require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')


const app =express()

// MongoDB
mongoose.connect(
    process.env.DATABASE_URL,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
)
const db = mongoose.connection
db.on('error', (error) => console.log(error))
db.once('open', () => console.log('connected to database'))

const subscribersRouter = require('./routes/subscribers')
app.use('/subscribers', subscribersRouter)


// We accept JSON
app.use(express.json())

app.listen(3000, () => {
    console.log('Server started')
})