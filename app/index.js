const _ = require('lodash');
const express = require('express');
const epilogue = require('epilogue');
const bodyParser = require('body-parser');

const models = require('./models');

const app = module.exports = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

epilogue.initialize({
  app,
  sequelize: models.sequelize,
});

_.forEach(models.sequelize.models, (model) => {
  epilogue.resource({ model });
});

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error(`Not found: ${req.url}`);

  err.status = 404;

  next(err);
});

// error handlers
app.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
  if (process.env.NODE_ENV !== 'test') {
    console.error(err.message);
  }

  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: app.get('env') === 'development' ? err : {},
  });
});
