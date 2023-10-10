const express = require("express");
const app = express();
let argv = require("minimist")(process.argv.slice(2));
let puertoPorArgumentos = argv["_"][0];
const cors = require("cors");
const logger = require("./utils/loggers");
const flash = require("connect-flash");
const fileUpload = require("express-fileupload");
const passport = require("passport");
const environmentVars = require("./config/config");
const { index, apiOrders, apiProducts, apiTrolley, authentication, failRoute } = require("./routers/allRouts");
const { notFound, errorHandler } = require("./middleware/error.middleware");
const httpServer = require("http").createServer(app);
const io = require("socket.io")(httpServer);
const socketModule = require("./controller/socketMessages/sockets");
const session = require("./utils/session");

class InitServer {
  constructor() {
    this.PORT = environmentVars.PORT || puertoPorArgumentos || 8081;
    this.app = app;
    this.httpServer = httpServer;
    this.session = session;
    this.notFound = notFound;
    this.errorHandler = errorHandler;
    this.initDbs();
    this.auth();
    this.middlewares();
    this.routes();
    this.engineEjs();
    this.initSocket();
  }
  initDbs() {
    const dataBasForConsole = process.argv[3] || "mongo";
    switch (dataBasForConsole) {
      case "mongo":
        require("./utils/databasConecctions/mongoose");
        break;
      case "firebas":
        require("./utils/databasConecctions/firebas");
        break;
      default:
        break;
    }
  }
  auth() {
    require("./utils/passport/local-auth");
  }
  middlewares() {
    this.app.use(cors({ origin: "*" }));
    this.app.use(
      fileUpload({
        useTempFiles: true,
        tempFileDir: "/tmp/",
      })
    );
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
    this.app.use("/api", apiProducts);
    this.app.use("/api", apiTrolley);
    this.app.use("/perfil", authentication);
    this.app.use(this.notFound);
    this.app.use(this.errorHandler);
    this.app.get("*", failRoute);
  }
  engineEjs() {
    this.app.set("views", "src/views");
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
