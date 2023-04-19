const index = require("./index");
const apiOrders = require("./orders");
const apiProductos = require("./productos");
const { randomOperation, infoConCompresion } = require("./info");
const apiCarrito = require("./carrito");
const authentication = require("./authentication");
const { failRoute } = require("../controller/index");

module.exports = {
  index,
  apiOrders,
  apiProductos,
  randomOperation,
  infoConCompresion,
  apiCarrito,
  authentication,
  failRoute,
};
