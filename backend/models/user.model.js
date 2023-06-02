const mongoose = require("mongoose");
const User = mongoose.model(
  "User",
  new mongoose.Schema({
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    phone: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Role",
    },
    img_url: String,
    created_at: {
      type : Date, 
      default: Date.now,
      required: true,
    },
    updated_at: {
      type : Date,
      default: Date.now
    }    
  })
);
module.exports = User;
