const { DaoUsers } = require("../db/daos/indexDaos");
const Joi = require("joi");
const uploadFile = require("../utils/s3");
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
      const chartertsNotAcept = /[$&<>%!`?{}]/;
      if (!+newUser.edad || !+newUser.telefono || chartertsNotAcept.test(newUser.nombre) || chartertsNotAcept.test(newUser.direccion)) {
        return funcRes(new Error("Date invalid"), null);
      }

      const resImg = ContainerAuthentication.validateImg(newUser.avatar.avatar || newUser.avatar);
      if (resImg) {
        const newImageUrlToS3 = await uploadFile(newUser.avatar.avatar);
        newUser.avatar = newImageUrlToS3;
      }
      ContainerAuthentication.checkPropsUser(newUser);
      const userAddOk = await DaoUsers.createNewUserDb(newUser);
      if (userAddOk) {
        return funcRes(null, userAddOk);
      }
    } catch (err) {
      throw err;
    }
  }
  static checkPropsUser(propsUser) {
    try {
      ContainerAuthentication.validar(propsUser);
    } catch (err) {
      throw err;
    }
  }
  static validar(propsUserToCheck) {
    const CreateProductsSchema = Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().required(),
      nombre: Joi.string().required(),
      edad: Joi.string().max(3).required(),
      direccion: Joi.string().max(40).required(),
      telefono: Joi.string().max(13).required(),
      avatar: Joi.string().required(),
      idTrolley: Joi.string().required(),
    });
    const { error } = CreateProductsSchema.validate(propsUserToCheck);
    if (error) {
      throw error;
    }
  }
  static validateImg(img) {
    switch (typeof img) {
      case "object":
        if (!img.name.endsWith(".png") && !img.name.endsWith(".jpg") && !img.name.endsWith(".jpeg")) {
          throw new Error("only png,jpg,jpeg");
        }
        if (img.size > 2000000) {
          throw new Error("an image has exceeded the weight");
        }
        return true;
      case "string":
        if (!img.endsWith(".png") && !img.endsWith(".jpg") && !img.endsWith(".jpeg")) {
          throw new Error("only png,jpg,jpeg");
        }
        return false;
    }
  }
}
module.exports = ContainerAuthentication;
