const ContainerOrdersFirebas = require("../../firebas/orders");

class OrdersDaoFirebas extends ContainerOrdersFirebas {
  constructor() {
    super("ordenes");
  }
}

module.exports = OrdersDaoFirebas;
