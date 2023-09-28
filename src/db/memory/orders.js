const logger = require("../../utils/loggers");
const moment = require("moment");
const timestamp = moment().format("lll");
const orders = [
  {
    _id: "64326c12ed5eaf4b03f6772d",
    creationDate: "Apr 9, 2023 2:33 AM",
    order: [
      {
        _id: "64267fe31ab99fb4ce424f58",
        product: "Presidente",
        cantidad: 5,
        price: 455,
        codeItem: 150,
        image: "https://cdn.shopify.com/s/files/1/0402/2475/1766/products/BRANDYDONPED…",
      },
    ],
    totalProducts: 5,
    customerData: {
      _id: "642ca609ffc507b352621f49",
      email: "quique166sb1@hotmail.com",
      password: "$2b$10$hdMQHkjQhybrI64B1j73K.gjroU6GJr.XPpAq9bLgZbFxzyQj7AzC",
      nombre: "Enrique Hernandez",
      edad: 24,
      direccion: "And. tecamac 2",
      telefono: 5613507622,
      avatar: "https://static.nike.com/a/images/w_1920,c_limit/73a6ec94-cea8-49b1-983…",
      idTrolley: "64326b1aed5eaf4b03f6770a",
    },
    state: "creado",
    idTrolley: "64326b1aed5eaf4b03f6770a",
    idCustomer: "1",
    numberOrder: 1,
    totalOrder: 2275,
  },
];

class ContainerOrdersMem {
  constructor(collection) {
    this.collecton = collection;
  }
  getAllOrdersExisting = async () => {
    try {
      const readAll = orders;
      return readAll;
    } catch (err) {
      logger.log("error", `errIn getallrders Mem${err}`);
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
        creationDate: timestamp,
        order: trolleybuy,
        totalProducts: totalItems,
        customerData: user,
        state: "creado",
        idCustomer: user._id,
        numberOrder: counterAcum + 1,
        idTrolley: user.idTrolley,
        totalOrder: total,
      };
      orders.push(OneNewOrder);
      return OneNewOrder;
    } catch (err) {
      logger.log("error", `errInOrdersMemDb${err}`);
      return { error: err };
    }
  };

  getOrdersTheClient = async (idUserS) => {
    try {
      const ordersExist = orders.find((el) => el.idCustomer == idUserS);
      return [ordersExist];
    } catch (err) {
      logger.log("error", `errInOrdersMemOrderClient${err}`);
    }
  };
}
module.exports = ContainerOrdersMem;
