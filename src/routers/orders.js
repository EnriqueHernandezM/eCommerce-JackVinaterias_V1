const express = require("express");
const { Router } = express;
const apiOrders = new Router();
const { getAllOrdersSistem, getOrderClient } = require("../controller/orders");
const { checkAuthenticationAdmin, checkAuthentication } = require("../middleware/checkAuth");

apiOrders.get("/allorders", checkAuthenticationAdmin, getAllOrdersSistem);
apiOrders.get("/verMisCarritos", checkAuthentication, getOrderClient);

module.exports = apiOrders;
