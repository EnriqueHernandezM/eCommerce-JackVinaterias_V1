const { S3Client, PutObjectComand } = require("@aws-sdk/client-s3");
const environmentVars = require("../config/config");
const fs = require("fs");
const region = environmentVars.awsRegionBucket;
const accesKeyId = environmentVars.accesKeyId;
const secretAccesKey = environmentVars.accesKeySecret;
const nameOfBucket = environmentVars.awsNameBucket;
const storage = new S3Client({
  region,
  credentials: {
    accesKeyId,
    secretAccesKey,
  },
});
const getFileUrl = async (name) => {
  const url = `https://${nameOfBucket}.s3.${region}.amazonaws.com/${name}`;
  return url;
};
const uploadFile = async (file) => {
  const stream = fs.createReadStream(file.tempFilePath);
  const params = {
    Bucket: nameOfBucket,
    Key: file.name,
    Body: stream,
  };
  const comand = new PutObjectComand(params);
  await storage.send(comand);
  const resWithUrl = await getFileUrl(nameOfBucket, file.name);
  return resWithUrl;
};

module.exports = uploadFile;
