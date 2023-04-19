const ContenedorMsjes = require("../../services/mensajes");
const containerMsjes = new ContenedorMsjes();

const logger = require("../../utils/loggers");

function socketModule(io) {
  io.on("connection", async (socket) => {
    logger.log("info", "✅  con3ct Socket");
    socket.on("msg", async (data) => {
      let guardar = await containerMsjes.saveMsges(data);
      let probandoNormalizr = containerMsjes.normalizarMsges(guardar);
      io.sockets.emit("listaMsgs", probandoNormalizr);
    });
  });
}
module.exports = socketModule;
