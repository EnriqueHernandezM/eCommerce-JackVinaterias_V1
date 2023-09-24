const ContainerUsersFirebas = require("../../firebas/users");

class UsersDaoFirebas extends ContainerUsersFirebas {
  constructor() {
    super("usuarios");
  }
}
module.exports = UsersDaoFirebas;
