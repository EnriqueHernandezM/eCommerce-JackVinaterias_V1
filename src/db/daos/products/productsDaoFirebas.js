const ContainerProductFirebas = require("../../firebas/products");
class ProductsDaoFirebas extends ContainerProductFirebas {
  constructor() {
    super("inventarios");
  }
}

module.exports = ProductsDaoFirebas;
