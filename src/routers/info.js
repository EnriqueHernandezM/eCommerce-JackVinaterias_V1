const express = require("express");
const { Router } = express;
const randomOperation = new Router();
const infoConCompresion = new Router();
const { apiRandoms, info, infoConLog } = require("../controller/info");
randomOperation.get("/infoSinCompresion", info);
const compression = require("compression");
infoConCompresion.use(compression()); //use el routing para implementar compression
infoConCompresion.get("/compresion", info);
randomOperation.get("/infoConLog", infoConLog);
randomOperation.get("/infoSinLog", info);
randomOperation.use(compression()); //prueba
randomOperation.get("/randoms", apiRandoms);
module.exports = { randomOperation, infoConCompresion };
