const logger = require("../../utils/loggers");
//const { getFirestore } = require("firebase-admin/firestore");
const moment = require("moment");
const timestamp = moment().format("lll");
class ContainerOrdersFirebas {
  constructor(collection, getFirestore) {
    this.collecton = collection;
    this.db = getFirestore;
  }
  getAllOrdersExisting = async () => {
    try {
      const readAll = await this.db.collection(this.collecton).get();
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
      const newOrder = await this.db.collection(this.collection).add({
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
      let dtaNew = await this.db.collection("ordenes").doc(newOrder.id).get();
      await this.db
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
