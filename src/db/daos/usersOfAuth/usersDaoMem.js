const { ContainerUsersMem } = require("../../memory/users");

class UsersDaoMem extends ContainerUsersMem {
  constructor() {
    super();
  }
}
module.exports = UsersDaoMem;
