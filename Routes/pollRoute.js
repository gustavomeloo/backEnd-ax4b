const express = require('express')

const PollController = require('../Controllers/PollController')

const pollRoute = express.Router()

pollRoute.post('/votarRestaurante', PollController.createPoll)
pollRoute.get('/rankingVotacaodoDia', PollController.findAllPoll)
pollRoute.get('/rankingRestaurantes', PollController.rankingRestaurants)

module.exports = pollRoute