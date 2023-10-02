const moment = require("moment");
const timestamp = moment().format("lll");
const logger = require("../utils/loggers");
const { DaoMessages } = require("../db/daos/indexDaos");
const { normalize, schema } = require("normalizr");
const Joi = require("joi");
let infoUser;
const authorSchema = new schema.Entity("authors", {}, { idAttribute: "idmail" });
const messageSchema = new schema.Entity("texts", {
  author: authorSchema,
});

const messageSchemaOk = [messageSchema];
///
class ContainerMessages {
  constructor() {}
  async readMsgs() {
    try {
      const res = await DaoMessages.traerMensajesOredenadoPorFecha();
      if (res) {
        return res;
      } else {
        return [], { err: true, msg: "sin mensajes" };
      }
    } catch (err) {
      logger.log("error", `${err}`);
    }
  }
  async infoUserToChat(infUser) {
    try {
      infoUser = infUser;
    } catch (err) {
      logger.log("error", `ErrorEnNegocioMensajes${err}`);
    }
  }
  async saveMsges(mensaje) {
    try {
      const reExpNoAccept = /[.*+\-?^${}()<>|[\]\\]/g;
      if (!infoUser) {
        return { msge: "login please" };
      }
      if (mensaje.text.match(reExpNoAccept)) {
        throw new Error("Invalid entry");
      }
      ContainerMessages.validarMessage(mensaje);
      const author1 = {
        idmail: infoUser.email,
        avatar: infoUser.avatar,
        nombre: infoUser.nombre,
        edad: infoUser.edad,
      };
      let text1 = mensaje.text;
      await DaoMessages.guardarNuevoMensaje(author1, text1, timestamp);
      let act = await this.readMsgs();
      return act;
    } catch (err) {
      logger.log("error", `${err}`);
    }
  }

  normalizarMsges(msgRec) {
    try {
      const normalizarOk = normalize(msgRec, messageSchemaOk);
      return normalizarOk;
    } catch (err) {
      logger.log("error", `${err}`);
    }
  }
  static validarMessage(message) {
    const CreateMessageSchema = Joi.object({
      text: Joi.string().required(),
    });
    const { error } = CreateMessageSchema.validate(message);
    if (error) {
      throw error;
    }
  }
}
module.exports = ContainerMessages;
