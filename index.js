var express = require('express');
var app = express();
var https = require('https');
var path = require('path');
var config = require('./config.js');

app.get('/', function (req, res) {

    function callback (parsed){
        res.send(parsed);
        console.log(parsed);
    }

    googlePlacesSearch = {
        // setup the api request URL 
        apiKey : '&key='+config.apiKey, 
        host :  'maps.googleapis.com', 

        autocompleteSearch : function (callback) {
            var  searchType = 'autocomplete', 
            inputType = 'input=',
            cityName= 'new york', 
            cityName = encodeURIComponent(cityName.trim()), 
            placeType= '&types=establishment', 
            searchPlace = 'le bain', 
            searchPlace = encodeURIComponent(searchPlace.trim()),
            placeId = ''; 

        return https.get({
            host: this.host,
            path: '/maps/api/place/'+searchType+'/json?'+inputType+cityName+searchPlace+placeType+placeId+this.apiKey
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
    },  // close autocompleteSearch

    detailsSearch : function (callback){
            var  searchType = 'details',  // details
            inputType = 'placeid=',  // either input= or placeid= 
            cityName= '', 
            cityName = encodeURIComponent(cityName.trim()), 
            placeType= '', 
            searchPlace = '', 
            searchPlace = encodeURIComponent(searchPlace.trim()),
            placeId = 'ChIJN-93ZsBZwokRpyoeLj9bzqQ'; 

        return https.get({
            host: this.host,
            path: '/maps/api/place/'+searchType+'/json?'+inputType+cityName+searchPlace+placeType+placeId+this.apiKey
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
    } // close detailsSearch

    }  // close googlePlacesSearch object

    googlePlacesSearch.detailsSearch(callback); 
    // googlePlacesSearch.autocompleteSearch(callback)

}); 

var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});