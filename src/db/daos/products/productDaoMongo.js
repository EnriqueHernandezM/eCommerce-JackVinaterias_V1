const { ContainerProductMongo } = require("../../mongoose/productos");

class ProductsDaoMongo extends ContainerProductMongo {
  constructor() {
    super("inventarios");
  }
}
module.exports = ProductsDaoMongo;
