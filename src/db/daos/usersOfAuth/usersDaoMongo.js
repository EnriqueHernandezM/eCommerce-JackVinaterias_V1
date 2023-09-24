const { ContainerUsersMongo } = require("../../mongoose/users");

class UsersDaoMongo extends ContainerUsersMongo {
  constructor() {
    super("Usuarios");
  }
}
module.exports = UsersDaoMongo;
