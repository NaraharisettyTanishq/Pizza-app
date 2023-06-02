const db = require("../models");
const Category = db.category;
const { category } = require("../models");

// Get categories
exports.listCategories = (req, res) => {
  Category.find({user_id: req.userId}, (err, categories) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    res.send(categories);
  });
};

// Get category by Id
exports.getCategory = (req, res) => {
  category.findById(req.params.id, function (err, category) {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    if (!category) {
      res.status(400).send({ message: "category doesn't exist" });
      return;
    }
    res.send(category);
  });
};

// Create category
exports.createCategory = (req, res) => {
  var category = new Category(req.body);
  category.save((err, category) => {
      if (err) {
        if(err.code == 11000) err = "Category already exists!";
        res.status(500).send({ message: err });
        return;
      }
      res.status(200).send({ message: "category was registered successfully!", response: category });
    }
  );
};

// Update category by Id
exports.updateCategory = (req, res) => {
  req.body.updated_at = new Date();
  category.findByIdAndUpdate(
    req.params.id,
    { $set: req.body },
    function (err, category) {
      if (err) {
        if(err.codeName == 'DuplicateKey') err = "Category already exists!";
        res.status(500).send({ message: err });
        return;
      }
      if (!category) {
        res.status(400).send({ message: "category doesn't exist" });
        return;
      }
      res.send({ message: "category updated successfully!" });
    }
  );
};

// Delete category by Id
exports.deleteCategory = (req, res) => {
  category.findByIdAndRemove(req.params.id, function (err, category) {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    if (!category) {
      res.status(400).send({ message: "category doesn't exist" });
      return;
    }
    res.send({ message: "category deleted successfully!" });
  });
};