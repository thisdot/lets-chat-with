const { getS3Client } = require('../../utils/aws-s3-client.js');

exports.handler = async (event, context) => {
  const { arguments } = event;
  const { fileName, bucketFolder, base64 } = arguments;
  const { S3_BUCKET_NAME } = process.env;

  try {
    const { type, data } = decodeBase64(base64);
    return await uploadFileToS3(S3_BUCKET_NAME, bucketFolder, fileName, data, type);
  } catch (error) {
    console.error(error);
    context.fail('There was an error processing your image.');
  }
};

async function uploadFileToS3(S3_BUCKET_NAME, bucketFolder, fileName, data, type) {
  const params = {
    Bucket: S3_BUCKET_NAME,
    Key: `${bucketFolder}/${fileName}`,
    Body: data,
    ContentEncoding: 'base64',
    ContentType: type,
  };

  const s3 = getS3Client();

  const { Location } = await s3.upload(params).promise();
  return Location;
}

function decodeBase64(base64) {
  var matches = base64.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);

  if (matches.length !== 3) {
    throw new Error('Invalid base64 string format');
  }

  const type = matches[1];
  const data = new Buffer.from(matches[2], 'base64');

  return { type, data };
}
