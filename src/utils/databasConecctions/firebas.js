const logger = require("../loggers");
const admin = require("firebase-admin");
const serviceAccount = require("../../../privi.json");

class DatabaseFirebas {
  static instance = null;
  constructor() {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });
    logger.log("info", "✅ DB firebass on!");
  }
  static getInstance() {
    if (!DatabaseFirebas.instance) {
      DatabaseFirebas.instance = new DatabaseFirebas();
    }
    return DatabaseFirebas.instance;
  }
}
DatabaseFirebas.getInstance();
