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
    default : new Date().toLocaleDateString()
  },

  time : {
    type : String,
    default : new Date().toLocaleTimeString()
  }
})

module.exports = Poll