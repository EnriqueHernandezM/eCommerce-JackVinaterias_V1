const environmentVars = require("../config/config");
const logger = require("../utils/loggers");
const twilio = require("twilio");
const accountSid = environmentVars.acountSid;
const authToken = environmentVars.authToken;
const { DaoTrolleys, DaoProducts, DaoOrders } = require("../db/daos/indexDaos");
const client = twilio(accountSid, authToken);
const enviarcorreo = require("../utils/nodemailer");

class ContainerTrolley {
  constructor() {}
  async getAllToTrolley(idTrolley) {
    try {
      const allTrolley = await DaoTrolleys.getAllTrolley(idTrolley);
      return allTrolley;
    } catch (err) {
      logger.log("error", `ErrorEnGetAllTrolleyNegocio${err}`);
    }
  }
  async addToCart(idUser, idProducto, cantToPUrch) {
    try {
      const msgeMayoreo = {
        msge: `para compras mayores a 12 pz comuniquese a nuestro chat para ser contactado`,
      };
      cantToPUrch == 0 && (cantToPUrch = 1);
      if (cantToPUrch > 12) return msgeMayoreo; //si la cantidad a comprar es menor a 0 o mayor a 12
      const catchProduct = await this.getByIdProductos(idProducto); //traemos el producto

      if (!catchProduct || catchProduct.error) {
        return { msge: "no existe un producto con ese id" };
      }
      let catchUser = await ContainerTrolley.infoUser(idUser); //primer usuario con id iterado
      let trolleyUsed; //al crear un usuar idTrolley vale
      if (catchUser.idTrolley === "f") {
        //creamos un carrito el parametro sera el id del usuario
        const createNewtrolley = await DaoTrolleys.createOneNewTrolley(catchUser._id);
        for (const trolley of createNewtrolley) {
          //iteramos y asignamos ah let el id del carrito generado
          trolleyUsed = trolley._id;
        }
      }
      //si catchUser.idTrolley ya tiene asignado manda
      const idToTrolley = trolleyUsed || catchUser.idTrolley;
      const agregarItem = await DaoTrolleys.pushAoneTrolley(idToTrolley, catchProduct, cantToPUrch);
      return agregarItem;
    } catch (err) {
      logger.log("error", `ErrorEnAddToCartNegocio${err}`);
    }
  }
  async deleteByIdAllTrolleyItem(idTrolley, idItem) {
    try {
      let catchCart = await this.infoTrolley(idTrolley);
      const carritoI = catchCart.carrito;
      if (carritoI.length == 0) {
        return { msge: "tu carrito esta vacio" };
      }
      let catchCartIndex = carritoI.findIndex((el) => el._id == idItem);
      if (catchCartIndex < 0) {
        return { msge: "producto no existente en tu carrito" };
      }
      let x = carritoI.splice(catchCartIndex, 1);
      const deleteItem = await DaoTrolleys.deleteOneItemByTrolley(idTrolley, carritoI);
      return deleteItem;
    } catch (err) {
      logger.log("error", `Error en deletElementTrolleyNegocio${err}`);
    }
  }
  async buyTrolley(dataCarrito) {
    try {
      const userCreator = await ContainerTrolley.infoUser(dataCarrito.idUser);
      if (dataCarrito.carrito.length == 0) {
        return { msge: "aun no hay productos en tu carrito" };
      }
      let order = [];
      dataCarrito.carrito.forEach((el) => {
        order.push({ _id: el._id, product: el.product, cantidad: el.cantidad, price: el.price, codeItem: el.codeItem, image: el.image });
      }); //mandamos a la persstencia de ordenes
      let totalCantidad = order.reduce((acc, el) => acc + el.cantidad, 0);
      const confirmationTheBuy = await DaoOrders.sendNewBuy(order, userCreator, totalCantidad);
      if (confirmationTheBuy.state == "creado") {
        DaoTrolleys.createOneNewTrolley(confirmationTheBuy.idCustomer);
      }
      //await this.enviarMsg(dataCarrito, pedido);
      //this.enviarWats(dataCarrito.nombre);
      const mailOptionsConfirm = {
        from: `Servidor Node. JackVinaterias`,
        to: environmentVars.correoServiceMe,
        subject: `Nuevo Pedido de ${userCreator.nombre}`,
        html: `<div>
         <h1 style="color: black;">Hola has recibido un nuevo pedido</h1>
          <h1 style="color: blue;">Email Usuario <span style="color: green;">${userCreator.email}</span></h1>
            <h1 style="color: blue;"> telefono Contacto<span style="color: green;">${userCreator.telefono}</span></h1>
            <h1 style="color: blue;">Direccion <span style="color: green;">${userCreator.direccion}</span></h1>
        </div>
        `,
      };
      enviarcorreo(mailOptionsConfirm);
      return confirmationTheBuy;
    } catch (err) {
      logger.log("error", `${err}`);
    }
  }
  async getByIdProductos(number) {
    try {
      const data = await DaoProducts.getProductByIdDb(number);
      return data;
    } catch (err) {
      logger.log("error", `${err}`);
    }
  }
  async infoTrolley(idUsuario) {
    try {
      if (idUsuario == "f") {
        return { carrito: [] };
      } else {
        const dataCarrito = await DaoTrolleys.getAllTrolley(idUsuario);
        for (const data of dataCarrito) {
          return data;
        }
      }
    } catch (err) {
      logger.log("error", `ErrorEnCapaNegocioCarritoInfoTrolley${err}`);
    }
  }
  static infoUser = async (idUsuario) => {
    try {
      const dataCarrito = await DaoTrolleys.dataOneUser(idUsuario);
      for (const data of dataCarrito) {
        return data;
      }
    } catch (err) {
      logger.log("error", `ErrorEnInfoUserNegocio${err}`);
    }
  };
  //AQUI hacemos el envio de mensaje de texto queda suspendido vence muy rapido la prueba
  static enviarWats(usuarioQueCompro) {
    try {
      client.messages
        .create({
          body: `has recibido un nuevo pedido de ${usuarioQueCompro}`,
          from: "whatsapp:+14155238886",
          to: "whatsapp:+5215613507622",
        })
        .then((message) => logger.log("info", `${message.sid}`));
    } catch (err) {
      logger.log("error", `${err}`);
    }
  }
  static enviarMsg = async (usuarioAenviar, pedido) => {
    try {
      let pedidoString = pedido.toString();
      if (usuarioAenviar.telefono == "5613507622" || usuarioAenviar.telefono == "5548375096") {
        const message = await client.messages.create({
          body: `Hola tu pedido a sido recibido. Tus produtos son: ${pedidoString}`,
          from: "+13464838665",
          to: "+52" + usuarioAenviar.telefono,
        });
        logger.log("info", `${message}`);
      } else {
        logger.log("warn", "En el modo pruba de twilio solo se pueden usarn numeros registrados");
      }
    } catch (err) {
      logger.log("error", `${err}`);
    }
  };
}
module.exports = { ContainerTrolley };
