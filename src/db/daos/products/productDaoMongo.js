const { ContainerProductMongo } = require("../../mongoose/products");

class ProductsDaoMongo extends ContainerProductMongo {
  constructor() {
    super("inventarios");
  }
}
module.exports = ProductsDaoMongo;
