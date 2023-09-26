const logger = require("../../utils/loggers");
const moment = require("moment");
const timestamp = moment().format("lll");
let inventarios = [
  {
    _id: 1,
    product: "Don Pedro",
    typeOfLiquor: "Brandy",
    price: 350,
    image: "https://cdn.shopify.com/s/files/1/0402/2475/1766/products/BRANDYDONPEDRO1000MLSHOPIFY_700x.jpg?v=1637864473",
    description: "Brandy Don Pedro Reserva Especial 750 ml a un súper precio",
    stockItems: 9,
    codeItem: 111,
    data: "2023-03-03T09:35:13.475Z",
  },
  {
    _id: 2,
    product: "Moet Chandom",
    typeOfLiquor: "Champagne",
    price: 980,
    image: "https://www.sampieri.com.mx/wp-content/uploads/2018/07/CHAMPAGNE-MOET-CHANDON-BRUT-EST-MADERA.jpg",
    description:
      "Fundada en 1743, Moët & Chandon celebra los momentos memorables de la vida con una gama de champagnes únicos para cada ocasión.",
    stockItems: 4,
    codeItem: 122,
    data: "2023-03-03T09:36:30.012Z",
  },
  {
    _id: 3,
    product: "Nuvo",
    typeOfLiquor: "Vodka",
    price: 820,
    image: "https://ss388.liverpool.com.mx/xl/1064210455.jpg",
    description: "Nuvo es una bebida innovadora que mezcla vodka premium con vinos franceses",
    stockItems: 5,
    codeItem: 144,
    data: "2023-03-03T09:40:16.268Z",
  },
];

class ContainerProductMem {
  constructor() {}
  saveNewProduct = (product) => {
    try {
      let all = this.getAllitemsDb();
      let _id = 1;
      let data = timestamp;
      all.length > 0 &&
        all.forEach((el) => {
          _id = el._id + 1;
        });
      product.data = data;
      product._id = _id;
      all.push(product);
      return product;
    } catch (err) {
      logger.log("error", `Error en saveNewProduct memor${err}`);
    }
  };
  getProductByIdDb = (number) => {
    try {
      const oneItem = inventarios.find((el) => el._id == number);
      if (oneItem) {
        return oneItem;
      } else {
        return;
      }
    } catch (error) {
      logger.log("error", `Error en getProductById memory${err}`);
    }
  };
  getAllitemsDb = () => {
    try {
      return inventarios;
    } catch (err) {
      logger.log("error", ` Error en getAlItems memory${err}`);
    }
  };
  deleteOneItemInventory = (aBorrar) => {
    try {
      const datas = this.getAllitemsDb();
      let searchToDelete = datas.findIndex((el) => el._id == aBorrar);
      if (searchToDelete >= 0) {
        datas.splice(searchToDelete, 1);
        for (const prop of datas) {
          return { _id: prop._id };
        }
      }
      if (searchToDelete == -1) {
        return { err: true, msg: "producto a eliminar no existe" };
      }
    } catch (err) {
      logger.log("error", `Error in deleteOneElementInventary memory${err}`);
    }
  };
  modifyOneElementInventory = (id, body) => {
    try {
      let all = this.getAllitemsDb();
      let product = all.findIndex((el) => el._id == id._id);
      if (product <= -1) {
        return { error: "true", mesage: "producto a modificar no existe" };
      }
      let data = all[product].data;
      let _id = parseInt(id._id);
      if (product >= 0) {
        let newProduct = { ...body, data, _id };
        all[product] = newProduct;
        return newProduct;
      }
    } catch (err) {
      logger.log("error", `Error in modifyElementInventary memory${err}`);
    }
  };
}

module.exports = { ContainerProductMem };
