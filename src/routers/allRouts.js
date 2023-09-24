const index = require("./index");
const apiOrders = require("./orders");
const apiProducts = require("./products");
const apiTrolley = require("./trolley");
const authentication = require("./authentication");
const { failRoute } = require("../controller/index");

module.exports = {
  index,
  apiOrders,
  apiProducts,
  apiTrolley,
  authentication,
  failRoute,
};
