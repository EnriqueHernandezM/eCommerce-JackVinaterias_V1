const { ContainerOrdersMongo } = require("../../mongoose/orders");

class OrdersDaoMongo extends ContainerOrdersMongo {
  constructor() {
    super("ordenes");
  }
}
module.exports = OrdersDaoMongo;
