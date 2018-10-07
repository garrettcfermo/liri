// Packages 
require('dotenv').config()
const keys = require('./keys')
const Spotify = require('node-spotify-api');
const moment = require('moment')
const request = require('request')
const inquirer = require("inquirer")
const fs = require('fs')

// Current Time Stamp
timeStamp = moment().format('MMMM Do YYYY, h:mm:ss a')


// Spotify Function
const spotify = song => {
  var spotify = new Spotify(keys.spotify);

  // Pull Songs API Information 
  spotify.search({ type: 'track', query: song }, function (err, data) {
    if (err) {
      return console.log('Error occurred: ' + err);
    }
  var results = `
  Your Spotify Results 
  _______________________
  Artist Name : ${data.tracks.items[0].artists[0].name}
  Album Name : ${data.tracks.items[0].album.name}
  Song Name : ${data.tracks.items[0].name}
  Preview : ${data.tracks.items[0].preview_url}
  Request Time : ${timeStamp}
  _______________________
  `
  console.log(results)
  fs.appendFile('log.txt', results, function (e) { if (err) { console.log(err) } })
  });
}

// Concert Function

// Movie Function

// User Interface

const askQuestion = () => {

}


