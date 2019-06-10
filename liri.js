var Spotify = require("node-spotify-api");
var request = require("request");
var fs = require("fs");
var spotify = new Spotify({
  id: "487190445f164155beee3a2a2d830360",
  secret: "dbdfe556121d43d1b261dd24714a2097"
});

var getArtistNames = function(artist) {
  return artist.name;
};

var getMeSpotify = function(songName) {
  spotify.search({ type: "track", query: songName }, function(err, data) {
    if (err) {
      return console.log("Error occurred: " + err);
    }

    var songs = data.tracks.items;
    for (var i = 0; i < songs.length; i++) {
      console.log(i);
      console.log("artist: " + songs[i].artists.map(getArtistNames));
      console.log("song name: " + songs[i].name);
      console.log("preview song: " + songs[i].preview_url);
      console.log("album: " + songs[i].album.name);
      console.log("----------------------------------------------------");
    }
  });
};

var getMeMovie = function(movieName) {
  request(
    "http://www.omdbapi.com/?t=" + movieName + "&apikey=35c0d250",
    function(error, response, body) {
      var jsonData = JSON.parse(body);

      console.dir(jsonData);
    }
  );
};
var doWhatItSays = function() {
  fs.readFile("random.txt", "utf8", function(err, data) {
    if (err) throw err;
    var dataArr = data.split(",");

    if (dataArr.length == 2) {
      pick(dataArr[0], dataArr[1]);
    } else if (dataArr.length == 1) {
      pick(dataArr[0]);
    }
  });
};

var pick = function(caseData, functionData) {
  switch (caseData) {
    case "spotify-this-song":
      getMeSpotify(functionData);
      break;
    case "movie-this":
      getMeMovie(functionData);
    case "do-what-it-says":
      doWhatItSays();
      break;
    default:
      console.log("Liri doesn't know that");
  }
};

var runThis = function(argOne, argTwo) {
  pick(argOne, argTwo);
};

runThis(process.argv[2], process.argv[3]);
