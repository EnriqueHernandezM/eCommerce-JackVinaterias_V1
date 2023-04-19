const logger = require("../utils/loggers");
function checkAuthentication(req, res, next) {
  if (req.isAuthenticated()) {
    next();
  } else {
    logger.log("info", { ruta: req.originalUrl, metodo: req.route.methods });
    res.redirect("/perfil/login");
  }
}

function checkAuthenticationAdmin(req, res, next) {
  if (req.isAuthenticated() && req.user.email === "quique166sb1@hotmail.com") {
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
