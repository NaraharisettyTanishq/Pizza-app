const { authJwt, verifySignUp, upload } = require("../middlewares");
const controller = require("../controllers/auth.controller");
const userController = require("../controllers/user.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Headers", "Origin, Content-Type, Accept");
    next();
  });

  // Sign Up/ Register
  app.post("/api/signup", [verifySignUp.checkDuplicateEmail, verifySignUp.checkRolesExisted],
    controller.signup
  );

  // Sign In/Log In
  app.post("/api/signin", controller.signin);

  // Sign In/Log In
  app.post("/api/reset-password", controller.changePassword);

  // Sign Out/Log Out
  app.post("/api/signout", controller.signout);

  // Get User Profile
  app.get("/api/my-profile", authJwt.verifyToken, controller.getUser);

  // Check if token is valid or not
  app.get("/api/check", authJwt.verifyToken, controller.check);

  // Update User Profile
  app.post("/api/edit-profile", [authJwt.verifyToken, upload], userController.updateUser);

};
