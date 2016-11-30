const awsServerlessExpress = require('aws-serverless-express');

const app = require('./app');

const server = awsServerlessExpress.createServer(app);

exports.handler = (event, context) => {
  app.database.sync({ force: true })
    .then(() => awsServerlessExpress.proxy(server, event, context));
};
