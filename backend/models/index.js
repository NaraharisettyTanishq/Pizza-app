const dbConfig = require("../config/db.config");
const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
const db = {};
db.mongoose = mongoose;
db.user = require("./user.model");
db.role = require("./role.model");
db.item = require("./item.model");
db.category = require("./category.model");
db.order = require("./order.model");
db.orderItem = require("./order-item.model");
db.address = require("./address.model");
db.ROLES = ["user", "admin"];
db.url = dbConfig.url;
module.exports = db;
