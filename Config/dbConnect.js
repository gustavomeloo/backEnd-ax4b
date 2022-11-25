const mongoose = require("mongoose")
require('dotenv').config()

mongoose.connect(process.env.URL_DATABASE)

const db = mongoose.connection

module.exports = db