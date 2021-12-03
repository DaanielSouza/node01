const express = require('express');
const consign = require('consign');
const bodyParser = require('body-parser');
const path = require("path");
const port = 80

module.exports = () => {
  const app = express();

  app.set('port', (process.env.PORT || port));

  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());

  consign({ cwd: 'server' })
    .include('models')
    .include('controllers')
    .then("routes")
    .into(app);

  return app;
}