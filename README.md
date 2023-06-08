# Project: Image Lambda

## Author: Hayden Cooper

## Problem Domain

- Create an S3 Bucket with “open” read permissions, so that anyone can see the images/files in their browser.

- A user should be able to upload an image at any size, and update a dictionary of all images that have been uploaded so far.

- When an image is uploaded to your S3 bucket, it should trigger a Lambda function which must:

- Download a file called “images.json” from the S3 Bucket if it exists.

- The images.json should be an array of objects, each representing an image. Create an empty array if this file is not present.

- Create a metadata object describing the image.
  - Name, Size, Type, etc.

- Append the data for this image to the array.
  - Note: If the image is a duplicate name, update the object in the array, don’t just add it.

- Upload the images.json file back to the S3 bucket.

## Links and Resources

- [GitHub Actions ci/cd](https://s3.console.aws.amazon.com/s3/buckets?region=us-east-2&region=us-east-2)
- [back-end dev server url](https://us-east-2.console.aws.amazon.com/lambda/home?region=us-east-2#/discover)

## Collaborators

Ryan Gallaway/ seat401d53/ chatgpt

## Setup ///

## `.env` requirements (where applicable)

node version "v19.6.1"

## How to initialize/run your application (where applicable)

1. Create an S3 Bucket:

- Go to the AWS S3 console.
- Create a new S3 bucket and make sure to set the bucket permissions to allow "open" read permissions so that anyone can see the images/files in their browser.

2. Create the Lambda Function:

- Go to the AWS Lambda console.
- Click on "Create function" to create a new Lambda function.
- Provide a name for your function (e.g., "ImageProcessingLambda").
- Choose the runtime as Node.js (or any other runtime you prefer).
- Click on "Create function" to create the Lambda function.

3. Configure the Lambda Trigger:

- In the "Designer" section of your Lambda function, click on "Add trigger".
- Select "S3" from the trigger options.
- Configure the trigger to watch the S3 bucket you created in Step 1.
- Specify the event types as "ObjectCreated" to trigger the Lambda function when an image file is uploaded.
- Set the appropriate filters (e.g., .jpg, .png) to ensure the Lambda function is triggered only for image files.
- Click on "Add" to add the trigger.

4. Implement the Lambda Function:

- In your local development environment, create a new directory for your Lambda function.
- Create an index.js file within the directory.
- Copy the code provided in the previous response for the Lambda function and paste it into the index.js file.
- Save the file.

5. Package and Deploy the Lambda Function:

- In your terminal or command prompt, navigate to the directory where your Lambda function code is located.
- Run the command npm init to initialize a new package.json file. Follow the prompts to set up the package details.
- Run the command npm install aws-sdk to install the AWS SDK dependency.
Zip the index.js file and the node_modules directory together.
- Go back to the AWS Lambda console and open your Lambda function.
- In the "Function code" section, select "Upload a .zip file" as the code entry type.
- Upload the zip file containing your Lambda function code.
- Set the "Handler" field to index.handler.
- Click on "Save" to deploy the Lambda function.

5. Test the Lambda Function:

- Upload an image file to the S3 bucket you created.
- Monitor the CloudWatch logs for your Lambda function to see the output and any errors encountered during the processing.

## Routes

- Npm Test and install npm Jest if no test runs

## Tests

to run tests, after running `npm i`, run the command `npm test`

## UML

![UML image](./Screenshot%202023-06-07%20at%209.54.06%20PM.png)

//////////////////////////////////////////////////////
