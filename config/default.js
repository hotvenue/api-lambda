'use strict';

module.exports = {
  database: {
    logging: console.log,
  },

  log: {
    level: 'silly',
  },

  aws: {
    region: 'eu-west-1',

    s3: {
      bucket: 'hotvenue',
    },
  },
};
