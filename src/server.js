const express = require("express");
const app = express();
let argv = require("minimist")(process.argv.slice(2));
let puertoPorArgumentos = argv["_"][0];
const cors = require("cors");
const logger = require("./utils/loggers");
const flash = require("connect-flash");
const passport = require("passport");
const environmentVars = require("./config/config");
const {
  index,
  apiOrders,
  apiProductos,
  randomOperation,
  infoConCompresion,
  apiCarrito,
  authentication,
  failRoute,
} = require("./routers/allRouts");
const httpServer = require("http").createServer(app);
const io = require("socket.io")(httpServer);
const socketModule = require("./controller/socketsMensajes/sockets");
const session = require("./utils/session");

class InitServer {
  constructor() {
    this.PORT = environmentVars.PORT || puertoPorArgumentos;
    this.app = app;
    this.httpServer = httpServer;
    this.session = session;
    this.initDbs();
    this.auth();
    this.middlewares();
    this.routes();
    this.engineEjs();
    this.initSocket();
  }
  initDbs() {
    /* aqui conectamos con mongo y firebas paraleo ya que al tener un solo passport 
necesitamos crear usuario en paralelo para su registro */
    require("./utils/databasConecctions/mongoose");
    require("./utils/databasConecctions/firebas");
  }
  auth() {
    require("./utils/passport/local-auth");
  }
  middlewares() {
    this.app.use(cors({ origin: "*" }));
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use("/public", express.static(__dirname + "../../public"));
    this.app.use(this.session);
    this.app.use(passport.initialize());
    this.app.use(passport.session());
    this.app.use(flash());
    this.app.use((req, res, next) => {
      app.locals.crearCuentamsg = req.flash("crearCuentamsg");
      next();
    });
  }
  routes() {
    this.app.use("/", index);
    this.app.use("/api/ordenes", apiOrders);
    this.app.use("/api", apiProductos);
    this.app.use("/operacion", randomOperation);
    this.app.use("/info", infoConCompresion);
    this.app.use("/api", apiCarrito);
    this.app.use("/perfil", authentication);
    this.app.get("*", failRoute);
  }
  engineEjs() {
    this.app.set("view engine", "ejs");
  }
  initSocket() {
    socketModule(io);
  }
  listen() {
    httpServer.listen(this.PORT, () => logger.log("info", "✅  SERVER ON http://localhost:" + this.PORT));
  }
}

module.exports = InitServer;
