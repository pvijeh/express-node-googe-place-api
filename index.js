var express = require('express');
var app = express();
var https = require('https');
var path = require('path');
var config = require('./config.js');

console.log(config);

app.get('/', function (req, res) {
  res.send('Hello World!');

  var apiKey = config.apiKey; 

  console.log(apiKey);

  url = 'https://maps.googleapis.com/maps/api/place/autocomplete/json?input=Amoeba&types=establishment&location=37.76999,-122.44696&radius=500&key='+apiKey; 

    function callback (body){
        console.log(body);
    }

    function getTestPersonaLoginCredentials(callback) {

        return https.get({
            host: 'maps.googleapis.com',
            path: '/maps/api/place/autocomplete/json?input=Amoeba&types=establishment&location=40.7127,74.0059&radius=500&key='+apiKey
        }, function(response) {

            // Continuously update stream with data
            var body = '';
            response.on('data', function(d) {

                body += d;
            });

            response.on('end', function() {

                // Data reception is done, do whatever with it!
                // var parsed = JSON.parse(body);
                callback(body);
            });
        });
    }

    getTestPersonaLoginCredentials(callback); 

}); 

var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});