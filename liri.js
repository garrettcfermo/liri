//Package Required
require("dotenv").config()
const keys = require("./keys")
const Spotify = require("node-spotify-api");
const moment = require("moment")
const request = require("request")
const inquirer = require("inquirer")
const fs = require("fs")
const clear = require("clear")


// Spotify Function
const spotify = song => {
  // API Keys
  var spotify = new Spotify(keys.spotify);

  //If no song given defualt
  if (song === "") {
    song = "Morning Ride"
  }

  // Pull Songs API Information 
  spotify.search({ type: "track", query: song }, function (err, data) {
    if (err) {
      return console.log("Error occurred: " + err);
    }

    var results =`
Your Spotify Results for ${song}!
_______________________
Artist Name : ${data.tracks.items[0].artists[0].name}
Album Name : ${data.tracks.items[0].album.name}
Song Name : ${data.tracks.items[0].name}
Preview : ${data.tracks.items[0].preview_url}

Request Time : ${moment().format('MMMM Do YYYY, h:mm:ss a')}
_______________________`

    // Display Spotify Data
    clear()
    console.log(results)
    restart()

    // Append to Log Text
    fs.appendFile("log.txt", results, function (err) { if (err) { console.log(err) } })
  });
}

// Movie Function
const movie = name =>{
  console.log(name)

  var url = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp"



  restart()
}


// Concert Function
const concert = name =>{

  // Default no Band/Artist Given
  if(name===""){name ="fiji"}
  
  //Pull API Concert Information
  var url = `https://rest.bandsintown.com/artists/${name}/events?app_id=${keys.bit.id}`
  request(url,(err,r,data)=>{
    if(err){console.log(err)}
    var concertData =JSON.parse(data)

    if(concertData.length ===0){
      clear()
      console.log("There are no up coming concerts!")
      restart()
    } else{

    var results =`
Your Concert Results for ${name}!
_______________________
Venue Name : ${concertData[0].venue.name}
Venue Location : ${concertData[0].venue.city}
Date : ${moment(concertData[0].datetime).format("MM/DD/YYYY, h:mm a")}

Request Time : ${moment().format("MM/DD/YYYY, h:mm:ss a")}
_______________________`

    // Display Concert Data
    clear()
    console.log(results)
    restart()

    // Append to Log Text
    fs.appendFile("log.txt", results, function (err) { if (err) { console.log(err) } })
    }
  }) 
}

// Starting App Function
const askQuestion = () => {
  clear()
  inquirer.prompt([
    {
      type: "list",
      message: "Welcome Stranger! What would you like to do? Please choose one of the choices below:",
      name: "userChoice",
      choices: ["Find Song Information", "Find Movie Information", "Find Band/Artist's next concert", "None of the Above"]
    }
  ])
    .then(answers => questionBreakout(answers.userChoice))
}

askQuestion()

// UserChoice Breakout Function
const questionBreakout = (choice) => {
  switch (choice) {
    
    case "Find Song Information":
      clear()
      inquirer.prompt([
        {
          type: "input",
          message: "What is the name of the song that you would like information for?",
          name: "songName"
        }
      ])
        .then(answers => spotify(answers.songName))
      break
    
    case "Find Movie Information":
      clear()
      inquirer.prompt([
        {
          type:"input",
          message:"What is the name of the movie that you would like information for?",
          name:"movieName"
        }
      ])
        .then(answers => movie(answers.movieName))
      break
    
    case "Find Band/Artist's next concert":
      clear()
      inquirer.prompt([
        {
          type: "input",
          message: "What is the band/Artists name that you would like information for?",
          name: "bandName"
        }
      ])
        .then(answers => concert(answers.bandName))
      break
    
    case "None of the Above":
      clear()
      console.log("Sorry we couldn't help. Good Bye!")
      process.exit()
      break
  }
}

// Restart App Function
const restart = _ => {
  inquirer.prompt([
    {
      type: "list",
      message: "Would you like to request something else? (YES or NO)",
      name: "userChoice",
      choices: ["YES","NO"]
    }
  ]).then(answers => {
    if(answers.userChoice ==="YES"){
      askQuestion()
    } else{
      clear()
      console.log('Thank you! Good Bye!')
    }
  })
}