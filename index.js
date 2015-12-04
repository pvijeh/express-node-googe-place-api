var express = require('express');
var app = express();
var https = require('https');
var path = require('path');
var config = require('./config.js');

app.get('/', function (req, res) {

// setup the api request URL 
  var apiKey = config.apiKey, 
  // can be autocomplete, textsearch, or some other possibilities
  // look at google places api docs for more options
    searchType = 'autocomplete', 
    cityName= 'new york', 
    cityName = encodeURIComponent(cityName.trim()); 
    searchPlace = 'le bain', 
    searchPlace = encodeURIComponent(searchPlace.trim()); 

    function callback (parsed){
        res.send(parsed);
        console.log(parsed);
    }

    // https://maps.googleapis.com/maps/api/place/details/json?placeid=ChIJN1t_tDeuEmsRUsoyG83frY4&key=YOUR_API_KEY

    function googlePlacesAutocompleteSearch(callback) {

        return https.get({
            host: 'maps.googleapis.com',
            path: '/maps/api/place/'+searchType+'/json?input='+cityName+searchPlace+'&types=establishment&key='+apiKey
        }, function(response) {

            var body = '';      
            response.on('data', function(d) {
            body += d;
            });

            response.on('end', function() {
            // Data reception is done, do whatever with it!
            var parsed = JSON.parse(body);
            callback(parsed);
            });

        });

    }

    function googlePlacesDetailsSearch(callback) {

        return https.get({
            host: 'maps.googleapis.com',
            path: '/maps/api/place/details/json?placeid=ChIJN-93ZsBZwokRpyoeLj9bzqQ&key='+apiKey
        }, function(response) {

            var body = '';      
            response.on('data', function(d) {
            body += d;
            });

            response.on('end', function() {
            // Data reception is done, do whatever with it!
            var parsed = JSON.parse(body);
            callback(parsed);
            });

        });

    }

    googlePlacesDetailsSearch(callback)
    // googlePlacesAutocompleteSearch(callback); 

}); 

var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});