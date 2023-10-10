const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");
const environmentVars = require("../config/config");
const fs = require("fs");
const region = environmentVars.awsRegionBucket;
const accessKeyId = environmentVars.accesKeyId;
const secretAccessKey = environmentVars.accesKeySecret;
const nameOfBucket = environmentVars.awsNameBucket;

const storage = new S3Client({
  region,
  credentials: {
    accessKeyId,
    secretAccessKey,
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
  const comand = new PutObjectCommand(params);

  await storage.send(comand);
  const resWithUrl = await getFileUrl(file.name);
  return resWithUrl;
};

module.exports = uploadFile;
