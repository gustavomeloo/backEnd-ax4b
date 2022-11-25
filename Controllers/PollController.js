const Poll = require("../Models/Poll")
const User = require("../Models/User")
const Restaurant = require("../Models/Restaurant")
const mongoose = require('mongoose')

class PollController {
    static createPoll = async (req, res) => {
      
      const {restaurant, user} = req.body

      if(await this.verifyPoll(user)){
        res.status(422).json({
          msg : 'You have already voted'
        })
        return
      }

      // if(!(new Date().toLocaleTimeString() > '09:00:00' && new Date().toLocaleTimeString() < '11:50:00')){
      //    res.status(422).json({
      //      msg : 'invalid time'
      //    })
      //    return
      // }
      

        if( !mongoose.Types.ObjectId.isValid(user) ){
          res.status(422).json({
            msg : 'Invalid Object Id'
          })
          return
        }

        if( !mongoose.Types.ObjectId.isValid(restaurant) ){
          res.status(422).json({
            msg : 'Invalid Object Id'
          })
          return
        }

        const userVerification = await User.findById({
          _id: user
        })

        if(!userVerification) {
          res.status(422).json({
            msg : 'User not found'
          })
          return
        }

        const restaurantVerification = await Restaurant.findById({
          _id: restaurant
        })

        if(!restaurantVerification) {
          res.status(422).json({
            msg : 'Restaurant not found'
          })
          return
        }

        const poll = {user, restaurant}


        try {
            await Poll.create(poll)

            res.status(201).json(poll)
        } catch (error) {
            res.status(500).json(error)
        }
    }

    static findUser = async (username) => {

      try {
          const user = await User.findOne({
            username
          })
         return user

      } catch (error) {
          res.status(500).json(error)
      }
    } 

    static findAllPoll = async (req, res) => {
      try {
        const polls = await Poll.find().populate('user').populate('restaurant').where(
         {
          data : new Date().toLocaleDateString()
         }
        )
        
        res.status(200).json(polls)

      } catch (error) {
          res.status(500).json(error)
      }
    }

    static verifyPoll = async (idUser) => {
      try {
        const poll = await Poll.findOne({user : idUser, data : new Date().toLocaleDateString()})

        if(!poll){
          return false
        }
        return true
    } catch {
      throw new Error("error")
    }
  }

  
    static rankingRestaurants = async (req, res) => {
      try {
        const polls = await Poll.aggregate(
          [
              { "$group": {
                  _id : {restaurant : "$restaurant"},
                  count: { $sum: 1 },
                  
              }},
              {$sort : { count : -1}}
            
          ],
      )

      res.status(200).json(polls)

    } catch {
      throw new Error("error")
    }

}}

module.exports = PollController