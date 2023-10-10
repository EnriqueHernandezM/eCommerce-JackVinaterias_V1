const logger = require("../../utils/loggers");
const { getFirestore } = require("firebase-admin/firestore");
class ContainerUsersFirebas {
  constructor(collection) {
    this.collection = collection;
    this.db = getFirestore();
  }
  getOneUserForEmailDb = async (email) => {
    try {
      const datas = await this.db.collection(this.collection).where("email", "==", email).limit(1).get();
      const oneUser = datas.docs.map((el) => {
        return { _id: el.id, ...el.data() };
      });
      return oneUser[0] || null;
    } catch (err) {
      throw err;
    }
  };
  getOneUserForIdDb = async (id) => {
    try {
      const datas = await this.db.collection(this.collection).doc(id).get();
      return { _id: datas.id, ...datas.data() };
    } catch (err) {
      throw err;
    }
  };
  createNewUserDb = async (addUser) => {
    try {
      await this.db.collection(this.collection).doc().set(addUser);
      return await this.getOneUserForEmailDb(addUser.email);
    } catch (err) {
      throw err;
    }
  };
}
module.exports = ContainerUsersFirebas;
