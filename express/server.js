'use strict';
require('dotenv').config()
const express = require('express');
const serverless = require('serverless-http');
const app = express();
const bodyParser = require('body-parser');
const request = require('request');

const router = express.Router();
let testNumber = 42;

router.get('/another', (req, res) => res.json({ route: req.originalUrl }));
router.post('/', (req, res) => res.json({ postBody: req.body }));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));
app.use('/.netlify/functions/server', router);  // path must route to lambda
// app.use('/', router);  // path must route to lambda

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
  console.log(req);
  console.log(req.body);
  console.log(req.text);
  console.log("thise is a global variable, testNumber", testNumber);

  res.status(200).send({ "text": "csv data received!" });
});

router.post('/timer', (req, res) => {
  console.log(req.body);
  res.status(200).send({ "text": "Timer started." });
  // let timer = setInterval(function() {

  // }, 1000)
})

router.post('/test', (req, res) => {
  console.log(req.body);
  res.status(200).send({ "text": "Timer started." });
  console.log("code gets past hte .send");

  setTimeout(function () {
    console.log('the timeout is happening');
    let body = JSON.stringify({
      'channel': 'CFJAX6E9L',
      'text': 'this is what the message will update to',
      'as_user': 'false',
      'username': 'Trilogy_Timer'
    });

    var options = {
      url: 'https://slack.com/api/chat.postMessage',
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + process.env.SLACK_TOKEN
      },
      body: body
    };

    request.post(options, function (error, response, body) {
      console.log('error:', error); // Print the error if one occurred
      console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
      console.log('body:', body); // Print the HTML for the Google homepage.
    });
  }, 5000);
});


module.exports = app;
module.exports.handler = serverless(app);
