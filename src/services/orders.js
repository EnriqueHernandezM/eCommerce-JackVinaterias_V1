const environmentVars = require("../config/config");
const logger = require("../utils/loggers");
const { DaoOrders } = require("../db/daos/indexDaos");
const { Orders } = require("../db/mongoose/orders");
const { allColors } = require("winston/lib/winston/config");

class ContainerOrders {
  constructor() {}

  async getAllOrders() {
    try {
      return await DaoOrders.getAllOrdersExisting();
    } catch (err) {
      logger.log("error", `Error en orders Negocio${err}`);
    }
  }

  async ordersUser(idUsuario) {
    try {
      const allYourOrders = await DaoOrders.getOrdersTheClient(idUsuario);
      let ordersFinalized = [];
      let ordersEnv = [];
      let creates = [];
      allYourOrders.forEach((element) => {
        if (element.state == "enviado") {
          ordersEnv.push(element);
        }
        if (element.state == "recibido") {
          ordersFinalized.push(element);
        }
        if (element.state == "creado") {
          creates.push(element);
        }
      });

      return { ordersFinalized: ordersFinalized, ordersEnv: ordersEnv, ordersCreate: creates };
    } catch (err) {
      logger.log("error", `Error en orders Negocio Order User${err}`);
    }
  }
}

module.exports = { ContainerOrders };
