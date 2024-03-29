const logger = require("../../utils/loggers");
const { Users } = require("../mongoose/users");
const { getFirestore } = require("firebase-admin/firestore");
const moment = require("moment");
const timestamp = moment().format("lll");
class ContainerCarritoFirebas {
  constructor(collection) {
    this.collection = collection;
    this.db = getFirestore();
  }
  //recibo el idDe Usuario
  createOneNewTrolley = async (idMyUsuer) => {
    try {
      const catchMyUserFb = await this.db.collection("usuarios").doc(idMyUsuer).get();
      const catchMyUser = catchMyUserFb.data();
      let theTrolley = {
        idUser: idMyUsuer,
        emailUser: catchMyUser.email,
        carrito: [],
        data: timestamp,
      };
      const newTrolley = await this.db.collection(this.collection).add(theTrolley);
      const userModified = await this.db.collection("usuarios").doc(idMyUsuer).update({ idTrolley: newTrolley.id });
      if (userModified) {
        logger.log("info", `Se asigno un nuevo carrito`);
      }
      let dtaNew = await this.db.collection(this.collection).doc(newTrolley.id).get(); //me retorna el primer carrito que tenga el idUser
      return { _id: dtaNew.id };
    } catch (err) {
      logger.log("error", `errInCreateNewTrolleyFb${err}`);
    }
  };
  getAllTrolley = async (idTrolley) => {
    try {
      const datas = await this.db.collection(this.collection).where("id", "==", idTrolley).get();
      let arrayRes = datas.docs.map((item) => {
        return item.data();
      });
      return arrayRes;
    } catch (err) {
      logger.log("error", `errInGetsTroleyFB${err}`);
    }
  };
  pushAoneTrolley = async (idUser, catchProduct, cantToPUrch) => {
    try {
      const catchMyUserFb = await this.db.collection(this.collection).doc(idUser).get();
      const catchMyUser = catchMyUserFb.data();
      const actuallTrolley = catchMyUser.carrito;
      const acumuladorProductos = [];
      catchProduct.cantidad = cantToPUrch;
      acumuladorProductos.push(catchProduct, ...actuallTrolley);
      let agregar = await this.db.collection(this.collection).doc(idUser).update({ carrito: acumuladorProductos });
      if (agregar) {
        return { msge: "producto Correctamente afregado a carrito" };
      }
    } catch (err) {
      logger.log("error", `errInAddTroleyFB${err}`);
    }
  };
  actCantToPursch = async (idTrolley, idProduct, cantActualized) => {
    try {
      let myTrolley = await this.getAllTrolley(idTrolley);
      let arrItems;
      for (const el of myTrolley) {
        arrItems = el.carrito;
      }
      let indexProductoToMod = arrItems.findIndex((el) => el._id == idProduct);
      arrItems[indexProductoToMod].cantidad = cantActualized;
      let actualizedAmountItems = await this.db.collection(this.collection).doc(idTrolley).update({ carrito: arrItems });
      return { msge: "cantidad aumentada" };
    } catch (err) {
      logger.log("error", `errInTrolleyActCantfb${err}`);
    }
  };
  deleteOneItemByTrolley = async (idTrolley, carrito) => {
    try {
      const actT = await this.dataOneTrolley(idTrolley);
      const act = actT.carrito;
      let trolleyDelete = act.find((el) => el._id == carrito);
      act.splice(trolleyDelete, 1);
      let agregar = await this.db.collection(this.collection).doc(actT._id).update({ carrito: act });
      if (agregar) {
        return { msge: "producto eliminido de tu carrtio correctamente" };
      }
    } catch (err) {
      logger.log("error", `errInTroleyFB${err}`);
    }
  };
  dataOneUser = async (idUsuario) => {
    try {
      const datas = await this.db.collection("usuarios").where("id", "==", idUsuario).get();
      let arrayRes = datas.docs.map((item) => {
        return { _id: item.id, ...item.data() };
      });
      return arrayRes;
    } catch (err) {
      logger.log("error", `errInTrolleyFbDataOneUser${err}`);
    }
  };
  dataOneTrolley = async (idUsuario) => {
    try {
      const datas = await this.db.collection(this.collection).where("id", "==", idUsuario).get();
      let trolley;
      datas.docs.forEach((el) => {
        trolley = { _id: el.id, ...el.data() };
      });
      return trolley;
    } catch (err) {
      logger.log("error", `errInDataTroleyFB${err}`);
    }
  };

  static transformTheUser = async (forTrolley, forUser) => {
    try {
      if (forTrolley == null && forUser && typeof forUser === "string") {
        const datas = await this.db.collection("usuarios").doc(forUser).get();
        return datas.data();
      }
      if (forTrolley == null && forUser) {
        const user = await Users.findById(forUser);
        return user;
      } else {
        let use;
        const user = await Users.find({ idTrolley: forTrolley });
        for (const props of user) {
          use = props;
        }
        if (use === undefined) {
          const datas = await this.db.collection("usuarios").where("idTrolley", "==", forTrolley).get();
          let trolley;
          datas.docs.forEach((el) => {
            trolley = { ...el.data() };
          });
          return trolley;
        }
        return use;
      }
    } catch (err) {
      logger.log("error", `errInTroleyFBTransFormUser${err}`);
    }
  };
}

module.exports = ContainerCarritoFirebas;
