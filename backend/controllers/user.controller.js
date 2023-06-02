const db = require("../models");
const User = db.user;
const { user } = require("../models");

// Update Item by Id
exports.updateUser = async (req, res) => {
  if(req.file) {
    const imagePath = 'http://localhost:8080/images/' + req.file.filename;
    req.body.img_url= imagePath;
  }
  req.body.updated_at = new Date();
  user.findByIdAndUpdate(
    req.userId,
    { $set: req.body },
    function (err, product) {
      if (err) {
        if(err.codeName == 'DuplicateKey') err = Object.keys(err.keyPattern)[0] + " already exists!"
        res.status(500).send({ message: err });
        return;
      }
      if (!product) {
        res.status(400).send({ message: "Item doesn't exist" });
        return;
      }
      res.send({ message: "Item updated successfully!" });
    }
  );
};
