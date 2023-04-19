const logger = require("../utils/loggers");
const { mostarInfoSistem, operacionRandom } = require("../services/info");
function info(req, res) {
  try {
    logger.log("info", { route: req.originalUrl, methods: req.route.methods });
    const info = mostarInfoSistem();
    res.json(info);
  } catch (err) {
    logger.log("error", `Error in info controller${err}`);
  }
}
function infoConLog(req, res) {
  try {
    const info = mostarInfoSistem();
    console.log(info);
  } catch (err) {
    logger.log("error", `${err}`);
  }
}
function apiRandoms(req, res) {
  try {
    const limite = req.query;
    const sum = operacionRandom(limite);
    res.end(`La data es ${sum}`);
  } catch (err) {
    logger.log("error", `${err}`);
  }
}
module.exports = {
  apiRandoms,
  info,
  infoConLog,
};
