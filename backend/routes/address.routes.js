const { authJwt } = require("../middlewares");
const controller = require("../controllers/address.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Headers", "Origin, Content-Type, Accept");
    next();
  });

  // Create Address
  app.post("/api/address", [authJwt.verifyToken], controller.createAddress);

  // Get Addresses by User Id
  app.get( "/api/addresses", [authJwt.verifyToken], controller.listAddresses);

  // Update Address by Id
  app.put("/api/address/:id", [authJwt.verifyToken], controller.updateAddress);

  // Delete Address by Id
  app.delete("/api/address/:id", [authJwt.verifyToken], controller.deleteAddress);

  // Get Address by Id
  app.get( "/api/address/:id", [authJwt.verifyToken], controller.getAddress);
};
