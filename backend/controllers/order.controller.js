const mongoose = require("mongoose");
const db = require("../models");
const Order = db.order;
const OrderItem = db.orderItem;
const { order } = require("../models");

// Create Order
exports.createOrder = (req, res) => {
  const order = new Order({
    user_id: req.userId,
    total: req.body.total,
    address_id: req.body.address_id,
    payment_type: req.body.payment_type,
    order_note: req.body.order_note,
  });
  order.save((err, order) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }
      let items = [];
      let orderData  = JSON.parse(req.body.order_data);
      for(let i in orderData) {
        let obj = {
          order_id: order._id,
          item_id: i,
          item_name: orderData[i].name,
          img_url: orderData[i].img_url,
          quantity: orderData[i].quantity,
          price: orderData[i].price
        }
        items.push(obj);
      }
      OrderItem.insertMany(items, (err) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }
        res.status(200).send({ message: "Order placed successfully!" });
      })
    }
  );
};

// Get Orders by User Id
exports.getOrdersbyId = (req, res) => {
  Order.aggregate([
    { $match: { user_id: mongoose.Types.ObjectId(req.userId) } },
    {
      $lookup: {
        from: "orderitems",
        localField: "_id",
        foreignField: "order_id",
        as: "orderItems",
      },
    },
    {
      $lookup: {
        from: "addresses",
        localField: "address_id",
        foreignField: "_id",
        as: "address",
      },
    }
  ])
  .exec((err, orders) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    res.send(orders);
  })
};


// Update delivery status by Id
exports.updateOrderStatus = (req, res) => {
  Order.updateMany(
    { user_id: req.userId, created_at: { $lt: new Date(Date.now() - 2 * 60 * 60 * 1000) }},
    { $set: { delivery_status: 'Delivered', updated_at: Date.now() } },
    function (err, order) {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }
      if (!order) {
        res.status(400).send({ message: "Order doesn't exist" });
        return;
      }
      res.send({ message: "Order updated successfully!", order });
    }
  );
};
