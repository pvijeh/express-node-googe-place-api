var express = require('express');
var app = express();
var https = require('https');
var path = require('path');
var config = require('./config.js');

app.get('/', function (req, res) {

var callback = function (parsed){
        res.send(parsed);
        console.log(parsed);
    }

    function CallGooglePlacesAPI (searchtype, cityname, searchplace, placeid){
        this.apiKey = '&key='+config.apiKey,
        this.host = 'maps.googleapis.com', 
        this.searchType = searchtype, // can be autocomplete or details
        this.inputType = 'input=',
        this.cityName = encodeURIComponent(cityname.trim()), 
        this.placeType = '&types=establishment', 
        this.searchPlace = encodeURIComponent(searchplace.trim()), 
        this.placeId = placeid ? placeid : '',  // place id should be provided if it is a details search

        // glues together all the inputs to great the api URL path
        this.path = 
            '/maps/api/place/'
            +this.searchType
            +'/json?'+this.inputType
            +this.cityName
            +this.searchPlace
            +this.placeType
            +this.placeId
            +this.apiKey

            // calls the API 
          this.callAPI  = https.get({
            host: this.host,
            path: this.path
        }, function(response) {

            var body = '';      
            response.on('data', function(d) {
            body += d;
            });

            response.on('end', function() {
            // Data reception is done, do whatev. 
            var parsed = JSON.parse(body);
            callback(parsed);
            });
        });
    }  // close CallGooglePlacesApi

    var AutoCompleteSearch = new CallGooglePlacesAPI('autocomplete', 'new york', 'acme'); 

    console.log(AutoCompleteSearch.callAPI);

}); 

var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});
