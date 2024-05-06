//signup, login, logout
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../models/userModel')
const dotenv = require('../.env')


const payload = {
    userId : savedUser._id
}
const secretKey = process.env.SECRET_KEY
const options = {
    expiresIn : '3h'
}
const signup = async (req, res) => {
    try{
        const { fullname, email, role, region, password } = req.body
        const existingEmail = await User.findOne({email})
        if(existingEmail){
            res.status(400).json({message :'Email already exists. Please try a new Email'})
        }
        //hashing password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)
        //creating new user
        const newUser = new User({
            fullname,
            email,
            role,
            region,
            password : hashedPassword
        })
        //saving new user
        const savedUser = await newUser.save()

        const token = jwt.sign(payload, secretKey, options)
        res.status(201).json({token})
    }catch (error) {
        console.log(error)
        res.status(500).json({message : 'Internal Server Error'})
    }
}
const login = async (req, res) => {
    try{
        const {email, password} = req.body
        const user = await User.findOne({email})
        if(!user){
            res.status(400).json({message :'User not found'})
        }
        const matchedPassword = await bcrypt.compare(password, user.password)
        if(!matchedPassword){
            res.status(400).json({message :'Invalid Credentials!'})
        }
        const token = jwt.sign(payload, secretKey, options)
        res.status(200).json({token})
    }catch (err){
        console.log(err)
        res.status(400).json({message : 'Internal Server Error'})
    }
}

module.exports = {
    signup,
    login
}