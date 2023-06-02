const { authJwt, verifySignUp, upload } = require("../middlewares");
const controller = require("../controllers/item.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Headers", "Origin, Content-Type, Accept");
    next();
  });

  // Get Items even if user not logged in
  app.get("/api/items", controller.listItems);

  // Get Item by Id
  app.get("/api/item/:id", controller.getItem);

  // Add Item
  app.post("/api/item", [authJwt.verifyToken, authJwt.isAdmin, verifySignUp.checkDuplicateItem, upload],
    controller.createItem);

  // Update Item by Id
  app.put("/api/item/:id", [authJwt.verifyToken, authJwt.isAdmin, verifySignUp.checkDuplicateItem, upload], controller.updateItem);

  // Delete Item by Id
  app.delete("/api/item/:id", [authJwt.verifyToken, authJwt.isAdmin], controller.deleteItem);

  // Add Bulk Items
  app.post( "/api/items", controller.createItems);

};
