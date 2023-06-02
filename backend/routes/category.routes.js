const { authJwt, verifySignUp } = require("../middlewares");
const controller = require("../controllers/category.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Headers", "Origin, Content-Type, Accept");
    next();
  });

  // Create Category
  app.post("/api/category", [authJwt.verifyToken, authJwt.isAdmin], controller.createCategory);

  // Get Category by User Id
  app.get( "/api/categories", controller.listCategories);

  // Update Category by Id
  app.put("/api/category/:id", [authJwt.verifyToken, authJwt.isAdmin], controller.updateCategory);

  // Delete Category by Id
  app.delete("/api/category/:id", [authJwt.verifyToken, authJwt.isAdmin], controller.deleteCategory);
};
