const config = require("../config/auth.config");
const db = require("../models");
const User = db.user;
const Role = db.role;
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

// SignUp
exports.signup = (req, res) => {
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    password: bcrypt.hashSync(req.body.password, 8),
  });
  user.save((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    if (req.body.role) {
      Role.find(
        {
          name: { $in: req.body.role },
        },
        (err, roles) => {
          if (err) {
            res.status(500).send({ message: err });
            return;
          }
          user.role = roles[0]._id;
          user.save((err) => {
            if (err) {
              res.status(500).send({ message: err });
              return;
            }
            res.send({ message: "User was registered successfully!" });
          });
        }
      );
    } else {
      Role.findOne({ name: "user" }, (err, role) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }
        user.role = role._id;
        user.save((err) => {
          if (err) {
            res.status(500).send({ message: err });
            return;
          }
          res.send({ message: "User was registered successfully!" });
        });
      });
    }
  });
};

// SignIn
exports.signin = (req, res) => {
  User.findOne({
    email: req.body.email,
  })
    .populate("role", "-__v")
    .exec((err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }
      if (!user) {
        return res.status(404).send({ message: "User doesn't exist" });
      }
      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );
      if (!passwordIsValid) {
        return res.status(401).send({ message: "Invalid Password!" });
      }
      var token = jwt.sign({ id: user.id }, config.secret, {
        expiresIn: 86400, // 24 hours
      });
      res.status(200).send({
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role.name,
        token,
      });
    });
};

// SignOut
exports.signout = async (req, res) => {
  try {
    req.session = null;
    return res.status(200).send({ message: "You've been signed out!" });
  } catch (err) {
    this.next(err);
  }
};

// Check
exports.check = (req, res) => {
  try {
    return res.status(200).send({ message: "Valid Token" });
  } catch (err) {
    res.status(500).send({ message: err });
  }
};

// Reset Password
exports.changePassword = async (req, res) => {
  let obj = { 'password': bcrypt.hashSync(req.body.password, 8), 'updated_at': new Date() }
  User.findOneAndUpdate(
    { email: req.body.email },
    obj,
    (err, response) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }
      if (!response) {
        res.status(400).send({ message: "User doesn't exist" });
        return;
      }
      res.send({ message: "Password updated successfully!" });
    }
  );
};

// Get User Profile
exports.getUser = (req, res) => {
  User
    .findById(req.userId)
    .populate("role", "-__v")
    .exec(function (err, response) {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }
      if (!response) {
        res.status(400).send({ message: "User doesn't exist" });
        return;
      }
      let user = {
        id: response._id,
        name: response.name,
        email: response.email,
        phone: response.phone,
        role: response.role.name,
        img_url: response.img_url,
      };
      res.status(200).send(user);
    });
};
