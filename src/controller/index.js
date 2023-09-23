const logger = require("../utils/loggers");

const routIndex = (req, res) => {
  try {
    logger.log("info", { ruta: req.originalUrl, method: req.route.methods });
    res.render("pages/index", {
      imagen: "https://i.ytimg.com/vi/WGrX46hqSCc/maxresdefault.jpg",
    });
  } catch (err) {
    logger.log("error", `Error in routIndex controller${err}`);
  }
};
const failRoute = (req, res) => {
  try {
    res.status(404).json();
    logger.log("warn", { route: req.path, method: req.route.methods, err: "ruta inexistente" });
  } catch (err) {
    logger.log("error", `Error in failRoute controller${err}`);
  }
};

module.exports = { routIndex, failRoute };
