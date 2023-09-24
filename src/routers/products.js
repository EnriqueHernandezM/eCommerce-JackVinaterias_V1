const express = require("express");
const { Router } = express;
const apiProducts = new Router();
const { checkAuthentication, checkAuthenticationAdmin } = require("../middleware/checkAuth");
const { ControllerProducts } = require("../controller/products");
const controllerProducts = new ControllerProducts();
apiProducts.get("/productos/busqueda", controllerProducts.getApiProductsToSearch);
apiProducts.get("/productos", controllerProducts.getApiProducts);
apiProducts.get("/productos/:id", checkAuthentication, controllerProducts.getOneProductById);
apiProducts.post("/productos", checkAuthenticationAdmin, controllerProducts.oneNewProdutToApi);
apiProducts.put("/productos/:id", checkAuthenticationAdmin, controllerProducts.modificProduct);
apiProducts.delete("/productos/:id", checkAuthenticationAdmin, controllerProducts.deleteElementInventary);

module.exports = apiProducts;
