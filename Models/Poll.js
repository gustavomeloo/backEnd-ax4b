const mongoose = require('mongoose')

const Poll = mongoose.model("Poll", {

  user: {
    type : mongoose.Schema.Types.ObjectId,
    ref: "User",
    required : true
  },
  restaurant: {
    type : mongoose.Schema.Types.ObjectId,
    ref: "Restaurant",
    required : true
  },
  data : {
    type : String,
    default : new Date().toLocaleDateString("en-US", {timeZone: 'America/Sao_Paulo'})
  },

  time : {
    type : String,
    default : new Date().toLocaleTimeString()
  }
})

module.exports = Poll