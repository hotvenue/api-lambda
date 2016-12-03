const fs = require('fs');
const crypto = require('crypto');

module.exports = {
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
