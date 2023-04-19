const express = require("express");
const { Router } = express;
const apiProductos = new Router();
const { checkAuthentication, checkAuthenticationAdmin } = require("../middleware/checkAuth");
const {
  getApiProductsToSearch,
  getApiProducts,
  getOneProductById,
  oneNewProdutToApi,
  deleteElementInventary,
  modificProduct,
} = require("../controller/productos");

apiProductos.get("/productos/busqueda", checkAuthentication, getApiProductsToSearch);
apiProductos.get("/productos", checkAuthentication, getApiProducts);
apiProductos.get("/productos/:id", checkAuthentication, getOneProductById);
apiProductos.post("/productos", checkAuthenticationAdmin, oneNewProdutToApi);
apiProductos.put("/productos/:id", checkAuthenticationAdmin, modificProduct);
apiProductos.delete("/productos/:id", checkAuthenticationAdmin, deleteElementInventary);

module.exports = apiProductos;
