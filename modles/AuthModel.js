const mongoose = require('mongoose')

const authSchema = new mongoose.Schema({
  uname: String,
  email: { type: String, unique: true },
  password: String
});

const Auth = mongoose.model("auth",authSchema )
module.exports = Auth

