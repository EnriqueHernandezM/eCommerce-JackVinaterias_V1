const ContainerMessagesMem = require("../../memory/mensajes"); //ok
class MessagesDaoMem extends ContainerMessagesMem {
  constructor() {
    super();
  }
}
module.exports = MessagesDaoMem;
