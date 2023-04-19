const logger = require("../../utils/loggers");
const mongoose = require("mongoose");
const { Schema, model } = require("mongoose");

const UsuarrioSchema = new Schema({
  email: { type: String, required: true, max: 100 },
  password: { type: String, required: true, max: 100 },
  nombre: { type: String, required: true, max: 100 },
  edad: { type: Number, required: true },
  direccion: { type: String, required: true, max: 100 },
  telefono: { type: Number, required: true },
  avatar: { type: String, required: true },
  idTrolley: { type: String },
});

const Usuarios = model("Usuarios", UsuarrioSchema);

class ContainerUsuariosMongo {
  constructor(collection) {
    this.collection = collection;
  }
  /////////////////////////////////////////////////Funcion Para Dezerializer
  getOneUserForId = (id, done) => {
    return Usuarios.findById(id, done);
  };

  getOneUserForEmail = (emailD) => {
    return Usuarios.findOne(emailD);
  };
}

module.exports = { ContainerUsuariosMongo, Usuarios };
