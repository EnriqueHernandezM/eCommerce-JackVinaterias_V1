const logger = require("../../utils/loggers");

let mensajes = [
  {
    id: 1,
    author: {
      idmail: "quique166sb@hotmail.com",
      avatar: "https://ss388.liverpool.com.mx/xl/1064210455.jpg",
      nombre: "Enrique",
      edad: "88",
    },
    text: "primer Mensajes",
    time: "2023-03-08T06:57:00.000+00:00",
  },
  {
    id: 2,
    author: {
      idmail: "quique166sb@hotmail.com",
      avatar: "https://ss388.liverpool.com.mx/xl/1064210455.jpg",
      nombre: "Enrique",
      edad: "88",
    },
    text: "segundo mensaje",
    time: "2023-03-08T06:57:00.000+00:00",
  },
];

class ContainerMessagesMem {
  constructor() {}
  traerMensajesOredenadoPorFecha = () => {
    return mensajes;
  };
  guardarNuevoMensaje = async (author1, text1, timestamp) => {
    try {
      let res = { author: author1, text: text1, time: timestamp };
      let all = this.traerMensajesOredenadoPorFecha();
      let id = 1;
      let data = timestamp;
      all.length > 0 &&
        all.forEach((el) => {
          id = el.id + 1;
        });
      res.time = data;
      res.id = id;
      all.push(res);
    } catch (err) {
      logger.log("error", `${err}`);
      return { error: err };
    }
  };
}

module.exports = ContainerMessagesMem;
