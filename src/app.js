const express = require('express')
const dotenv = require('dotenv')
const connectDB = require('./config/db')
const authRoutes = require('./routes/authRoutes')
const userRoutes = require('./routes/userRoutes')
const productRoutes = require('./routes/productRoutes')

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
app.use('/api/products/', productRoutes)

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log('Listening on Port', PORT)
})