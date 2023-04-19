const logger = require("../utils/loggers");
const bcrypt = require("bcrypt");
const { getFirestore } = require("firebase-admin/firestore");
const db = getFirestore();
const usuarios = [
  {
    _id: "642ca609ffc507b352621f49",
    email: "quique166sb1@hotmail.com",
    password: "$2b$10$hdMQHkjQhybrI64B1j73K.gjroU6GJr.XPpAq9bLgZbFxzyQj7AzC",
    nombre: "Enrique",
    edad: "88",
    direccion: "And. tecamac 2",
    telefono: "5613507622",
    avatar:
      "https://static.nike.com/a/images/w_1920,c_limit/73a6ec94-cea8-49b1-9838-b70cee0c042f/c%C3%B3mo-practicar-skateboarding-para-principiantes.jpg",
    idTrolley: "f",
  },
];
const createUserParallel = async (objectUser) => {
  try {
    usuarios.push(objectUser);
    const newUser = await db
      .collection("usuarios")
      .doc()
      .set({
        email: objectUser.email,
        password: createHash(objectUser.password),
        nombre: objectUser.nombre,
        edad: objectUser.edad,
        direccion: objectUser.direccion,
        telefono: objectUser.telefono,
        avatar: objectUser.avatar,
        carrito: "f",
      });
    logger.log("info", `${newUser}`);
    return newUser;
  } catch (err) {
    logger.log("error", `${err}`);
    return { error: err };
  }
};

function createHash(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);
}

module.exports = { createUserParallel, usuarios };
