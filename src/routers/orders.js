const express = require("express");
const { Router } = express;
const apiOrders = new Router();
const { ControllerOrders } = require("../controller/orders");
const controllerOrders = new ControllerOrders();
const { checkAuthenticationAdmin, checkAuthentication } = require("../middleware/checkAuth");

apiOrders.get("/allorders", checkAuthenticationAdmin, controllerOrders.getAllOrdersSistem);
apiOrders.get("/verMisCarritos", checkAuthentication, controllerOrders.getOrderClient);

module.exports = apiOrders;
