const logger = require("../../utils/loggers");
const { Schema, model } = require("mongoose");
require("../../utils/databasConecctions/mongoose");

const ProductoSchema = new Schema({
  product: { type: String, required: true, max: 100 },
  typeOfLiquor: { type: String, required: true, max: 100 },
  price: { type: Number, required: true },
  image: { type: String, required: true, max: 100 },
  description: { type: String, required: true },
  stockItems: { type: Number, required: true },
  codeItem: { type: Number, required: true },
  data: Date,
  cantidad: { type: Number },
});
const Productos = model("inventario", ProductoSchema);

class ContainerProductMongo {
  constructor(collection) {
    this.collecton = collection;
  }
  saveNewProduct = async (product, timestamp) => {
    try {
      product.data = timestamp;
      const newProduct = new Productos(product);
      return await newProduct.save().then((data) => {
        return data;
      });
    } catch (err) {
      logger.log("error", `errIn sdaveNewProduct MongoDb${err}`);
      return { error: err };
    }
  };
  getProductByIdDb = async (idNumber) => {
    try {
      return await Productos.findById(idNumber);
    } catch (err) {
      logger.log("error", `errIn getProductById Mongodb${err}`);
      return { error: err };
    }
  };
  getAllitemsDb = async () => {
    try {
      const data = await Productos.find({});
      return data;
    } catch (err) {
      logger.log("error", `errIn getAllItemsDB Mongodb${err}`);
      return { error: err };
    }
  };
  deleteOneItemInventory = async (aBorrar) => {
    try {
      const deletedItem = await Productos.findByIdAndDelete(aBorrar);
      logger.log("info", "productoEliminado");
      return deletedItem;
    } catch (err) {
      logger.log("error", `errIn deleteOneItemInventory Mongo db${err}`);
    }
  };
  modifyOneElementInventory = async (buscar, body) => {
    try {
      const userModify = await Productos.findByIdAndUpdate(buscar.id, body, { new: true });
      return userModify;
    } catch (err) {
      logger.log("error", `errIn modifyOneElementInventory Mongodb${err}`);
    }
  };
}
module.exports = { ContainerProductMongo, Productos };
