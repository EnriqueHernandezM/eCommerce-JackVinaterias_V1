const environmentVars = require("../../config/config");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const ContainerAuthentication = require("../../services/authentication");
const containerAuthentication = new ContainerAuthentication();
const { Users } = require("../../db/mongoose/users"); //Eliminar cuando aestye el daos
const bcrypt = require("bcrypt");
const enviarcorreo = require("../nodemailer");
const logger = require("../loggers");

passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser(async (id, done) => {
  containerAuthentication.getUserToDeserialize(id, done);
});

function isValidPassword(user, password) {
  return bcrypt.compareSync(password, user.password);
}
function createHash(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);
}

passport.use(
  "crearCuenta",
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
      passReqToCallback: true,
    },
    (req, email, password, done) => {
      containerAuthentication.getInfoUser(email, (err, user) => {
        if (err) {
          logger.log("info", "Error in SignUp: " + err);
          return done(err);
        }
        if (user) {
          logger.log("info", "User already exists");
          return done(null, false, req.flash("crearCuentamsg", "cuenta ya existente"));
        }
        if (password != req.body.confirmPass) {
          logger.log("info", "password error");
          return done(null, false, req.flash("crearCuentamsg", "revisa que tu password sea igual"));
        }
        let newAvatar = req.files || req.body.avatar;
        const newUser = {
          email: email,
          password: createHash(password),
          nombre: req.body.nombre,
          edad: req.body.edad,
          direccion: req.body.direccion,
          telefono: req.body.telefono,
          avatar: newAvatar,
          idTrolley: "f",
        };
        const mailOptions = {
          from: "Servidor Node. JackVinaterias",
          to: environmentVars.correoServiceMe,
          subject: "Nuevo usuario registrado",
          html: `<div>
          <h1 style="color: blue;">Email Usuario <span style="color: green;">${email}</span></h1>
            <h1 style="color: blue;">Nombre <span style="color: green;">${req.body.nombre}</span></h1>
            <h1 style="color: blue;">Edad <span style="color: green;">${req.body.edad}</span></h1>
            <h1 style="color: blue;">Direccion <span style="color: green;">${req.body.direccion}</span></h1>
            <h1 style="color: blue;"> Telefono <span style="color: green;">${req.body.telefono}</span></h1>
            </div>`,
        };
        containerAuthentication.createNewUser(newUser, (err, userWithId) => {
          if (err) {
            logger.log("info", `Error in Saving user:${err}`);
            return done(err);
          }
          logger.log("info", "User Registration succesful");
          //enviarcorreo(mailOptions);
          // createUserParallel(newUser); //esta se eliminara cuando este listo el Daos
          return done(null, userWithId);
        });
      });
    }
  )
);

passport.use(
  "login",
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
      passReqToCallback: true,
    },
    (req, email, password, done) => {
      containerAuthentication.getInfoUser(email, (err, user) => {
        if (err) return done(err);
        if (!user) {
          logger.log("warn", `User Not Found with email${email}`);
          return done(null, false, req.flash("crearCuentamsg", "tenemos algun problema o verifica tu informacion"));
        }
        if (!isValidPassword(user, password)) {
          logger.log("warn", "Invalid Password");
          return done(null, false, req.flash("crearCuentamsg", "tenemos algun problema o verifica tu informacion"));
        }
        return done(null, user);
      });
    }
  )
);
