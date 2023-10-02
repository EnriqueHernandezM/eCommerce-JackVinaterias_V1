const ContainerMessages = require("../../services/messages");
const containerMessages = new ContainerMessages();
const logger = require("../../utils/loggers");

function socketModule(io) {
  io.on("connection", async (socket) => {
    logger.log("info", "✅  con3ct Socket");
    socket.on("msg", async (data) => {
      let guardar = await containerMessages.saveMsges(data);
      if (guardar.msge) {
        socket.emit("notLogin", guardar.msge);
      }
      let probandoNormalizr = containerMessages.normalizarMsges(guardar);
      io.sockets.emit("listaMsgs", probandoNormalizr);
    });
  });
}
module.exports = socketModule;
