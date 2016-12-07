#!/usr/bin/env bash

rm -rf __tests__
rm -rf .git
zip -r -q ${LAMBDA_NAME}.zip .
aws s3 cp ${LAMBDA_NAME}.zip s3://${S3_BUCKET}
aws s3 cp swagger.json s3://${S3_BUCKET}/${LAMBDA_NAME}-swagger.json

if aws cloudformation describe-stacks | grep -q ${LAMBDA_NAME} ; then
  aws cloudformation update-stack --stack-name ${LAMBDA_NAME} --template-body file://./things/circleci/cloudformation.json --capabilities CAPABILITY_IAM --parameters file://./things/circleci/cloudformation-params.json
else
  aws cloudformation create-stack --stack-name ${LAMBDA_NAME} --template-body file://./things/circleci/cloudformation.json --capabilities CAPABILITY_IAM --parameters file://./things/circleci/cloudformation-params.json
fi

