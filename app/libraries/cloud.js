'use strict';

const fs = require('fs');
const config = require('config');

const awsConfig = config.get('aws');

process.env.AWS_ACCESS_KEY_ID = awsConfig.iam.key;
process.env.AWS_SECRET_ACCESS_KEY = awsConfig.iam.secret;

const aws = require('aws-sdk');

const s3 = new aws.S3({
  params: {
    Bucket: awsConfig.s3.bucket,
    region: awsConfig.region,
  },
  signatureVersion: 'v4',
});

module.exports = {
  /**
   * Upload a file to a remote location
   *
   * @param {string} source
   * @param {string} destination
   *
   * @return {Promise}
   */
  upload(source, destination) {
    let body = source;

    if (typeof body === 'string') {
      body = fs.readFileSync(source);
    }

    return s3
      .putObject({
        Body: body,
        Key: destination,
      })
      .promise();
  },

  /**
   * Download a file from a remote location
   *
   * @param {string} source
   * @param {string?} destination
   *
   * @return {Promise}
   */
  download(source, destination) {
    return s3
      .getObject({
        Key: source,
      })
      .promise()
      .then((data) => {
        if (destination) {
          fs.writeFileSync(destination, data.Body);
        }

        return data.Body;
      });
  },

  /**
   * Delete a file from a remote location
   *
   * @param {string} source
   *
   * @return {Promise}
   */
  delete(source) {
    return s3
      .deleteObject({
        Key: source,
      })
      .promise();
  },

  /**
   * Returns object's metadata
   *
   * @param {string} source
   *
   * @return {Promise}
   */
  check(source) {
    return s3
      .headObject({
        Key: source,
      })
      .promise();
  },

  /**
   * Copy a file in the remote "fs"
   *
   * @param {string} source
   * @param {string} destination
   *
   * @return {Promise}
   */
  copy(source, destination) {
    source = `${awsConfig.s3.bucket}/${source}`; // eslint-disable-line no-param-reassign

    return s3
      .copyObject({
        Key: destination,
        CopySource: source,
      })
      .promise();
  },
};
