const express = require('express')
const dotenv = require('dotenv')
const connectDB = require('./config/db')
const authRoutes = require('./routes/authRoutes')

// loading env variables
dotenv.config()

//starting app
const app = express()

connectDB()

//middlewares
app.use(express.json())
app.use(express.urlencoded({ extended : true}))

app.use('/api/auth', authRoutes)

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log('Listening on Port', PORT)
})