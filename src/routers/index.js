const express = require("express");
const { Router } = express;
const index = new Router();
const { routIndex } = require("../controller/index");

index.get("/", routIndex);

module.exports = index;
