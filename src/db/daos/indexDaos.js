const dataBasForConsole = process.argv[3] || "mongo";
const logger = require("../../utils/loggers");
////Daos Orders
const OrdersDaoMongo = require("./orders/ordersDaoMongo");
const OrdersDaoFirebas = require("./orders/ordersDaoFirebas");
const OrdersDaomMem = require("./orders/ordersDaoMem");
////Daos products
const ProductsDaoMongo = require("./products/productDaoMongo");
const ProductsDaoFirebas = require("./products/productsDaoFirebas");
const ProductsDaoMem = require("./products/productsDaoMem");
//Daos trolleys
const TrolleysDaoMongo = require("./trolleys/trolleysDaoMongo");
const TrolleysDaoFirebas = require("./trolleys/trolleysDaoFirebas");
const TrolleysDaoMem = require("./trolleys/trolleysDaoMem");
//Daos Messages
const MessagesDaoMongo = require("./messages/messagesDaoMongo");
const MessagesDaoFirebas = require("./messages/messagesDaoFirebas");
const MessagesDaoMem = require("./messages/messagesDaoMem");

const instancias = [
  {
    nombre: OrdersDaoMongo,
    id: "mongo",
    descripcion: "orders",
  },
  {
    nombre: OrdersDaoFirebas,
    id: "firebas",
    descripcion: "orders",
  },
  {
    nombre: OrdersDaomMem,
    id: "mem",
    descripcion: "orders",
  },
  {
    nombre: ProductsDaoMongo,
    id: "mongo",
    descripcion: "products",
  },
  {
    nombre: ProductsDaoFirebas,
    id: "firebas",
    descripcion: "products",
  },
  {
    nombre: ProductsDaoMem,
    id: "mem",
    descripcion: "products",
  },
  {
    nombre: TrolleysDaoMongo,
    id: "mongo",
    descripcion: "trolleys",
  },
  {
    nombre: TrolleysDaoFirebas,
    id: "firebas",
    descripcion: "trolleys",
  },
  {
    nombre: TrolleysDaoMem,
    id: "mem",
    descripcion: "trolleys",
  },
  {
    nombre: MessagesDaoMongo,
    id: "mongo",
    descripcion: "messages",
  },
  {
    nombre: MessagesDaoFirebas,
    id: "firebas",
    descripcion: "messages",
  },
  {
    nombre: MessagesDaoMem,
    id: "mem",
    descripcion: "messages",
  },
];

const instancia = instancias.filter((el) => el.id == dataBasForConsole);
const rutaResult = {
  [instancia[0].descripcion]: instancia[0].nombre,
  [instancia[1].descripcion]: instancia[1].nombre,
  [instancia[2].descripcion]: instancia[2].nombre,
  [instancia[3].descripcion]: instancia[3].nombre,
};

logger.log("info", `✅ Conectado ah la DB ${dataBasForConsole}`);

let DaoOrders = new rutaResult.orders();
let DaoProducts = new rutaResult.products();
let DaoTrolleys = new rutaResult.trolleys();
let DaoMessages = new rutaResult.messages();

module.exports = { DaoOrders, DaoProducts, DaoTrolleys, DaoMessages };
