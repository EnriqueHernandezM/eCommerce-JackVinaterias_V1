const logger = require("../../utils/loggers");
const usersMem = [
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
class ContainerUsersMem {
  constructor() {
    this.usersMem = usersMem;
  }
  /////////////////////////////////////////////////Funcion Para Dezerializer
  getOneUserForEmailDb = (email) => {
    try {
      for (const el of this.usersMem) {
        if (el.email == email) {
          return this.usersMem;
        }
      }
    } catch (err) {
      throw err;
    }
    for (const el of this.usersMem) {
      console.log(el.email);
    }
  };
  ///////////////////////prueba
  getOneUserForIdDb = (id) => {};
  //////////////////////////////////////////////////Creamois User Con CARRITO en paralelo
}
ecreateNewUserDB = () => {
  try {
    this.usuarios.push(objectUser);
  } catch (err) {
    throw err;
  }
};

module.exports = ContainerUsersMem;
