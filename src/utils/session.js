const environmentVars = require("../config/config");
const session = require("express-session");
const MongoStore = require("connect-mongo");

module.exports = session({
  store: MongoStore.create({
    mongoUrl: environmentVars.mongoDb,
    mongoOptions: {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
  }),
  secret: environmentVars.sessionSecret,
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 600000000000000, //sesion durara 10 minutos
  },
});
