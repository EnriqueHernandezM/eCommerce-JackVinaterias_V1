const { config } = require("dotenv");
config();

let environmentVars = {
  PORT: process.env.PORT,
  mongoDb: process.env.DATA_BASS,
  sessionSecret: process.env.SESSION_SECRET,
  correoServiceMe: process.env.CORREO_SERVICE_ME,
  correoServiceMePass: process.env.CORREO_SERVICE_ME_PASS,
  acountSid: process.env.ACOUNT_SID,
  authToken: process.env.AUTH_TOKEN,
  cluster: process.env.CLUSTER,
  typeInRes: process.argv[4] || "",
  awsRegionBucket: process.env.AWS_REGION_BUCKET,
  awsNameBucket: process.env.AWS_NAME_BUCKET,
  accesKeyId: process.env.ACCES_KEY_ID,
  accesKeySecret: process.env.ACCES_KEY_SECRET,
  adminActive: process.env.ADMIN,
};

module.exports = environmentVars;
