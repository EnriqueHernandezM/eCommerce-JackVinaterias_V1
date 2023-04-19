const { ContainerProductMem } = require("../../memory/productos");

class ProductsDaoMem extends ContainerProductMem {
  constructor() {
    super();
  }
}
module.exports = ProductsDaoMem;
