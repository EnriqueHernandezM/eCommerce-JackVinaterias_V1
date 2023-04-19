const ContainerMessagesMongo = require("../../mongoose//mensajes");

class MessagesDaoMongo extends ContainerMessagesMongo {
  constructor() {
    super("mensajes");
  }
}
module.exports = MessagesDaoMongo;
