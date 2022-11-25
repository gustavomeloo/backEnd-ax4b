const express = require('express')
const server = express()

const cors = require('cors')
const db = require("./Config/dbConnect")
const userRoute = require('./Routes/userRoute')
const restaurantRoute = require('./Routes/restauranteRoute')
const pollRoute = require('./Routes/pollRoute')

db.on("error", console.log.bind(console, "connection error"))
db.once("open", () => {
  console.log("Conexão com o banco feita com sucesso...")
})

server.use(cors())
server.use(express.json(), userRoute, restaurantRoute, pollRoute)

module.exports = server