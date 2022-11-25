const Restaurant = require("../Models/Restaurant")

class RestaurantController {
    static createRestaurant = async (req, res) => {
        const {name, description} = req.body

        const restaurant = new Restaurant({name, description})

        try {
            await restaurant.save()

            res.status(201).json(restaurant)
        } catch (error) {
            res.status(500).json(error)
        }
    }

    static listAllRestaurants = async (req, res) => {
      try {
        const restaurants = await Restaurant.find()
  
        res.status(200).json(restaurants)
      } catch (error) {
        res.status(500).json({
          msg : 'an error happened'
        })
      }
  }

  static findRestaurantById = async (req, res) => {
    try {

      const {id} = req.body 
      const restaurant = await Restaurant.findOne({_id : id})
      
      res.status(200).json(restaurant.name)

    } catch (error) {
        res.status(500).json(error)
    }
  }

}

module.exports = RestaurantController