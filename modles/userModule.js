const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    createdAt: { type: Date, default: Date.now },
    age: { type: Number, required: true, validate: {  validator: function(v) {
           return v >= 0 && v <= 40; },
          message: props => `${props.value} is not a valid age!`
        }
      },
      // image: { type: String }, 
})

const User = mongoose.model("User", userSchema)

module.exports = User;




