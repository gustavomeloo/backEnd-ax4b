const express = require('express')

const RestaurantController = require('../Controllers/RestaurantController')

const restaurantRoute = express.Router()

restaurantRoute.post('/cadastraRestaurante', RestaurantController.createRestaurant)
restaurantRoute.get('/restaurantes', RestaurantController.listAllRestaurants)
restaurantRoute.get('/findRestaurant', RestaurantController.findRestaurantById)

module.exports = restaurantRoute