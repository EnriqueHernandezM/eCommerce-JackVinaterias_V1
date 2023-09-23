const logger = require("../utils/loggers");
const { ContainerTrolley } = require("../services/trolley");
const environmentVars = require("../config/config");
const containerTrolley = new ContainerTrolley();

class ControllerTrolley {
  constructor() {}
  getTrolleyByClientId = async (req, res) => {
    try {
      logger.log("info", { route: req.originalUrl, method: req.route.methods });
      const { id } = req.params;
      const clientTrolley = await containerTrolley.getAllToTrolley(id);
      res.status(200).json({ clientTrolley });
    } catch (err) {
      logger.log("error", `Error in getTrolleyByClientId controller${err}`);
    }
  };
  postOneItemTrolley = async (req, res) => {
    try {
      logger.log("info", { route: req.originalUrl, method: req.route.methods });
      const { cantidad } = req.query;
      if (req.user) {
        const { body } = req;
        const idProduct = body.product;
        const addITrolley = await containerTrolley.addToCart(req.user._id, idProduct, cantidad);
        res.status(202).json(addITrolley);
      } else {
        res.status(403).json({ msge: "Al parecer aun no estas Logueado" });
        logger.log("info", "Al parecer aun no estas Logueado");
      }
    } catch (err) {
      logger.log("error", `Error in postTrolley controller${err}`);
    }
  };
  deleteItemTrolley = async (req, res) => {
    try {
      logger.log("info", { route: req.originalUrl, method: req.route.methods });
      const { id } = req.params;
      const goToEliminate = await containerTrolley.deleteByIdAllTrolleyItem(req.user.idTrolley, id);
      res.json(goToEliminate);
    } catch (err) {
      logger.log("error", `Error in deleteItem controller${err}`);
    }
  };
  confirmationBuy = async (req, res) => {
    try {
      logger.log("info", { route: req.originalUrl, method: req.route.methods });
      const catchTrolleyClient = await containerTrolley.infoTrolley(req.user.idTrolley);
      //traigo carrito iterado y lo mando asi
      const trolleyTrueConfirm = await containerTrolley.buyTrolley(catchTrolleyClient);
      if (trolleyTrueConfirm.order == undefined) {
        return { msge: "carrito vacio" };
      }
      switch (environmentVars.typeInRes) {
        case "":
          const items = trolleyTrueConfirm.order;
          let prueba = [];
          items.forEach((el) => {
            prueba.push(el.price * el.cantidad);
          });
          let total = prueba.reduce((acc, el) => acc + el, 0);
          res.render("pages/confirmacion", { itemsBuy: items, aPagar: total });
          break;
        case "resJson":
          res.status(202).json({ trolleyTrueConfirm });
          break;
      }
    } catch (err) {
      logger.log("error", `Error in confirmationBuy controller${err}`);
    }
  };
}

module.exports = {
  ControllerTrolley,
};
