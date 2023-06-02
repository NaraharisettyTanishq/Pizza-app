const express = require("express");
const app = express();

require("./auth.routes")(app);
require("./item.routes")(app);
require("./address.routes")(app);
require("./category.routes")(app);
require("./order.routes")(app);