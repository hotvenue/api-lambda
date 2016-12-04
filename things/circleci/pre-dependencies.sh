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
