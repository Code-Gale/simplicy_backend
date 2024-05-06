const mongoose = require('mongoose')
const config = require('./config')

const connectDB = () => {
    mongoose.connect(config.DBURI)
    .then((result) => {
        console.log('Connected to DB successfully')
    })
    .catch(err => {
        console.error('Could not connect to db : ',err)
        process.exit(1)
    })
}
module.exports = connectDB