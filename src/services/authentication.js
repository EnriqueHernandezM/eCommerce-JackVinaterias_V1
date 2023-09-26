const { DaoUsers } = require("../db/daos/indexDaos");

class ContainerAuthentication {
  constructor() {}

  async getInfoUser(email, funcGetUser) {
    try {
      const resUser = await DaoUsers.getOneUserForEmailDb(email);

      if (resUser && resUser.email === email) {
        funcGetUser(null, resUser);
      } else {
        funcGetUser(null, false);
      }
    } catch (err) {
      throw err;
    }
  }
  async getUserToDeserialize(id, done) {
    try {
      const resUserById = await DaoUsers.getOneUserForIdDb(id);
      if (resUserById._id == id) {
        done(null, resUserById);
      } else {
        done(null, false);
      }
    } catch (err) {
      throw err;
    }
  }
  async createNewUser(newUser, funcRes) {
    try {
      const userAddOk = await DaoUsers.createNewUserDb(newUser);
      if (userAddOk) {
        funcRes(null, userAddOk);
      }
    } catch (err) {
      throw err;
    }
  }
}
module.exports = ContainerAuthentication;
