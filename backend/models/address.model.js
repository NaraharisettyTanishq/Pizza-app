const mongoose = require("mongoose");
const Address = mongoose.model(
  "Address",
  new mongoose.Schema({
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    address: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    landmark: {
      type: String
    },
    type: {
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
module.exports = Address;
