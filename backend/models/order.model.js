const mongoose = require("mongoose");
const Order = mongoose.model(
  "Order",
  new mongoose.Schema({
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    total: {
      type: String,
      required: true,
    },
    delivery_status: {
      type: String,
      required: true,
      default: "In Progress",
    },
    address_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Address",
      required: true,
    },
    payment_type: {
      type: String,
      required: true,
    },
    order_note: {
      type: String
    },
    created_at: {
      type : Date, 
      default: Date.now,
      required: true,
    },
    updated_at: Date
  })
);
module.exports = Order;
