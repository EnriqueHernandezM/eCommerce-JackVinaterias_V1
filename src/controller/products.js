const environmentVars = require("../config/config");
const logger = require("../utils/loggers");
const { ContainerProducts } = require("../services/products");
const containerProducts = new ContainerProducts();
const ContenedorMessages = require("../services/messages");
const containerMessages = new ContenedorMessages();

class ControllerProducts {
  constructor() {}
  getApiProductsToSearch = async (req, res) => {
    try {
      logger.log("info", { route: req.originalUrl, method: req.route.methods });
      let { product } = req.query;
      const allItemsGet = await containerProducts.getAll();
      if (typeof product != "string" || product.length > 8) {
        product = "A";
      }
      const catches = allItemsGet.filter((el) => el.product.includes(product[0].toUpperCase()));
      res.status(200).json(catches);
    } catch (err) {
      res.status(500).json();
      logger.log("error", `error in getApiProducto controller${err}`);
    }
  };

  getApiProducts = async (req, res) => {
    try {
      logger.log("info", { route: req.originalUrl, method: req.route.methods });
      const allItemsGet = await containerProducts.getAll();
      containerMessages.infoUserToChat(req.user);
      switch (environmentVars.typeInRes) {
        case "resJson":
          res.status(200).json({ inventario: allItemsGet });
          break;
        case "":
          res.status(200).render("pages/productos", { allItems: allItemsGet });
          break;
      }
    } catch (err) {
      res.status(500).json();
      logger.log("error", `error in getApiProduct controller${err}`);
    }
  };
  getOneProductById = async (req, res) => {
    try {
      logger.log("info", { route: req.originalUrl, method: req.route.methods });
      const { id } = req.params;
      const catchTheItem = await containerProducts.getById(id);
      res.status(200).json({ catchTheItem });
    } catch (err) {
      logger.log("error", `error in getOneProduct controller${err}`);
    }
  };
  oneNewProdutToApi = async (req, res) => {
    logger.log("info", { route: req.originalUrl, method: req.route.methods });
    try {
      const { body } = req;
      let newItem = await containerProducts.save(body);
      res.status(201).json({ idAsignado: newItem });
    } catch (err) {
      logger.log("error", `error in oneNewProduct controller${err}`);
    }
  };
  deleteElementInventary = async (req, res) => {
    try {
      logger.log("info", { route: req.originalUrl, method: req.route.methods });
      const { id } = req.params;
      const eliminated = await containerProducts.deleteById(id);
      if (!eliminated) {
        res.status(404).json({ msge: "el producto a eliminar no existe" });
      }
      res.status(200).json({ msge: "producto Eliminado", itemDelete: eliminated._id });
    } catch (err) {
      logger.log("error", `error in deleteElementInventary controller${err}`);
    }
  };
  modificProduct = async (req, res) => {
    try {
      logger.log("info", { route: req.originalUrl, method: req.route.methods });
      const { id } = req.params;
      const { body } = req;
      const modify = await containerProducts.modifyElement(id, body);
      if (!modify) {
        res.status(400).json({
          msge: "item a modificar no existe",
        });
      } else {
        res.status(201).json({
          msge: "item correctamente modificado",
          modify,
        });
      }
    } catch (err) {
      logger.log("error", `error in modificProduct controller${err}`);
    }
  };
}

module.exports = {
  ControllerProducts,
};
