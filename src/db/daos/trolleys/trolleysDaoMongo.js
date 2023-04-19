const { ContainerCarritoMongo } = require("../../mongoose/carrito");

class TrolleysDaoMongo extends ContainerCarritoMongo {
  constructor() {
    super("carritoscompras");
  }
}
module.exports = TrolleysDaoMongo;
