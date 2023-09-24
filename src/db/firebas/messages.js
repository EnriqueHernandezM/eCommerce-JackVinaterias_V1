const { getFirestore } = require("firebase-admin/firestore");
const db = getFirestore();

class ContainerMessagesFirebas {
  constructor(collection) {
    this.collection = collection;
  }
  traerMensajesOredenadoPorFecha = async () => {
    try {
      const mensajesPorFecha = await db.collection(this.collection).orderBy("time", "asc").get();
      if (mensajesPorFecha) {
        let arrayRes = mensajesPorFecha.docs.map((item) => {
          return { id: item.id, ...item.data() };
        });
        return arrayRes;
      }
    } catch (err) {
      logger.log("error", `errInMsgsFB${err}`);
    }
  };
  guardarNuevoMensaje = async (author1, text1, timestamp) => {
    try {
      let res;
      res = await db.collection(this.collection).doc().set({
        author: author1,
        text: text1,
        time: timestamp,
      });
      return res;
    } catch (err) {
      logger.log("error", `errInMsgsFB${err}`);
    }
  };
}

module.exports = ContainerMessagesFirebas;
/* container firebas i ts ready , lack monggose and memory the constructor recived collection mensajes*/
