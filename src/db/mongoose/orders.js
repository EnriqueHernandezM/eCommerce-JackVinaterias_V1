const logger = require("../../utils/loggers");
const { Schema, model } = require("mongoose");
require("../../utils/databasConecctions/mongoose");

const moment = require("moment");
const timestamp = moment().format("lll");
const OredersSchema = new Schema({
  creationDate: { type: String, require: true },
  order: { type: Array, require: true },
  totalProducts: { type: Number, require: true },
  customerData: { type: Object, require: true },
  state: { type: String, require: true },
  idTrolley: { type: String, require: true },
  idCustomer: { type: String, require: true },
  numberOrder: { type: Number, require: true },
  totalOrder: { type: Number, require: true },
  deliverDate: { type: String }, //Por si hacemos funcion programar compra
});
const Orders = model("ordenes", OredersSchema);

class ContainerOrdersMongo {
  constructor(collection) {
    this.collecton = collection;
  }
  getAllOrdersExisting = async () => {
    try {
      const readAll = await Orders.find({});
      return readAll;
    } catch (err) {
      logger.log("error", `errIn getallrdersMongoDb${err}`);
      return { error: err };
    }
  };
  sendNewBuy = async (trolleybuy, user, totalItems) => {
    try {
      let arrTotalAndCant = [];
      trolleybuy.forEach((el) => {
        arrTotalAndCant.push(el.price * el.cantidad);
      });
      let total = arrTotalAndCant.reduce((acc, el) => acc + el, 0);
      const ordersToCount = await this.getAllOrdersExisting();
      let counterAcum = ordersToCount.length;
      const OneNewOrder = {
        creationDate: timestamp, //creacion
        order: trolleybuy, //array productos
        totalProducts: totalItems, //total de productos
        customerData: user, //opbjeto usuario vompleto
        state: "creado", //stado
        idCustomer: user._id, //id usuario
        numberOrder: counterAcum + 1,
        idTrolley: user.idTrolley, //idTrolley
        totalOrder: total,
      };
      const newOrder = new Orders(OneNewOrder);
      return await newOrder.save().then((data) => {
        if (data.state == "creado") {
          return data;
        } else {
          return { msge: "ourrio algun problema al crear una orden" };
        }
      });
    } catch (err) {
      logger.log("error", `errInOrdersMongoDb${err}`);
      return { error: err };
    }
  };

  getOrdersTheClient = async (idUserS) => {
    const orders = await Orders.find({ idCustomer: idUserS });
    return orders;
  };
}
module.exports = { ContainerOrdersMongo, Orders };
