const mongoose = require("mongoose");
const Category = mongoose.model(
  "Category",
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
    updated_at: {
      type : Date
    }
  })
);
module.exports = Category;
