// ./ tells javascript to look in the current (same) folder for keys.js
var keys = require('./keys.js')

var Twitter = require('twitter');

var spotify = require('spotify');

var request = require('request');

// https://apps.twitter.com/
var getMyTweets = function () {
	var client = new Twitter(keys.twitterKeys);

	var params = {
		screen_name: 'mona03576'
	};
	client.get('statuses/user_timeline', params,
		function (error, tweets, response) {
			if (!error) {
				//  console.log(tweets);
				for (var i = 0; i < tweets.length; i++) {
					console.log(tweets[i].created_at);
					console.log(' ');
					console.log(tweets[i].text);
				}
			}
		});
}
// Twitter End
// Spotify Start
var getArtistNames = function (artist) {
	return artist.name;
}
var getMeSpotify = function (songName) {

	spotify.search({
		type: 'track',
		query: songName
	}, function (err, data) {
		if (err) {
			console.log('Error occurred: ' + err);
			return;
		}

		var songs = data.tracks.items;
		for (var i = 0; i < songs.length; i++) {
			// console.log(data.tracks.items[0]);
			console.log(i);
			console.log('artist(s): ' + songs[i].artist.map(
				getArtistNames));
			console.log('song name: ' + songs[i].name);
			console.log('preview song: ' + songs[i].preview_url);
			console.log('album: ' + songs[i].album.name);
			console.log('-----------------');
		}
	});
}
// Spotify End
// Request Start
var getMeMovie = function (movieName) {

	request('http://www.http://www.omdbapi.com/?t=' + movieName + '&y=&plot=short&r=json', function (error, response, body) {
		if (!error && response.statusCode == 200) {
			// console.log(body)
			var jsonData = JSON.parse(body);

			console.log('Title: ' + jsonData.Title);
			console.log('Year: ' + jsonData.Year);
			console.log('Rated: ' + jsonData.Rated);
			console.log('Actors: ' + jsonData.Actors);
			console.log('Rotten tomatoes rating:' + jsonData.tomatoRating);

		}
	})
}
// Request End
// fs start
var doWhatItSays = function () {
	fs.readFile('random.txt', 'utf8', function (err, data) {
		if (err) throw err;

		var dataArr = data.split(',');

		if (dataArr.length == 2) {
			pick(dataArr[0], dataArr[1]);
		} else if (dataArr.length == 1) {
			pick(dataArr[0]);
		}

	});
}
// fs end
// Switch Statements hold different arguments for user
var pick = function (caseData, functionData) {
	switch (caseData) {
		case 'my-tweets':
			getMyTweets();
			break;
		case 'spotify-this-song':
			getMeSpotify(functionData);
			break;
		case 'movie-this':
			getMeMovie(functionData);
		case 'do-what-it-says':
			doWhatItSays();
			break;
		default:

			// if command is entered that liri does not recognize
			console.log('LIRI does not know');
	}
}
// function to pass arguments when I run pick function
var runThis = function (argOne, argTwo) {
	pick(argOne, argTwo);
};
// first item in array is ndc0=node, the second item is the ndc1=file name.
// argv2=my-tweets or spotify-this-song, argv3 is the name of song or tweet.
runThis(process.argv[2], process.argv[3]);