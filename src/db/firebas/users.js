const admin = require("firebase-admin");

class ContainerUsersFirebas {
  constructor(collection) {
    this.collection = collection;
  }

  getOneUserForId = async (id, done) => {
    const datas = await db.collection(this.collection).doc(id, done).get();
    return datas.data();
  };
}
module.exports = ContainerUsersFirebas;
