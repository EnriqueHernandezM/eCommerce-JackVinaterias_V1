const { config } = require("dotenv");
config();

let environmentVars = {
  mongoDb: process.env.DATABAS,
  sessionSecret: process.env.SESSIONSECRET,
  correoServiceMe: process.env.CORREOSERVICEME,
  correoServiceMePass: process.env.CORREOSERVICEMEPASS,
  acountSid: process.env.ACOUNTSID,
  authToken: process.env.AUTHTOKEN,
  cluster: process.env.CLUSTER,
  typeInRes: process.argv[4] || "",
  PORT: process.env.PORT,
};

module.exports = environmentVars;
