const index = require("./index");
const apiOrders = require("./orders");
const apiProductos = require("./products");
const apiCarrito = require("./trollley");
const authentication = require("./authentication");
const { failRoute } = require("../controller/index");

module.exports = {
  index,
  apiOrders,
  apiProductos,
  apiCarrito,
  authentication,
  failRoute,
};
