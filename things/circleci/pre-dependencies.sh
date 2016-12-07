#!/usr/bin/env bash

TEMPLATE='{
  "aws": {
    "iam": {
      "key": "%s",
      "secret": "%s"
    }
  },

  "database": {
    "host": "%s",
    "username": "%s",
    "password": "%s",
    "database": "%s"
  }
}'

printf "$TEMPLATE" ${AWS_ACCESS_KEY_ID} ${AWS_SECRET_ACCESS_KEY} ${PROD_DB_HOSTNAME} ${PROD_DB_USERNAME} ${PROD_DB_PASSWORD} ${PROD_DB_DATABASE} > config/local.json

TEMPLATE_CF_PARAMS='[{
  "ParameterKey": "S3Bucket",
  "ParameterValue": "%s"
}, {
  "ParameterKey": "SwaggerS3Key",
  "ParameterValue": "%s"
}, {
  "ParameterKey": "LambdaFunctionS3Key",
  "ParameterValue": "%s"
}]'

printf "$TEMPLATE_CF_PARAMS" ${S3_BUCKET} "${LAMBDA_NAME}-swagger.json" "${LAMBDA_NAME}.zip" > things/circleci/cloudformation-params.json
