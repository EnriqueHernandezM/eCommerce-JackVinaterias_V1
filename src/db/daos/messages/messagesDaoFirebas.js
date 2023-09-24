const ContainerMessagesFirebas = require("../../firebas/messages");

class MessagesDaoFirebas extends ContainerMessagesFirebas {
  constructor() {
    super("mensajes");
  }
}
module.exports = MessagesDaoFirebas;
