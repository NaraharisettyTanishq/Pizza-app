const db = require("../models");
const Address = db.address;
const { address } = require("../models");

// Get addresses
exports.listAddresses = (req, res) => {
  Address.find({user_id: req.userId}, function (err, addresses) {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    res.send(addresses);
  });
};

// Get address by Id
exports.getAddress = (req, res) => {
  Address.findById(req.params.id, function (err, address) {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    if (!address) {
      res.status(400).send({ message: "address doesn't exist" });
      return;
    }
    res.send(address);
  });
};

// Create address
exports.createAddress = (req, res) => {
  req.body.user_id = req.userId;
  var address = new Address(req.body);
  address.save((err, address) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }
      res.status(200).send({ message: "address was added successfully!", response: address });
    }
  );
};

// Update address by Id
exports.updateAddress = (req, res) => {
  req.body.updated_at = new Date();
  Address.findByIdAndUpdate(
    req.params.id,
    { $set: req.body },
    function (err, address) {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }
      if (!address) {
        res.status(400).send({ message: "address doesn't exist" });
        return;
      }
      Address.findById(req.params.id, function (err, response) {
        res.send({ message: "address updated successfully!", response });
      });
    }
  );
};

// Delete address by Id
exports.deleteAddress = (req, res) => {
  Address.findByIdAndRemove(req.params.id, function (err, address) {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    if (!address) {
      res.status(400).send({ message: "address doesn't exist" });
      return;
    }
    res.send({ message: "address deleted successfully!" });
  });
};