const { usuarios } = require("../../utils/createUserParallel");
const logger = require("../../utils/loggers");
const moment = require("moment");
const timestamp = moment().format("lll");
const carritosCompras = [];
class ContainerCarritoMem {
  constructor() {}

  createOneNewTrolley = async (idMyUsuer) => {
    try {
      const catchMyUser = usuarios.find((el) => el._id == idMyUsuer);
      let _id = 1;
      catchMyUser.length > 0 &&
        catchMyUser.forEach((el) => {
          _id = el._id + 1;
        });
      let theTrolley = {
        _id: _id,
        idUser: idMyUsuer,
        emailUser: catchMyUser.email,
        carrito: [],
        data: timestamp,
      };
      carritosCompras.push(theTrolley);
      catchMyUser.idTrolley = _id;
      return [theTrolley]; //me retorna el primer carrito que tenga el idUser
    } catch (err) {
      logger.log("error", `errIncarritoMemoryCreateNewTrolley${err}`);
    }
  };
  getAllTrolley = (idTrolley) => {
    idTrolley = 1;
    try {
      const datas = carritosCompras.find((el) => el._id == idTrolley);
      if (!datas) {
        return [{ carrito: [] }];
      }
      return [datas];
    } catch (err) {
      logger.log("error", `errInTrolleyMem${err}`);
    }
  };
  pushAoneTrolley = (idTrolley, catchProduct, cantidadTopurch) => {
    try {
      catchProduct.cantidad = cantidadTopurch;
      let myTrolley = this.getAllTrolley(idTrolley);
      for (const el of myTrolley) {
        el.carrito.push(catchProduct);
      }
      return { msge: "producto Correctamente afregado a carrito" };
    } catch (err) {
      logger.log("error", `errInTrolleyMem${err}`);
    }
  };
  deleteOneItemByTrolley = async (idTrolley, carrito) => {
    try {
      let datasAct = this.getAllTrolley(idTrolley);
      datasAct.carrito = carrito;
      return { msge: "producto eliminido de tu carrtio correctamente" };
    } catch (err) {
      logger.log("error", `errInTrolleyMem${err}`);
    }
  };
  dataOneUser = async (idUsuario) => {
    try {
      const userInfo = usuarios.find((el) => el._id == idUsuario);
      return [userInfo];
    } catch (err) {
      logger.log("error", `errInMemoriPersistencia${err}`);
    }
  };
  dataOneTrolley = async (idUsuario) => {
    try {
      const data = carritosCompras.find((el) => {
        el._id == idUsuario;
      });
      return data;
    } catch (err) {
      logger.log("error", `errInMemoryPersistencia${err}`);
    }
  };
}

module.exports = ContainerCarritoMem;
