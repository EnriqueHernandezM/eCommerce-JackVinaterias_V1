const ContainerProductFirebas = require("../../firebas/productos");
class ProductsDaoFirebas extends ContainerProductFirebas {
  constructor() {
    super("inventarios");
  }
}

module.exports = ProductsDaoFirebas;
