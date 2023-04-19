const logger = require("../../utils/loggers");
const { Usuarios } = require("../mongoose/usuarios");
const { Schema, model } = require("mongoose");
const TrolleySchema = new Schema({
  idUser: { type: String },
  emailUser: { type: String, required: true, max: 100 },
  carrito: { type: Array },
  data: { type: Date, default: Date.now },
});
const Trolley = model("carritosCompras", TrolleySchema);

class ContainerCarritoMongo {
  constructor(collection) {
    this.collection = collection;
  }

  createOneNewTrolley = async (idMyUsuer) => {
    try {
      const catchMyUser = await Usuarios.findById(idMyUsuer); //recibo el id Usuario
      let theTrolley = {
        idUser: idMyUsuer,
        emailUser: catchMyUser.email,
        carrito: [],
      };
      const newTrolley = new Trolley(theTrolley);
      return await newTrolley.save().then(async (data) => {
        await Usuarios.updateOne(
          { _id: idMyUsuer },
          {
            $set: {
              idTrolley: data._id,
            },
          }
        );
        logger.log("info", `Se asigno un nuevo carrito`);
        return await Trolley.find({ _id: data._id }); //me retorna el primer carrito que tenga el idUser
      });
    } catch (err) {
      logger.log("error", `errIncarritoMongoose${err}`);
    }
  };
  getAllTrolley = async (idTrolley) => {
    try {
      //LE ESTAMOS BUSCANDO POR id de carrito que en ususario viene como idTrolley
      const datas = await Trolley.find({ _id: idTrolley });
      return datas;
    } catch (err) {
      logger.log("error", `errInTrolleyMdb${err}`);
    }
  };
  pushAoneTrolley = async (idTrolley, catchProduct, cantidadTopurch) => {
    try {
      catchProduct.cantidad = cantidadTopurch;
      const agregarItem = await Trolley.updateOne(
        { _id: idTrolley },
        {
          $push: {
            carrito: catchProduct,
          },
        }
      );
      if (agregarItem.modifiedCount >= 1) {
        return { msge: "producto Correctamente afregado a carrito" };
      } else {
        return { msge: "Hubo un problema al agregar el producto" };
      }
    } catch (err) {
      logger.log("error", `errInTrolleyMdb${err}`);
    }
  };
  deleteOneItemByTrolley = async (idTrolley, carritoR) => {
    try {
      const agregarItem = await Trolley.updateOne(
        { _id: idTrolley },
        {
          $set: {
            carrito: carritoR,
          },
        }
      );
      if (agregarItem.modifiedCount == 1) {
        return { msge: "producto eliminido de tu carrtio correctamente" };
      } else {
        return { msge: "ocurrio algu problema" };
      }
    } catch (err) {
      logger.log("error", `errInTrolleyMdb${err}`);
    }
  };
  dataOneUser = async (idUsuario) => {
    try {
      return await Usuarios.find({ _id: idUsuario });
    } catch (err) {
      logger.log("error", `errInTrolleyMdb${err}`);
    }
  };
  dataOneTrolley = async (idUsuario) => {
    try {
      return await Trolley.find({ _id: idUsuario });
    } catch (err) {
      logger.log("error", `errInTrolleyMdb${err}`);
    }
  };
}

module.exports = { ContainerCarritoMongo, Trolley };
