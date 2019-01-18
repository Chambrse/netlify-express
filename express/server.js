'use strict';
const express = require('express');
const serverless = require('serverless-http');
const app = express();
const bodyParser = require('body-parser');

const router = express.Router();
router.get('/', (req, res) => {
  console.log(req.headers);
  console.log(req.body);

  res.status(200).send({ test: "success!" });
});



router.get('/another', (req, res) => res.json({ route: req.originalUrl }));
router.post('/', (req, res) => res.json({ postBody: req.body }));

app.use(bodyParser.json());
app.use('/.netlify/functions/server', router);  // path must route to lambda
// app.use('/', router);  // path must route to lambda


module.exports = app;
module.exports.handler = serverless(app);
