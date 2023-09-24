const { ContainerProductMem } = require("../../memory/products");

class ProductsDaoMem extends ContainerProductMem {
  constructor() {
    super();
  }
}
module.exports = ProductsDaoMem;
