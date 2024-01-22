require("dotenv").config();
const AwsAccessKeyId = process.env.AWS_ACCESS_KEY_ID;
const AwsSecretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;
const AwsRegion = process.env.AWS_REGION;

const { S3Client } = require("@aws-sdk/client-s3");
const s3 = new S3Client({
  credentials: {
    accessKeyId: AwsAccessKeyId,
    secretAccessKey: AwsSecretAccessKey,
  },
  region: AwsRegion,
});

module.exports = s3;
