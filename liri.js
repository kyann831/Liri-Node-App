require("dotenv").config();

var keys = require("./keys.js");
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);
var axios = require("axios");
var fs = require("fs");
var moment = require('moment');
moment().format();


function concertThis(){
var nodeArgs = process.argv

var artists = "";

for (var i = 3; i < nodeArgs.length; i++) {

  if (i > 3 && i < nodeArgs.length) {
    artists = artists + "+" + nodeArgs[i];
  }
  else {
    artists += nodeArgs[i];

  }
}

var queryUrl = "https://rest.bandsintown.com/artists/" + artists + "/events?app_id=594a450e-5ea2-400a-8808-84177e1e45a8";

console.log(queryUrl);

axios.get(queryUrl).then(
  function(response) {
    console.log("Name of Venue: ", response.data[0].venue.name);
    console.log("City: ", response.data[0].venue.city);
    console.log("State: ", response.data[0].venue.region);
    console.log("Concert Date: ", moment(response.data[0].datetime).format("L"));

  }
);
}

function spotifyThisSong(song) {
 
  
  spotify.search({ type: 'track', query: song, limit: 2 }, function(err, data) {
    if (err) {
      return console.log('Error occurred: ' + err);
    }
   
    console.log(data.tracks.items[0].artists[0].name);
    console.log(data.tracks.items[0].name);
    console.log(data.tracks.items[0].preview_url);
    console.log(data.tracks.items[0].album.name);
  });  
}

function movieThis() {

// Store all of the arguments in an array
var nodeArgs = process.argv;

// Create an empty variable for holding the movie name
var movieName = "";

// Loop through all the words in the node argument
// And do a little for-loop magic to handle the inclusion of "+"s
for (var i = 3; i < nodeArgs.length; i++) {

  if (i > 3 && i < nodeArgs.length) {
    movieName = movieName + "+" + nodeArgs[i];
  }
  else {
    movieName += nodeArgs[i];

  }
}

// Then run a request with axios to the OMDB API with the movie specified
var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";

// This line is just to help us debug against the actual URL.
console.log(queryUrl);

axios.get(queryUrl).then(
  function(response) {
    console.log("Release Year: " + response.data.Title);
    console.log("Release Year: " + response.data.Year);
    console.log("Actors: " + response.data.Actors);
    console.log("Plot: " + response.data.Plot);
    console.log("Country: " + response.data.Country);
    console.log("Rotten tomatos: " + response.data.Ratings[1].Value);

  }
);
}
function dowhatitSays() {
 
  spotify.search({ type: 'track', query: "I want it that way", limit: 1 }, function(err, data) {
    if (err) {
      return console.log('Error occurred: ' + err);
    }
    console.log(data.tracks.items[0].artists[0].name);
    console.log(data.tracks.items[0].name);
    console.log(data.tracks.items[0].preview_url);
    console.log(data.tracks.items[0].album.name);

fs.readFile("random.txt", "utf8", function(error, data) {

  if (error) {
    return console.log(error);
  }

  console.log(data)


  });  

})}
var command = process.argv[2];
var param   = process.argv[3];

switch (command) {
  case 'concert-this':
    concertThis(param);
    break;
  case 'spotify-this-song':
    spotifyThisSong(param);
    break;
  case 'movie-this':
    movieThis();
    break;
  case 'do-what-it-says':
    dowhatitSays(param);
    break;
}









