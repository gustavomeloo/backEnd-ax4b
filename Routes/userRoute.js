const express = require('express')

const UserController = require('../Controllers/UserController')

const userRoute = express.Router()

userRoute.post('/register', UserController.createUser)
userRoute.post('/login', UserController.login)
module.exports = userRoute