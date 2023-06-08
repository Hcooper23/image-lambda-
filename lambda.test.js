const lambda = require('./index');

// Mock the S3 getObject function
jest.mock('aws-sdk', () => {
  return {
    S3: jest.fn(() => ({
      getObject: jest.fn((params) => {
        if (params.Key === 'valid-image.jpg') {
          return {
            promise: jest.fn().mockResolvedValue({
              Body: Buffer.from('image data'),
            }),
          };
        } else {
          throw new Error('Access Denied');
        }
      }),
    })),
  };
});

describe('image-lambda', () => {
  it('should return success response for a valid image', async () => {
    const event = {
      Records: [
        {
          s3: {
            object: {
              key: 'valid-image.jpg',
            },
          },
        },
      ],
    };

    const response = await lambda.handler(event);

    expect(response.statusCode).toBe(200);
    expect(response.body).toBe('Image processed successfully');
  });

  it('should return error response for an invalid image', async () => {
    const event = {
      Records: [
        {
          s3: {
            object: {
              key: 'invalid-image.jpg',
            },
          },
        },
      ],
    };

    const response = await lambda.handler(event);

    expect(response.statusCode).toBe(500);
    expect(response.body).toBe('Error processing image');
  });
});
