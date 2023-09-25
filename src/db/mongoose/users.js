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

const Users = model("Usuarios", UsuarrioSchema);

class ContainerUsersMongo {
  constructor(collection) {
    this.collection = collection;
  }
  getOneUserForEmailDb = async (email) => {
    try {
      return await Users.findOne({ email: email });
    } catch (err) {
      throw err;
    }
  };
  /////////////////////////////////////////////////Funcion Para Dezerializer
  getOneUserForIdDb = async (id) => {
    try {
      return await Users.findById(id);
    } catch (err) {
      throw err;
    }
  };
  createNewUserDb = async (newUser) => {
    try {
      const newUserAdd = new Users(newUser);
      return await newUserAdd.save().then((data) => {
        console.log(data);
        return data;
      });
    } catch (err) {
      throw err;
    }
  };
}
//enfocarnos en crear daos para auth despuies verificar donde mas se usan los fdaatos d3e ud
module.exports = { ContainerUsersMongo, Users };
