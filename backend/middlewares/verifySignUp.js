const db = require("../models");
const ROLES = db.ROLES;
const User = db.user;
const Item = db.item;

// Check If duplicate Email exists
checkDuplicateEmail = (req, res, next) => {
  // Email
  User.findOne({
    email: req.body.email,
  }).exec((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    if (user) {
      res.status(400).send({ message: "Email is already in use!" });
      return;
    }
    next();
  });
};

// Check If duplicate Role exists
checkRolesExisted = (req, res, next) => {
  if (req.body.role) {
    if (!ROLES.includes(req.body.role)) {
      res.status(400).send({
        message: `Role ${req.body.role} does exist!`,
      });
      return;
    }
  }
  next();
};

// Check If duplicate Product exists
checkDuplicateItem = (req, res, next) => {
  Item.findOne({
    name: req.body.name,
  }).exec((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    if (user) {
      res.status(400).send({ message: "Item already exists!" });
      return;
    }
    next();
  });
};
const verifySignUp = {
  checkDuplicateEmail,
  checkRolesExisted,
  checkDuplicateItem,
};
module.exports = verifySignUp;
