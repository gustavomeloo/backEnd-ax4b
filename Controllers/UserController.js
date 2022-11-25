const User = require("../Models/User")

class UserController {
    static login = async (req, res) => {
        const {username} = req.body
        const user = await this.findUser(username)

        if(!user) {
            res.status(422).json({
                msg : 'User not found'
            })
            return
        }

        try {
            res.status(200).json({
                user
            })
        } catch (error) {
            res.status(500).json(error)
        }

    }

    static createUser = async (req, res) => {
        const {username} = req.body

        const usernameVerification = await this.findUser(username)

        if(usernameVerification){
            res.status(409).json({
                msg : "user already exist"
            })

            return 
        }

        const user = new User({username})

        try {
            await user.save()

            res.status(201).json(user)
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

}

module.exports = UserController