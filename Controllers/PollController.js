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

      // if(!(new Date().toLocaleTimeString('pt-BR',{timeZone: 'America/Sao_Paulo'}) > '09:00:00' && new Date().toLocaleTimeString('pt-BR',{timeZone: 'America/Sao_Paulo'}) < '11:50:00')){
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

        const poll = {user, restaurant, data : new Date().toLocaleTimeString("pt-BR", {timeZone: 'America/Sao_Paulo'})}


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
          data : new Date().toLocaleDateString("en-US", {timeZone: 'America/Sao_Paulo'})
         }
        )
        
        res.status(200).json(polls)

      } catch (error) {
          res.status(500).json(error)
      }
    }

    static verifyPollUser = async (req, res) => {

      const id = req.params.id

      try {
        const poll = await Poll.findOne({user : id, data : new Date().toLocaleDateString("en-US", {timeZone: 'America/Sao_Paulo'})})

        res.json(poll)
    } catch {
      throw new Error("error")
    }
  }

    static verifyPoll = async (idUser) => {
      try {
        const poll = await Poll.findOne({user : idUser, data : new Date().toLocaleDateString("en-US", {timeZone: 'America/Sao_Paulo'})})

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
        const polls = await Poll.aggregate([
           {$match : { data : new Date().toLocaleDateString("en-US", {timeZone: 'America/Sao_Paulo'})}},
          {$group: {_id: '$restaurant', restaurant: {$push: '$restaurant'}, votos: {$sum : 1}}},
          {$sort: {votos : -1}}
          
          ])

        await Poll.populate(polls, {path: "restaurant"});

      res.status(200).json(polls)

    } catch {
      throw new Error("error")
    }

  }

  static restaurantWinner = async (req, res) => {
    try {
      const polls = await Poll.aggregate([
         {$match : { data : new Date().toLocaleDateString("en-US", {timeZone: 'America/Sao_Paulo'})}},
        {$group: {_id: '$restaurant', restaurant: {$push: '$restaurant'}, votos: {$sum : 1}}},
        {$sort: {votos : -1}},
        { $limit : 1 }
        ])

      await Poll.populate(polls, {path: "restaurant"});

    res.status(200).json(polls[0])

  } catch {
    throw new Error("error")
  }
}


}

module.exports = PollController