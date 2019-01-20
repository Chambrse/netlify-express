let request = require('request');

let test = setTimeout(function () {
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
        'Authorization': 'Bearer xoxp-527153331493-528371214310-528189649410-f521bfaf3bb06bfc0206e6e6e7b7fd4e'
      },
      body: body
    };

    request.post(options, function (error, response, body) {
      console.log('error:', error); // Print the error if one occurred
      console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
      console.log('body:', body); // Print the HTML for the Google homepage.
    });
  }, 5000);