// Packages 
require('dotenv').config()
const keys = require('./keys')
const Spotify = require('node-spotify-api');
const Moment = require('moment')
const request = require('request')

var spotify = new Spotify(keys.spotify);
      
spotify.search({type: 'track', query: 'All the Small Things' }, function(err, data) {
  if (err) {
    return console.log('Error occurred: ' + err);
    }
   
  console.log(data); 
});

// Switch Case


