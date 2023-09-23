const express = require("express");
const passport = require("passport");
const { Router } = express;
const authentication = new Router();

const { ControllerAuthentication } = require("../controller/authentication");
const controllerAuthentication = new ControllerAuthentication();
authentication.get("/crearCuenta", controllerAuthentication.getCreateAcount);
authentication.get("/login", controllerAuthentication.getLogIn);
authentication.get("/logout", controllerAuthentication.logOut);
authentication.post(
  "/crearCuenta",
  passport.authenticate("crearCuenta", { passReqToCallback: true, failureRedirect: "/perfil/crearCuenta" }),
  controllerAuthentication.postCreateAcount
);
authentication.post(
  "/login",
  passport.authenticate("login", { passReqToCallback: true, failureRedirect: "/perfil/login" }),
  controllerAuthentication.postLogIn
);

module.exports = authentication;
