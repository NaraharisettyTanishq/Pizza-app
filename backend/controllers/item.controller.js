const db = require("../models");
const Item = db.item;
const { item } = require("../models");

// Get Items
exports.listItems = (req, res) => {
  Item.find().populate("category", "-__v")
  .exec((err, data) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    let items = [];
    for(let i in data) {
      let item = {
        id: data[i]._id,
        name: data[i].name,
        description: data[i].description,
        price: data[i].price,
        category: data[i].category.name,
        category_id: data[i].category._id,
        img_url: data[i].img_url
      }
      items.push(item)
    }
    res.send(items);
  });
};

// Get Item by Id
exports.getItem = (req, res) => {
  Item.findById(req.params.id).populate("category", "-__v")
  .exec((err, item) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    if (!item) {
      res.status(400).send({ message: "Item doesn't exist" });
      return;
    }
    res.send(item);
  });
};

// Create Item
exports.createItem = (req, res) => {
  if(req.file) {
    const imagePath = 'http://localhost:8080/images/' + req.file.filename;
    req.body.img_url= imagePath;
  }
  var item = new Item(req.body);
  item.save((err, data) => {
      if (err) {
        if(err.code == 11000) err = "Item already exists!";
        res.status(500).send({ message: err });
        return;
      }
      Item.findById(data._id).populate("category", "-__v")
      .exec((err, data) => {
        let response = {
          id: data._id,
          name: data.name,
          description: data.description,
          price: data.price,
          category: data.category.name,
          category_id: data.category._id,
          img_url: data.img_url
        }
        res.send({ message: "Item was registered successfully!", response });
      });
    }
  );
};

// Update Item by Id
exports.updateItem = (req, res) => {
  if(req.file) {
    const imagePath = 'http://localhost:8080/images/' + req.file.filename;
    req.body.img_url= imagePath;
  }
  req.body.updated_at = new Date();
  Item.findByIdAndUpdate(
    req.params.id,
    { $set: req.body },
    async function (err, item) {
      if (err) {
        if(err.codeName == 'DuplicateKey') err = "Item already exists!";
        res.status(500).send({ message: err });
        return;
      }
      if (!item) {
        res.status(400).send({ message: "Item doesn't exist" });
        return;
      }
      Item.findById(req.params.id).populate("category", "-__v")
      .exec((err, data) => {
        let response = {
          id: data._id,
          name: data.name,
          description: data.description,
          price: data.price,
          category: data.category.name,
          category_id: data.category._id,
          img_url: data.img_url
        }
        res.send({ message: "Item updated successfully!", response });
      });
    }
  );
};

// Delete Item by Id
exports.deleteItem = (req, res) => {
  Item.findByIdAndRemove(req.params.id, function (err, item) {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    if (!item) {
      res.status(400).send({ message: "Item doesn't exist" });
      return;
    }
    res.send({ message: "Item deleted successfully!" });
  });
};

// Buik Insert of Items
exports.createItems = (req, res) => {
  Item.insertMany(
    req.body,
    function (err) {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }
      res.status(200).send({ message: "Item was registered successfully!" });
    }
  );
};