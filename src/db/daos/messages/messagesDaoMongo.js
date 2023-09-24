const ContainerMessagesMongo = require("../../mongoose/messages");

class MessagesDaoMongo extends ContainerMessagesMongo {
  constructor() {
    super("mensajes");
  }
}
module.exports = MessagesDaoMongo;
