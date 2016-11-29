const express = require('express');
const epilogue = require('epilogue');
const Sequelize = require('sequelize');
const bodyParser = require('body-parser');

const app = module.exports = express();
const sequelize = app.database = new Sequelize(null, null, null, { dialect: 'sqlite' });

const models = {};
models.user = sequelize.define('user', {
  username: Sequelize.STRING,
  birthday: Sequelize.DATE,
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

epilogue.initialize({ app, sequelize });

epilogue.resource({ model: models.user });
