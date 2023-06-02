const { authJwt } = require("../middlewares");
const controller = require("../controllers/order.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Headers", "Origin, Content-Type, Accept");
    next();
  });

  // Create Order
  app.post("/api/order", [authJwt.verifyToken], controller.createOrder);

  // Get Order by User Id
  app.get( "/api/orders", [authJwt.verifyToken], controller.getOrdersbyId);

  // Update Order by User Id
  app.put("/api/order-status", [authJwt.verifyToken], controller.updateOrderStatus);
};
