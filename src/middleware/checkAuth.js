const logger = require("../utils/loggers");
const environmentVars = require("../config/config");
function checkAuthentication(req, res, next) {
  if (req.isAuthenticated()) {
    next();
  } else {
    logger.log("info", { ruta: req.originalUrl, metodo: req.route.methods });
    res.redirect("/perfil/login");
  }
}

function checkAuthenticationAdmin(req, res, next) {
  if (req.isAuthenticated() && req.user.email === environmentVars.adminActive) {
    next();
  } else {
    switch (req.route.methods.get) {
      case true:
        res.status(400).redirect("/perfil/login");
        break;
      default:
        res.status(403).json({ blockToAdmin: "solo Admin" });
        break;
    }
  }
}
module.exports = { checkAuthentication, checkAuthenticationAdmin };
