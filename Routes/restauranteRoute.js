const express = require('express')

const RestaurantController = require('../Controllers/RestaurantController')

const restaurantRoute = express.Router()

restaurantRoute.post('/cadastraRestaurante', RestaurantController.createRestaurant)
restaurantRoute.get('/restaurantes', RestaurantController.listAllRestaurants)
restaurantRoute.get('/findRestaurant/:id', RestaurantController.findRestaurantById)
restaurantRoute.delete('/deleteRestaurant/:id', RestaurantController.deleteRestaurant)

module.exports = restaurantRoute