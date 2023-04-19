const admin = require("firebase-admin");

class ContainerUsuariosFirebas {
  constructor(collection) {
    this.collection = collection;
  }
  /////////////////////////////////////////////////Funcion Para Dezerializer
  getOneUserForId = async (id, done) => {
    const datas = await db.collection(this.collection).doc(id, done).get();
    return datas.data();
  };
}
module.exports = ContainerUsuariosFirebas;
