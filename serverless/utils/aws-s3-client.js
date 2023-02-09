var AWS = require('aws-sdk');

let s3Client;
let dynamodbClient;

const isLocal = process.env.IS_OFFLINE;

const getS3Client = () => {
  if (s3Client) return s3Client;

  try {
    if (isLocal) {
      s3Client = new AWS.S3({
        s3ForcePathStyle: true,
        endpoint: new AWS.Endpoint('http://localhost:8001'),
        accessKeyId: 'S3RVER', // This specific key is required when working offline
        secretAccessKey: 'S3RVER', // This specific key is required when working offline
      });
    } else {
      s3Client = new AWS.S3();
    }

    return s3Client;
  } catch (err) {
    console.error({ err }, 'Failed to create S3 client!');
    throw err;
  }
};

const documentClient = () => {
  if (dynamodbClient) return dynamodbClient;

  if (isLocal) {
    dynamodbClient = new AWS.DynamoDB.DocumentClient({
      endpoint: 'http://localhost:8000',
      accessKeyId: 'S3RVER', // This specific key is required when working offline
      secretAccessKey: 'S3RVER', // This specific key is required when working offline
    });
  } else {
    dynamodbClient = dynamodbClient = new AWS.DynamoDB.DocumentClient();
  }

  return dynamodbClient;
};

module.exports = { getS3Client, isLocal, documentClient };
