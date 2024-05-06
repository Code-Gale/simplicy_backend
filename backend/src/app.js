const express = require('express')
const dotenv = require('dotenv')

// loading env variables
dotenv.config()

//starting app
const app = express()

//middlewares
app.use(express.json())
app.use(express.urlencoded({ extended : true}))

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log('Listening on Port', PORT)
})