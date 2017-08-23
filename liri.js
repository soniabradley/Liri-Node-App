
var keys = require('./keys.js')

var Twitter = require('twitter');
var client = new Twitter(keys.twitterKeys);



var params = {screen_name: 'mona03576'};
client.get('statuses/user_timeline', params, function(error, tweets, response) {
console.log('Hello');
  if (!error) {
    console.log(tweets[0].text);
  }else if(error) {
    console.log(error);
  }
});


var Spotify = require('node-spotify');
var client = new Spotify(keys.)


