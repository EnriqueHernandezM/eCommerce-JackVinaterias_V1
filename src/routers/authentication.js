const express = require("express");
const passport = require("passport");
const { Router } = express;
const authentication = new Router();

const { getCreateAcount, getLogIn, postCreateAcount, postLogIn, logOut } = require("../controller/authentication");
authentication.get("/crearCuenta", getCreateAcount);
authentication.get("/login", getLogIn);
authentication.get("/logout", logOut);
authentication.post(
  "/crearCuenta",
  passport.authenticate("crearCuenta", { passReqToCallback: true, failureRedirect: "/perfil/crearCuenta" }),
  postCreateAcount
);
authentication.post("/login", passport.authenticate("login", { passReqToCallback: true, failureRedirect: "/perfil/login" }), postLogIn);

module.exports = authentication;
