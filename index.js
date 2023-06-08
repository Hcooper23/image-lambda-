const AWS = require('aws-sdk');
const S3 = new AWS.S3();

exports.handler = async (event, context) => {
  try {
    const bucketName = event.Records[0].s3.bucket.name;
    const objectKey = decodeURIComponent(event.Records[0].s3.object.key.replace(/\+/g, ' '));

    const imagesJson = await downloadImagesJson(bucketName);
    const metadata = createImageMetadata(objectKey);
    const updatedImagesJson = updateImagesJson(imagesJson, metadata);
    
    await uploadImagesJson(bucketName, updatedImagesJson);

    return {
      statusCode: 200,
      body: 'Processing complete'
    };
  } catch (error) {
    console.error('Error:', error);
    return {
      statusCode: 500,
      body: 'Error processing image'
    };
  }
};

async function downloadImagesJson(bucketName) {
  try {
    const params = {
      Bucket: bucketName,
      Key: 'images.json'
    };
    const response = await S3.getObject(params).promise();
    return JSON.parse(response.Body.toString());
  } catch (error) {
    // Return an empty array if images.json does not exist
    return [];
  }
}

function createImageMetadata(objectKey) {
  const fileName = objectKey.split('/').pop();
  const fileSize = getFileSize(objectKey);
  const fileType = getFileType(fileName);

  return {
    name: fileName,
    size: fileSize,
    type: fileType
    // Add other metadata properties as needed
  };
}

function getFileSize(objectKey) {
  // Implement logic to fetch file size from S3 metadata or calculate it if needed
}

function getFileType(fileName) {
  // Implement logic to determine the file type based on the file name or content
}

function updateImagesJson(imagesJson, metadata) {
  const existingImageIndex = imagesJson.findIndex(image => image.name === metadata.name);
  
  if (existingImageIndex !== -1) {
    // Update existing image metadata
    imagesJson[existingImageIndex] = metadata;
  } else {
    // Add new image metadata
    imagesJson.push(metadata);
  }
  
  return imagesJson;
}

async function uploadImagesJson(bucketName, imagesJson) {
  const params = {
    Bucket: bucketName,
    Key: 'images.json',
    Body: JSON.stringify(imagesJson),
    ContentType: 'application/json'
  };
  
  await S3.putObject(params).promise();
}
