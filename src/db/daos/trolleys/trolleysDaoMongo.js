const { ContainerCarritoMongo } = require("../../mongoose/trolley");

class TrolleysDaoMongo extends ContainerCarritoMongo {
  constructor() {
    super("carritoscompras");
  }
}
module.exports = TrolleysDaoMongo;
