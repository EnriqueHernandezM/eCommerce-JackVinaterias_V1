const { config } = require("dotenv");
config();

let environmentVars = {
  mongoDb: process.env.DATA_BASS,
  sessionSecret: process.env.SESSION_SECRET,
  correoServiceMe: process.env.CORREO_SERVICE_ME,
  correoServiceMePass: process.env.CORREO_SERVICE_ME_PASS,
  acountSid: process.env.ACOUNT_SID,
  authToken: process.env.AUTH_TOKEN,
  cluster: process.env.CLUSTER,
  typeInRes: process.argv[4] || "",
  PORT: process.env.PORT,
};

module.exports = environmentVars;
