const express = require("express");
const { Router } = express;
const apiTrolley = new Router();
const { ControllerTrolley } = require("../controller/trolley");
const controllerTrolley = new ControllerTrolley();
const { checkAuthentication } = require("../middleware/checkAuth");

apiTrolley.get("/carrito/:id", checkAuthentication, controllerTrolley.getTrolleyByClientId);
apiTrolley.post("/carrito", checkAuthentication, controllerTrolley.postOneItemTrolley);
apiTrolley.delete("/carritodelete/:id", checkAuthentication, controllerTrolley.deleteItemTrolley);
apiTrolley.delete("/carritodelete/:id", checkAuthentication, controllerTrolley.deleteItemTrolley);
apiTrolley.get("/confirmarcompra", checkAuthentication, controllerTrolley.confirmationBuy);

module.exports = apiTrolley;
