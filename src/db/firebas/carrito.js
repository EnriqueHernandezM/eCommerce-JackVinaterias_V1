const logger = require("../../utils/loggers");
const { Usuarios } = require("../mongoose/usuarios");
const { getFirestore } = require("firebase-admin/firestore");
const db = getFirestore();
const moment = require("moment");
const timestamp = moment().format("lll");
class ContainerCarritoFirebas {
  constructor(collection) {
    this.collection = collection;
  }
  //recibo el idDe Usuario
  createOneNewTrolley = async (idMyUsuer) => {
    try {
      const catchMyUserFb = await db.collection("usuarios").doc(idMyUsuer).get();
      const catchMyUser = catchMyUserFb.data();
      let theTrolley = {
        idUser: idMyUsuer,
        emailUser: catchMyUser.email,
        carrito: [],
        data: timestamp,
      };
      const newTrolley = await db.collection(this.collection).add(theTrolley);
      const userModified = await db.collection("usuarios").doc(idMyUsuer).update({ idTrolley: newTrolley.id });
      if (userModified) {
        logger.log("info", `Se asigno un nuevo carrito`);
      }
      let dtaNew = await db.collection(this.collection).doc(newTrolley.id).get(); //me retorna el primer carrito que tenga el idUser
      return { _id: dtaNew.id };
    } catch (err) {
      logger.log("error", `errInCreateNewTrolleyFb${err}`);
    }
  };
  getAllTrolley = async (idTrolley) => {
    try {
      //llamamos esta funcion para transformar el id a email y trababjar con el
      const userThisDb = await ContainerCarritoFirebas.transformTheUser(idTrolley);
      const datas = await db.collection(this.collection).where("emailUser", "==", userThisDb.email).get();
      let arrayRes = datas.docs.map((item) => {
        return item.data();
      });
      return arrayRes;
    } catch (err) {
      logger.log("error", `errInTroleyFB${err}`);
    }
  };
  pushAoneTrolley = async (idUser, catchProduct, cantToPUrch) => {
    try {
      const catchMyUserFb = await db.collection(this.collection).doc(idUser).get();
      const catchMyUser = catchMyUserFb.data();
      const Act = catchMyUser.carrito;
      const acumuladorProductos = [];
      catchProduct.cantidad = cantToPUrch;
      acumuladorProductos.push(catchProduct, ...Act);
      let agregar = await db.collection(this.collection).doc(idUser).update({ carrito: acumuladorProductos });
      if (agregar) {
        return { msge: "producto Correctamente afregado a carrito" };
      }
    } catch (err) {
      logger.log("error", `errInTroleyFB${err}`);
    }
  };
  deleteOneItemByTrolley = async (idTrolley, carrito) => {
    try {
      const actT = await this.dataOneTrolley(idTrolley);
      const act = actT.carrito;
      let trolleyDelete = act.find((el) => el._id == carrito);
      act.splice(trolleyDelete, 1);
      let agregar = await db.collection(this.collection).doc(actT._id).update({ carrito: act });
      if (agregar) {
        return { msge: "producto eliminido de tu carrtio correctamente" };
      }
    } catch (err) {
      logger.log("error", `errInTroleyFB${err}`);
    }
  };
  dataOneUser = async (idUsuario) => {
    try {
      //al llamar la funcion de esta manera obtenemos informacion del ususario
      const userThisDb = await ContainerCarritoFirebas.transformTheUser(null, idUsuario);
      const datas = await db.collection("usuarios").where("email", "==", userThisDb.email).get();
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
      const userThisDb = await this.transformTheUser(idUsuario);
      const datas = await db.collection(this.collection).where("emailUser", "==", userThisDb.email).get();
      let trolley;
      datas.docs.forEach((el) => {
        trolley = { _id: el.id, ...el.data() };
      });
      return trolley;
    } catch (err) {
      logger.log("error", `errInTroleyFB${err}`);
    }
  };
  /* Ya que solo pudimos usar passport con MD desde el controlador nos manda el id user de mongo
  aqui se recibe u manda la informacion de usuario para poder usarla con en firebas con el correo
  que de igual manera no se puede repetir */
  static transformTheUser = async (forTrolley, forUser) => {
    try {
      if (forTrolley == null && forUser && typeof forUser === "string") {
        const datas = await db.collection("usuarios").doc(forUser).get();
        return datas.data();
      }
      if (forTrolley == null && forUser) {
        const user = await Usuarios.findById(forUser);
        return user;
      } else {
        const user = await Usuarios.find({ idTrolley: forTrolley });
        for (const props of user) {
          return props;
        }
      }
    } catch (err) {
      logger.log("error", `errInTroleyFBTransFormUser${err}`);
    }
  };
}

module.exports = ContainerCarritoFirebas;
