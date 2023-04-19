const { Schema, model } = require("mongoose");
const logger = require("../../utils/loggers");

const MensajesSchema = new Schema({
  author: {
    alias: { type: String },
    avatar: { type: String },
    edad: { type: Number },
    idmail: { type: String },
    nombre: { type: String },
  },

  text: { type: String, required: true, max: 100 },
  time: Date,
});
const Mensajes = model("mensajes", MensajesSchema);

///

class ContainerMessagesMongo {
  constructor(collection) {
    this.collection = collection;
  }
  traerMensajesOredenadoPorFecha = async () => {
    try {
      const mensajesPorFecha = await Mensajes.find({});
      let arrayRes = mensajesPorFecha.map((item) => {
        return { id: item._id, author: item.author, text: item.text };
      });
      return arrayRes;
    } catch (err) {
      logger.log("error", `errInMsgMdb${err}`);
    }
  };
  guardarNuevoMensaje = async (author1, text1, timestamp) => {
    try {
      const res = { author: author1, text: text1, time: timestamp };
      const newMessage = new Mensajes(res);
      await newMessage.save().then((data) => logger.log("info", `newMessage ${data}`));
    } catch (err) {
      logger.log("error", `errInMsgMdb${err}`);
      return { error: err };
    }
  };
}

module.exports = ContainerMessagesMongo;
