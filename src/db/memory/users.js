const logger = require("../../utils/loggers");
const usersMem = [
  {
    _id: "1",
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
    this.file = usersMem;
  }
  getOneUserForEmailDb = (email) => {
    try {
      for (const el of this.file) {
        if (el.email == email) {
          return el;
        }
      }
    } catch (err) {
      throw err;
    }
  };
  getOneUserForIdDb = (id) => {
    try {
      for (const el of this.file) {
        if (el._id == id) {
          return el;
        }
      }
    } catch (err) {
      throw err;
    }
  };
  createNewUserDb = async (addUser) => {
    try {
      let idExisting;
      this.file.forEach((el) => {
        idExisting = el._id;
      });
      addUser._id = idExisting + 1;
      logger.log("info", addUser);
      usersMem.push(addUser);
      return addUser;
    } catch (err) {
      throw err;
    }
  };
}

module.exports = ContainerUsersMem;
