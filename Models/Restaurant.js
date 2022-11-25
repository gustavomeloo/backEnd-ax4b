const mongoose = require('mongoose')

const Restaurant = mongoose.model("Restaurant", {
  name: {
    type : String,
    required : true,
  },
  description: {
    type : String,
    required : true,
    max : 200
  },
})

module.exports = Restaurant