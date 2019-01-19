'use strict';
const express = require('express');
const serverless = require('serverless-http');
const app = express();
const bodyParser = require('body-parser');

const router = express.Router();
let testNumber = 42;
router.get('/', (req, res) => {
  console.log(req.headers);
  console.log(req.body);

  res.status(200).send({ test: "success!" });
});

router.post('/', (req, res) => {
  console.log(req.headers);
  console.log(JSON.stringify(req.body, null, 2));
  console.log("thise is a global variable, testNumber", testNumber);

  res.status(200).send({ challenge: req.body.challenge });
});

router.post('/loadCSV', (req, res) => {
  console.log(req.headers);
  console.log(JSON.stringify(req.route, null, 2));
  console.log(req.body);
  console.log(req.text);
  console.log("thise is a global variable, testNumber", testNumber);

  res.status(200).send({ "text": "csv data received!" });
});



router.get('/another', (req, res) => res.json({ route: req.originalUrl }));
router.post('/', (req, res) => res.json({ postBody: req.body }));

app.use(bodyParser.json());
app.use('/.netlify/functions/server', router);  // path must route to lambda
// app.use('/', router);  // path must route to lambda


module.exports = app;
module.exports.handler = serverless(app);
