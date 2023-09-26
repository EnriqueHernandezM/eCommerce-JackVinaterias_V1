const logger = require("../../utils/loggers");
const { getFirestore } = require("firebase-admin/firestore");
require("../../utils/databasConecctions/firebas");
const db = getFirestore();
const moment = require("moment");
const timestamp = moment().format("lll");
class ContainerOrdersFirebas {
  constructor(collection) {
    this.collecton = collection;
  }
  getAllOrdersExisting = async () => {
    try {
      const readAll = await db.collection(this.collecton).get();
      let arrayRes = readAll.docs.map((item) => {
        return { _id: item.id, ...item.data() };
      });
      return arrayRes;
    } catch (err) {
      logger.log("error", `errIn getallrdersFirebas${err}`);
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
      const newOrder = await db.collection(this.collection).add({
        creationDate: timestamp,
        order: trolleybuy,
        totalProducts: totalItems,
        customerData: user,
        state: "creado",
        idCustomer: user._id,
        numberOrder: counterAcum + 1,
        idTrolley: user.idTrolley,
        totalOrder: total,
      });
      let dtaNew = await db.collection("ordenes").doc(newOrder.id).get();
      await db
        .collection("carritoscompras")
        .doc(user.idTrolley)
        .delete()
        .then(function () {
          logger.log("info", "carrito eliminado ");
        });
      return dtaNew.data();
    } catch (err) {
      logger.log("error", `errInCreateOrderFirebas${err}`);
      return { error: err };
    }
  };
  getOrdersTheClient = async (idUserS) => {
    const readAll = await this.getAllOrdersExisting();
    const yourOrders = readAll.filter((el) => el.customerData.email === idUserS);
    return yourOrders;
  };
}
module.exports = ContainerOrdersFirebas;
