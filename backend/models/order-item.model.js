const mongoose = require("mongoose");
const OrderItem = mongoose.model(
  "OrderItem",
  new mongoose.Schema({
    item_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Item",
    },
    order_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
    },
    quantity: {
      type: String,
      required: true,
    },
    price: {
      type: String,
      required: true,
    },
    item_name: {
      type: String,
      required: true,
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
module.exports = OrderItem;
