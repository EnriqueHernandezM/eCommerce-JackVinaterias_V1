const express = require("express");
const { Router } = express;
const apiProductos = new Router();
const { checkAuthentication, checkAuthenticationAdmin } = require("../middleware/checkAuth");
const { ControllerProducts } = require("../controller/productos");
const controllerProducts = new ControllerProducts();
apiProductos.get("/productos/busqueda", checkAuthentication, controllerProducts.getApiProductsToSearch);
apiProductos.get("/productos", checkAuthentication, controllerProducts.getApiProducts);
apiProductos.get("/productos/:id", checkAuthentication, controllerProducts.getOneProductById);
apiProductos.post("/productos", checkAuthenticationAdmin, controllerProducts.oneNewProdutToApi);
apiProductos.put("/productos/:id", checkAuthenticationAdmin, controllerProducts.modificProduct);
apiProductos.delete("/productos/:id", checkAuthenticationAdmin, controllerProducts.deleteElementInventary);

module.exports = apiProductos;
