const logger = require("../loggers");
const serviceAccount = require("../../../privi.json");
const admin = require("firebase-admin");

class DatabaseFirebas {
  static instance = null;
  constructor() {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });
    logger.log("info", "✅ DB firebass on!");
  }
  static async getInstance() {
    if (!DatabaseFirebas.instance) {
      DatabaseFirebas.instance = new DatabaseFirebas();
    }
    return DatabaseFirebas.instance;
  }
}
DatabaseFirebas.getInstance();
