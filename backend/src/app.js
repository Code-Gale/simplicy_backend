const express = require('express')
const dotenv = require('dotenv')
const connectDB = require('./config/db')
const authRoutes = require('./routes/authRoutes')
const userRoutes = require('./routes/userRoutes')

// loading env variables
dotenv.config()

//starting app
const app = express()

connectDB()

//middlewares
app.use(express.json())
app.use(express.urlencoded({ extended : true}))

app.use('/api/auth', authRoutes)
app.use('/api/users/', userRoutes)

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log('Listening on Port', PORT)
})