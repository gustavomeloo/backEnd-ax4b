const express = require('express')

const PollController = require('../Controllers/PollController')

const pollRoute = express.Router()

pollRoute.post('/votarRestaurante', PollController.createPoll)
pollRoute.get('/rankingVotacaodoDia', PollController.findAllPoll)
pollRoute.get('/rankingRestaurantes', PollController.rankingRestaurants)
pollRoute.get('/restaurantWinner', PollController.restaurantWinner)
pollRoute.get('/verifyPoll/:id', PollController.verifyPollUser)

module.exports = pollRoute