const mongoose = require("mongoose");
const Item = mongoose.model(
  "Item",
  new mongoose.Schema({
    name: {
      type: String,
      required: true,
      unique: true
    },
    description: {
      type: String
    },
    price: {
      type: String,
      required: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
    },
    img_url: {
      type: String,
      required: true,
    },
    created_at: {
      type : Date, 
      default: Date.now,
      required: true,
    },
    updated_at: Date
  })
);
module.exports = Item;
