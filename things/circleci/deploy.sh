#!/usr/bin/env bash

rm -rf __tests__
rm -rf .git
zip -r -q ${LAMBDA_NAME}.zip .
aws s3 cp ${LAMBDA_NAME}.zip s3://${S3_BUCKET}
aws s3 cp swagger.json s3://${S3_BUCKET}/${LAMBDA_NAME}-swagger.json

if aws cloudformation describe-stacks | grep -q ${LAMBDA_NAME} ; then
  aws cloudformation update-stack --stack-name ${LAMBDA_NAME} --template-body file://./cloudformation.json --capabilities CAPABILITY_IAM --parameters ParameterKey=S3Bucket,ParameterValue=$S3_BUCKET,ParameterKey=SwaggerS3Key,ParameterValue=${LAMBDA_NAME}-swagger.json,ParameterKey=LambdaFunctionS3Key,ParameterValue=${LAMBDA_NAME}.zip
else
  aws cloudformation create-stack --stack-name ${LAMBDA_NAME} --template-body file://./cloudformation.json --capabilities CAPABILITY_IAM --parameters ParameterKey=S3Bucket,ParameterValue=$S3_BUCKET,ParameterKey=SwaggerS3Key,ParameterValue=${LAMBDA_NAME}-swagger.json,ParameterKey=LambdaFunctionS3Key,ParameterValue=${LAMBDA_NAME}.zip
fi

