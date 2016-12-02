const fs = require('fs');
const crypto = require('crypto');

const log = require('./log');
const cloud = require('./cloud');

module.exports = {
  /**
   * Upload a file to the cloud
   *
   * @param {string} what - What I'm trying to upload: 'location frame image', 'video'
   * @param {string} oldPath - The path where the file is right now
   * @param {string} newPath - The path (URI) where the file must be uploaded
   *
   * @return {Promise}
   */
  uploadFile({ what, oldPath, newPath }) {
    return cloud.upload(oldPath, newPath)
      .then(() => {
        fs.unlinkSync(oldPath);
      })
      .catch((err) => {
        log.debug(`Error while uploading ${what}`);
        log.error(err);

        throw new Error(err);
      });
  },

  /**
   * Creates the hash of a file
   *
   * @param {string} path - The file I'm trying to hash
   * @param {string} algorithm - [default: sha512] The algorithm to use for the hashing
   *
   * @return {Promise<String>}
   */
  hashFile(path, algorithm = 'sha512') {
    const shasum = crypto.createHash(algorithm);

    return new Promise((resolve, reject) => {
      fs.createReadStream(path)
        .on('data', (data) => {
          shasum.update(data);
        })
        .on('end', () => {
          resolve(shasum.digest('hex'));
        })
        .on('error', (err) => {
          reject(err);
        });
    });
  },
};
