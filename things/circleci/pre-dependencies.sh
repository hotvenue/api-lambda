#!/usr/bin/env bash

LOCAL_TEMPLATE='{
  "aws": {
    "es": {
      "endpoint": "%s"
    }
  }
}'

printf "$LOCAL_TEMPLATE" ${LOCAL_ES_ENDPOINT} > config/local.json

PROD_TEMPLATE='{
  "database": {
    "host": "%s",
    "username": "%s",
    "password": "%s",
    "database": "%s"
  }
}'

printf "$PROD_TEMPLATE" ${PROD_DB_HOSTNAME} ${PROD_DB_USERNAME} ${PROD_DB_PASSWORD} ${PROD_DB_DATABASE} > config/production.json
