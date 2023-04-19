const ContainerMessagesFirebas = require("../../firebas/mensajes");

class MessagesDaoFirebas extends ContainerMessagesFirebas {
  constructor() {
    super("mensajes");
  }
}
module.exports = MessagesDaoFirebas;
