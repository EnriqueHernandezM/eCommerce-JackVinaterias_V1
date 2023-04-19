const logger = require("../loggers");

const mongoose = require("mongoose");
const environmentVars = require("../../config/config");

class DatabaseMongoose {
  static instance = null;

  constructor() {
    mongoose.set("strictQuery", false);
    mongoose
      .connect(environmentVars.mongoDb)
      .then(() => logger.log("info", "✅ DB ON"))
      .catch((e) => logger.log("error", ` ❌ DB OFF ${e}`));
  }

  static getInstance() {
    if (!DatabaseMongoose.instance) {
      DatabaseMongoose.instance = new DatabaseMongoose();
    }

    return DatabaseMongoose.instance;
  }
}

DatabaseMongoose.getInstance();
