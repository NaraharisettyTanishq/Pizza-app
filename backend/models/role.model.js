const mongoose = require("mongoose");
const Role = mongoose.model(
  "Role",
  new mongoose.Schema({
    name: {
      type : String,
      required: true,
      unique: true
    },
    created_at: {
      type : Date, 
      default: Date.now,
      required: true
    },
    updated_at: Date
  })
);
module.exports = Role;
