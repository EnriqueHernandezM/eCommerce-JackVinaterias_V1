const logger = require("../utils/loggers");
const { ContainerTrolley } = require("../services/carrito");
const containerTrolley = new ContainerTrolley();
const environmentVars = require("../config/config");

const getLogIn = async (req, res) => {
  try {
    logger.log("info", { route: req.originalUrl, method: req.route.methods });
    if (req.isAuthenticated()) {
      const oneTrolley = await containerTrolley.infoTrolley(req.user.idTrolley);
      const trolley = oneTrolley.carrito;
      let prueba = [];
      trolley.forEach((el) => {
        prueba.push(el.price * el.cantidad);
      });
      let total = prueba.reduce((acc, el) => acc + el, 0);
      const user = req.user;
      switch (environmentVars.typeInRes) {
        case "resJson":
          res.status(202).json({
            session: true,
            user: user,
            msge: "user login ok",
          });
          break;
        case "":
          res.status(202).render("pages/formloguear", { sessionE: true, userE: user, carritoE: trolley, total: total || 0 });
          break;
      }
    } else if (req.isAuthenticated() == false) {
      switch (environmentVars.typeInRes) {
        case "resJson":
          res.status(202).json({
            session: false,
            msge: "user not login",
          });
          break;
        case "":
          res.status(202).render("pages/formloguear", { sessionE: "esp" });
          break;
      }
    }
  } catch (err) {
    logger.log("error", `error in getLogIn controller${err}`);
  }
};
const postLogIn = async (req, res) => {
  try {
    logger.log("info", { route: req.originalUrl, method: req.route.methods });
    if (req.isAuthenticated()) {
      const oneTrolley = await containerTrolley.infoTrolley(req.user.idTrolley);
      const trolley = oneTrolley.carrito;
      let prueba = [];
      let total = prueba.reduce((acc, el) => acc + el, 0);
      const user = req.user;
      switch (environmentVars.typeInRes) {
        case "resJson":
          res.status(202).json({
            session: true,
            user: user,
            msge: "user login ok",
          });
          break;
        case "":
          res.status(202).render("pages/formloguear", { sessionE: true, userE: user, carritoE: trolley, total: total || 0 });
          break;
      }
    } else if (req.isAuthenticated() == false) {
      switch (environmentVars.typeInRes) {
        case "resJson":
          res.status(202).json({
            session: false,
            msge: "user not login",
          });
          break;
        case "":
          res.status(202).render("pages/formloguear", { sessionE: "esp" });
          break;
      }
    }
  } catch (err) {
    logger.log("error", `error in PostLogIn controller${err}`);
  }
};
const getCreateAcount = (req, res) => {
  try {
    logger.log("info", { route: req.path, method: req.route.methods });
    if (req.isAuthenticated()) {
      res.render("pages/crearCuenta", {});
    } else {
      res.render("pages/crearCuenta", {});
    }
  } catch (err) {
    logger.log("error", `error in getCreateAcount controller${err}`);
  }
};
const postCreateAcount = (req, res) => {
  try {
    logger.log("info", { route: req.originalUrl, method: req.route.methods });
    getLogIn(req, res);
    req, res;
  } catch (err) {
    logger.log("error", `error in postcreateAcount controller${err}`);
  }
};
const logOut = (req, res) => {
  try {
    let mdgDesp = "hasta luego" + " " + req.user.email;
    logger.log("info", { route: req.originalUrl, method: req.route.methods });
    req.session.destroy((err) => {
      if (err) {
        res.status(503).send("algo salio mal en la pagina intenta de nuevo");
      } else {
        switch (environmentVars.typeInRes) {
          case "resJson":
            res.status(204).json({});
            break;
          case "":
            res.status(202).render("pages/formloguear", { sessionE: "desp", mdg: mdgDesp });
            break;
        }
      }
    });
  } catch (err) {
    logger.log("error", `error in logout controller${err}`);
  }
};

module.exports = { getCreateAcount, getLogIn, postCreateAcount, postLogIn, logOut };
